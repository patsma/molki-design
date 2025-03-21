import { useNuxtApp } from '#app';

/**
 * Vue directive for scroll animations
 * Use v-scroll-anim on any element to add scroll-triggered animations
 *
 * Example:
 * <div v-scroll-anim="'fadeUp'">Content</div>
 * <div v-scroll-anim:fadeLeft="{ delay: 0.2 }">Content</div>
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  // Store all animations for cleanup
  let animations = [];

  // Animation presets
  const presets = {
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
    animations = [];
  };

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    clearAnimations();
  });

  // Register the directive
  nuxtApp.vueApp.directive('scroll-anim', {
    mounted(el, binding) {
      // Get animation type from directive
      const type = binding.arg || binding.value || 'fadeIn';

      // Get options from directive value (if an object)
      const options = typeof binding.value === 'object' ? binding.value : {};

      // Get animation preset
      const preset = presets[type] || presets.fadeIn;

      // Create the animation
      const animation = $gsap.fromTo(el, preset.from, {
        ...preset.to,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          markers: process.env.NODE_ENV === 'development' && options.markers,
          toggleActions: 'play none none none',
          ...options.scrollTrigger,
        },
        ...options,
      });

      // Store for cleanup
      animations.push(animation);
    },
    unmounted(el) {
      // Find and cleanup animation for this element
      animations = animations.filter((anim) => {
        if (anim.scrollTrigger && anim.scrollTrigger.trigger === el) {
          anim.scrollTrigger.kill();
          anim.kill();
          return false;
        }
        return true;
      });
    },
  });

  // Provide a way to manually trigger animations
  return {
    provide: {
      scrollAnimations: {
        clear: clearAnimations,
        presets,
      },
    },
  };
});
