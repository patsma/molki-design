// @ts-nocheck - Disable type checking for this file since it's client-only
import { useNuxtApp } from '#app';
import type { Directive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  // Client-side guard
  if (process.server) return;

  const { $gsap, $SplitText } = useNuxtApp();
  let ctx = null;
  let animations = [];
  let isReady = false;

  // Create a state that can be accessed globally
  const state = reactive({
    prepared: false,
    playing: false,
  });

  // Function to prepare all animations (set initial states)
  const prepareAnimations = () => {
    animations.forEach((anim) => {
      // Set initial states but don't play yet
      anim.prepare();
    });
    state.prepared = true;

    // Emit event that animations are prepared
    nuxtApp.callHook('animations:prepared');
  };

  // Function to play all animations
  const playAnimations = () => {
    animations.forEach((anim) => {
      anim.play();
    });
    state.playing = true;

    // Emit event that animations are playing
    nuxtApp.callHook('animations:playing');
  };

  // Helper to group animations by their parent
  const getSequenceGroup = (el) => {
    const parent = el.parentElement;
    if (!parent) return [el];
    return Array.from(parent.children);
  };

  // Simple animation class to handle different animation types
  class Animation {
    constructor(el, type, options = {}) {
      this.el = el;
      this.type = type;
      this.options = options;
      this.tl = null;
      this.split = null;
    }

    // Set initial state without playing
    prepare() {
      const { el, type, options } = this;

      // Create comprehensive animation presets
      const presets = {
        // Basic fade animations
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

        // Scale animations
        scale: {
          from: { autoAlpha: 0, scale: 0.8 },
          to: { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        },
        scaleX: {
          from: { autoAlpha: 0, scaleX: 0, transformOrigin: 'center center' },
          to: { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
        },

        // Text split animations
        splitText: {
          from: { autoAlpha: 0, y: 20 },
          to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          split: true,
          splitType: 'chars',
        },
        splitWords: {
          from: { autoAlpha: 0, y: 30, rotateX: -45 },
          to: { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' },
          split: true,
          splitType: 'words',
        },

        // Stagger animations
        staggerUp: {
          from: { autoAlpha: 0, y: 30 },
          to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          stagger: true,
          staggerAmount: 0.1,
        },
        staggerDown: {
          from: { autoAlpha: 0, y: -30 },
          to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          stagger: true,
          staggerAmount: 0.1,
        },
        staggerLeft: {
          from: { autoAlpha: 0, x: -30 },
          to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          stagger: true,
          staggerAmount: 0.1,
        },
        staggerRight: {
          from: { autoAlpha: 0, x: 30 },
          to: { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          stagger: true,
          staggerAmount: 0.1,
        },
        staggerScale: {
          from: { autoAlpha: 0, scale: 0.8 },
          to: { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          stagger: true,
          staggerAmount: 0.1,
        },

        // SVG animations
        drawSVG: {
          from: { drawSVG: 0 },
          to: { drawSVG: '100%', duration: 2.5, ease: 'power2.inOut' },
        },
      };

      // Get preset or use default
      const preset = presets[type] || presets.fadeUp;

      // Create timeline but paused
      this.tl = $gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 80%',
          markers: process.env.NODE_ENV === 'development' && options.markers,
          toggleActions: 'play play play reverse',
        },
      });

      // Handle sequence animations
      if (options.sequence) {
        const group = getSequenceGroup(el);
        const sequenceDelay = options.sequenceDelay || 0.3;
        const initialDelay = options.delay || 0;

        group.forEach((element, index) => {
          // Set initial state
          $gsap.set(element, preset.from);

          // Add to timeline
          if (index === 0) {
            this.tl.to(
              element,
              {
                ...preset.to,
                duration: options.duration || preset.to.duration || 0.8,
                delay: initialDelay,
              },
              0
            );
          } else {
            this.tl.to(
              element,
              {
                ...preset.to,
                duration: options.duration || preset.to.duration || 0.8,
              },
              `<+=${sequenceDelay}`
            );
          }
        });
      }
      // Handle text splitting
      else if (preset.split && $SplitText) {
        const splitType = options.type || preset.splitType || 'chars';
        this.split = new $SplitText(el, {
          type: splitType,
          linesClass: 'split-line',
          charsClass: 'split-char',
          wordsClass: 'split-word',
        });

        const elements = this.split[splitType];
        $gsap.set(elements, preset.from);

        this.tl.to(elements, {
          ...preset.to,
          stagger: options.stagger || 0.02,
          delay: options.delay || 0,
          duration: options.duration || preset.to.duration || 0.8,
        });
      }
      // Handle stagger animations
      else if (preset.stagger) {
        const children = el.children;
        if (children.length > 0) {
          $gsap.set(children, preset.from);

          this.tl.to(children, {
            ...preset.to,
            stagger: options.stagger || preset.staggerAmount || 0.1,
            delay: options.delay || 0,
            duration: options.duration || preset.to.duration || 0.8,
          });
        } else {
          // Fallback to regular animation if no children
          $gsap.set(el, preset.from);
          this.tl.to(el, {
            ...preset.to,
            delay: options.delay || 0,
            duration: options.duration || preset.to.duration || 0.8,
          });
        }
      }
      // SVG specific animations
      else if (type === 'drawSVG' && $gsap.getProperty(el, 'drawSVG') !== undefined) {
        $gsap.set(el, preset.from);
        this.tl.to(el, {
          ...preset.to,
          delay: options.delay || 0,
          duration: options.duration || preset.to.duration || 2.5,
        });
      }
      // Regular animation
      else {
        $gsap.set(el, preset.from);
        this.tl.to(el, {
          ...preset.to,
          delay: options.delay || 0,
          duration: options.duration || preset.to.duration || 0.8,
        });
      }

      // Disable scrolltrigger until play
      if (this.tl.scrollTrigger) {
        this.tl.scrollTrigger.disable();
      }

      return this;
    }

    // Play the animation
    play() {
      if (this.tl && this.tl.scrollTrigger) {
        this.tl.scrollTrigger.enable();
      }
    }

    // Clean up
    destroy() {
      if (this.split) {
        this.split.revert();
      }

      if (this.tl) {
        this.tl.kill();
      }
    }
  }

  // Create directive
  const scrollAnimDirective = {
    mounted(el, binding) {
      if (!process.client) return;

      try {
        // Create context if needed
        if (!ctx) {
          ctx = $gsap.context(() => {});
        }

        // Get animation type and options
        let type = 'fadeUp';
        let options = {};

        if (typeof binding.value === 'string') {
          type = binding.value;
        } else if (typeof binding.value === 'object') {
          options = binding.value;
          type = binding.arg || 'fadeUp';
        } else if (binding.arg) {
          type = binding.arg;
        }

        // Create animation and add to collection
        const animation = new Animation(el, type, options);
        animations.push(animation);

        // If animations are already playing, prepare and play this one immediately
        if (state.playing) {
          animation.prepare().play();
        }
      } catch (error) {
        console.warn('[v-scroll-anim] Error:', error);
      }
    },

    // Clean up on unmount
    unmounted(el) {
      if (!process.client) return;

      // No need to search for specific animation - will be handled by global cleanup
    },
  };

  // Register directive
  nuxtApp.vueApp.directive('scroll-anim', scrollAnimDirective);

  // Clear on page navigation
  nuxtApp.hook('page:start', () => {
    if (ctx) {
      // Clean up splits
      animations.forEach((anim) => {
        if (anim.destroy) {
          anim.destroy();
        }
      });

      ctx.revert();
      ctx = null;
    }
    animations = [];
    state.prepared = false;
    state.playing = false;
  });

  // Prepare animations when page is ready
  nuxtApp.hook('page:finish', () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Wait a bit for components to be mounted
    setTimeout(() => {
      prepareAnimations();
    }, 50);
  });

  // Provide methods globally
  return {
    provide: {
      animations: {
        // Check if animations are prepared
        isPrepared: () => state.prepared,

        // Check if animations are playing
        isPlaying: () => state.playing,

        // Manually prepare all animations
        prepare: prepareAnimations,

        // Manually play all animations
        play: playAnimations,

        // Reset animation state
        reset: () => {
          animations.forEach((anim) => {
            if (anim.tl && anim.tl.scrollTrigger) {
              anim.tl.scrollTrigger.disable();
            }

            if (anim.destroy) {
              anim.destroy();
            }
          });
          state.prepared = false;
          state.playing = false;
        },
      },
    },
  };
});
