import { useNuxtApp } from '#app';
import type { Directive } from 'vue';

// Animation preset types
type AnimationType = 'fadeIn' | 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';

interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

interface ScrollTriggerOptions {
  trigger?: Element;
  start?: string;
  end?: string;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface AnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  ease?: string;
  scrollTrigger?: ScrollTriggerOptions;
}

/**
 * Vue directive for scroll animations
 * Use v-scroll-anim on any element to add scroll-triggered animations
 *
 * Examples:
 * <div v-scroll-anim="'fadeUp'">Content</div>
 * <div v-scroll-anim:fadeLeft="{ delay: 0.2 }">Content</div>
 * <div v-scroll-anim="{ type: 'fadeIn', delay: 0.3, scrollTrigger: { start: 'top center' } }">Content</div>
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  // Store all animations for cleanup
  const animations: gsap.core.Animation[] = [];

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
  };

  // Clear all animations
  const clearAnimations = () => {
    animations.forEach((anim) => {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    });
    animations.length = 0;
  };

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    clearAnimations();
  });

  // Create the directive
  const scrollAnimDirective: Directive<HTMLElement, string | AnimationOptions> = {
    mounted(el, binding) {
      if (!process.client) return;

      try {
        // Get animation type and options
        let type: AnimationType = 'fadeIn';
        let options: AnimationOptions = {};

        if (typeof binding.value === 'string') {
          type = binding.value as AnimationType;
        } else if (typeof binding.value === 'object') {
          options = binding.value;
          type = (options.type as AnimationType) || (binding.arg as AnimationType) || 'fadeIn';
        } else if (binding.arg) {
          type = binding.arg as AnimationType;
        }

        // Get animation preset
        const preset = presets[type];
        if (!preset) {
          console.warn(`[v-scroll-anim] Unknown animation type: ${type}`);
          return;
        }

        // Create the animation
        const animation = $gsap.fromTo(el, preset.from, {
          ...preset.to,
          ...options,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            markers: process.env.NODE_ENV === 'development' && options.scrollTrigger?.markers,
            toggleActions: 'play none none none',
            ...options.scrollTrigger,
          },
        });

        // Store for cleanup
        animations.push(animation);
      } catch (error) {
        console.warn('[v-scroll-anim] Error creating animation:', error);
      }
    },

    unmounted(el) {
      // Find and cleanup animations for this element
      const index = animations.findIndex(
        (anim) => anim.scrollTrigger && anim.scrollTrigger.trigger === el
      );

      if (index !== -1) {
        const animation = animations[index];
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
        animations.splice(index, 1);
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
        clear: clearAnimations,
        create: (el: HTMLElement, type: AnimationType, options?: AnimationOptions) => {
          const preset = presets[type];
          if (!preset) return null;

          const animation = $gsap.fromTo(el, preset.from, {
            ...preset.to,
            ...options,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              ...options?.scrollTrigger,
            },
          });

          animations.push(animation);
          return animation;
        },
      },
    },
  };
});
