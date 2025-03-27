// @ts-nocheck - Disable type checking for this file since it's client-only
import { useNuxtApp } from '#app';
import type { Directive } from 'vue';

// Animation preset types
type AnimationType =
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'splitText'
  | 'splitWords'
  | 'staggerUp'
  | 'staggerLeft'
  | 'staggerRight'
  | 'staggerScale'
  | 'drawSVG';

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
  sequence?: boolean;
  sequenceDelay?: number;
  order?: number;
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
  // Client-side guard at plugin level
  if (process.server) return;

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
    fadeDown: {
      from: { autoAlpha: 0, y: -30 },
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
    scaleX: {
      from: { autoAlpha: 0, scaleX: 0, transformOrigin: 'center center' },
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
    drawSVG: {
      from: { drawSVG: 0 },
      to: { drawSVG: '100%', duration: 2.5, ease: 'power2.inOut' },
    },
  };

  // First, let's create a helper to group animations by their parent
  const getSequenceGroup = (el: HTMLElement): HTMLElement[] => {
    const parent = el.parentElement;
    if (!parent) return [el];
    return Array.from(parent.children) as HTMLElement[];
  };

  // Modify createAnimation function
  const createAnimation = (
    el: HTMLElement,
    type: AnimationType,
    options: AnimationOptions = {}
  ) => {
    if (!process.client) return;

    const preset = presets[type];
    if (!preset) return;

    // Create timeline for sequences
    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 80%',
        markers: process.env.NODE_ENV === 'development' && options.markers,
        toggleActions: 'play play play reverse',
      },
    });

    // If this is part of a sequence, get all elements to animate
    if (options.sequence) {
      const group = getSequenceGroup(el);
      const sequenceDelay = options.sequenceDelay || 0.3;
      const initialDelay = options.delay || 0;

      group.forEach((element, index) => {
        // Set initial state
        $gsap.set(element, preset.from);

        // Add to timeline with proper position
        if (index === 0) {
          // First element starts at beginning plus any initial delay
          tl.to(
            element,
            {
              ...preset.to,
              duration: options.duration || preset.to.duration || 0.8,
              delay: initialDelay,
            },
            0
          );
        } else {
          // Subsequent elements are positioned relative to previous ones
          tl.to(
            element,
            {
              ...preset.to,
              duration: options.duration || preset.to.duration || 0.8,
            },
            `<+=${sequenceDelay}`
          );
        }
      });

      return tl;
    }

    // Handle text splitting
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

      tl.to(elements, {
        ...preset.to,
        stagger: options.stagger || 0.02,
        delay: options.delay || 0,
        duration: options.duration || preset.to.duration || 0.8,
      });

      return tl;
    }

    // Handle stagger animations
    if (preset.stagger) {
      const children = el.children;
      $gsap.set(children, preset.from);

      tl.to(children, {
        ...preset.to,
        stagger: options.stagger || 0.1,
        delay: options.delay || 0,
        duration: options.duration || preset.to.duration || 0.8,
      });

      return tl;
    }

    // Regular animation
    $gsap.set(el, preset.from);
    tl.to(el, {
      ...preset.to,
      delay: options.delay || 0,
      duration: options.duration || preset.to.duration || 0.8,
    });

    return tl;
  };

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    if (ctx) {
      ctx.revert(); // This kills all animations and removes ScrollTriggers
      ctx = null;
    }
  });

  nuxtApp.hook('page:finish', () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  });

  // Create the directive
  const scrollAnimDirective: Directive<HTMLElement, string | AnimationOptions> = {
    mounted(el, binding) {
      // Double client-side check
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
    // Add unmounted hook for cleanup
    unmounted(el) {
      if (!process.client || !ctx) return;
      // We don't need to target specific elements - when component unmounts
      // its animations will be automatically removed with the context
    },
  };

  // Register directive on client only
  nuxtApp.vueApp.directive('scroll-anim', scrollAnimDirective);

  // Provide animation utilities
  return {
    provide: {
      scrollAnimations: {
        presets,
        create: (el: HTMLElement, type: AnimationType, options?: AnimationOptions) => {
          if (!process.client) return;
          if (!ctx) {
            ctx = $gsap.context(() => {});
          }
          return ctx.add(() => createAnimation(el, type, options));
        },
        clear: () => {
          if (!process.client) return;
          if (ctx) {
            ctx.revert();
            ctx = null;
          }
        },
      },
    },
  };
});
