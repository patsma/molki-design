import { useNuxtApp } from '#app';
import type { Directive } from 'vue';

// Animation preset types
type AnimationType =
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'splitText'
  | 'splitWords'
  | 'staggerUp'
  | 'staggerLeft'
  | 'staggerRight'
  | 'staggerScale';

interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  split?: boolean;
  stagger?: boolean;
}

interface AnimationOptions {
  delay?: number;
  duration?: number;
  stagger?: number | gsap.StaggerVars;
  type?: 'chars' | 'words' | 'lines';
  ease?: string;
  start?: string;
  end?: string;
  markers?: boolean;
  onComplete?: () => void;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Vue directive for scroll animations
 * Use v-scroll-anim on any element to add scroll-triggered animations
 *
 * Examples:
 * <div v-scroll-anim="'fadeUp'">Content</div>
 * <div v-scroll-anim:fadeLeft="{ delay: 0.2 }">Content</div>
 * <div v-scroll-anim:splitText="{ type: 'chars', stagger: 0.02 }">Animated Text</div>
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $SplitText } = useNuxtApp();
  let ctx: gsap.Context | null = null;

  // Animation presets
  const presets: Record<AnimationType, AnimationPreset> = {
    fadeIn: {
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
    },
    fadeUp: {
      from: { autoAlpha: 0, y: 30 },
      to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    },
    fadeLeft: {
      from: { autoAlpha: 0, x: -30 },
      to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
    },
    fadeRight: {
      from: { autoAlpha: 0, x: 30 },
      to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
    },
    scale: {
      from: { autoAlpha: 0, scale: 0.8 },
      to: { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    },
    // Stagger variants
    staggerUp: {
      from: { autoAlpha: 0, y: 30 },
      to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      stagger: true,
    },
    staggerLeft: {
      from: { autoAlpha: 0, x: -30 },
      to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      stagger: true,
    },
    staggerRight: {
      from: { autoAlpha: 0, x: 30 },
      to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      stagger: true,
    },
    staggerScale: {
      from: { autoAlpha: 0, scale: 0.8 },
      to: { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      stagger: true,
    },
    splitText: {
      from: { autoAlpha: 0, y: 20 },
      to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      split: true,
    },
    splitWords: {
      from: { autoAlpha: 0, y: 30, rotateX: -45 },
      to: { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' },
      split: true,
    },
  };

  // Create animation with ScrollTrigger
  const createAnimation = (
    el: HTMLElement,
    type: AnimationType,
    options: AnimationOptions = {}
  ) => {
    if (!process.client) return;

    const preset = presets[type];
    if (!preset) return;

    // Handle text splitting if needed
    if (preset.split && $SplitText) {
      const splitType = options.type || 'chars';
      const split = new $SplitText(el, {
        type: splitType,
        linesClass: 'split-line',
        charsClass: 'split-char',
        wordsClass: 'split-word',
      });

      const elements = split[options.type || 'chars'];
      $gsap.set(elements, preset.from);

      return $gsap.to(elements, {
        ...preset.to,
        stagger: options.stagger || 0.02,
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 80%',
          markers: process.env.NODE_ENV === 'development' && options.markers,
          toggleActions: 'play none none none',
        },
      });
    }

    // Handle stagger animations
    if (preset.stagger) {
      const children = el.children;
      $gsap.set(children, preset.from);

      return $gsap.to(children, {
        ...preset.to,
        stagger: options.stagger || 0.1,
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 80%',
          markers: process.env.NODE_ENV === 'development' && options.markers,
          toggleActions: 'play none none none',
        },
      });
    }

    // Regular animation for non-split elements
    return $gsap.fromTo(el, preset.from, {
      ...preset.to,
      ...options,
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 80%',
        markers: process.env.NODE_ENV === 'development' && options.markers,
        toggleActions: 'play none none none',
      },
    });
  };

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    if (ctx) {
      ctx.revert(); // This kills all animations and removes ScrollTriggers
      ctx = null;
    }
  });

  // Create the directive
  const scrollAnimDirective: Directive<HTMLElement, string | AnimationOptions> = {
    mounted(el, binding) {
      if (!process.client) return;

      try {
        // Create a new context if needed
        if (!ctx) {
          ctx = $gsap.context(() => {});
        }

        // Get animation type and options
        let type: AnimationType = 'fadeUp';
        let options: AnimationOptions = {};

        if (typeof binding.value === 'string') {
          type = binding.value as AnimationType;
        } else if (typeof binding.value === 'object') {
          options = binding.value;
          type = (binding.arg as AnimationType) || 'fadeUp';
        } else if (binding.arg) {
          type = binding.arg as AnimationType;
        }

        // Add animation to context
        ctx.add(() => createAnimation(el, type, options));
      } catch (error) {
        console.warn('[v-scroll-anim] Error creating animation:', error);
      }
    },
  };

  // Register the directive
  nuxtApp.vueApp.directive('scroll-anim', scrollAnimDirective);

  // Provide animation utilities
  return {
    provide: {
      scrollAnimations: {
        presets,
        create: (el: HTMLElement, type: AnimationType, options?: AnimationOptions) => {
          if (!ctx) {
            ctx = $gsap.context(() => {});
          }
          return ctx.add(() => createAnimation(el, type, options));
        },
        clear: () => {
          if (ctx) {
            ctx.revert();
            ctx = null;
          }
        },
      },
    },
  };
});
