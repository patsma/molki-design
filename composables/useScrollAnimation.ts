import { useNuxtApp } from '#app';

/**
 * Simple scroll animation composable
 * Use to create scroll-triggered animations on any element
 *
 * @param options Configuration options for the animation
 * @returns Animation controller object
 */
export const useScrollAnimation = (options = {}) => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();
  const animations = ref<any[]>([]);

  // Default animation settings
  const defaults = {
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
  };

  /**
   * Create a scroll-triggered animation
   */
  const animate = (target: any, type = 'fadeIn', customOptions = {}) => {
    if (!process.client || !target) return;

    // Get animation presets
    const preset = defaults[type] || defaults.fadeIn;

    // Create the animation with ScrollTrigger
    const animation = $gsap.fromTo(target, preset.from, {
      ...preset.to,
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        markers: process.env.NODE_ENV === 'development',
        toggleActions: 'play none none none',
        ...customOptions,
      },
      ...customOptions,
    });

    // Track the animation for cleanup
    animations.value.push(animation);

    return animation;
  };

  /**
   * Clean up all animations
   */
  const cleanup = () => {
    animations.value.forEach((anim) => {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    });
    animations.value = [];
  };

  // Auto-cleanup on component unmount
  onUnmounted(() => {
    cleanup();
  });

  return {
    animate,
    cleanup,
    animations,
  };
};
