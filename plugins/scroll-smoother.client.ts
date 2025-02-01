import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother, $SplitText } = nuxtApp;
  let scrollSmoother = null;

  // Register GSAP effects
  const registerEffects = () => {
    $gsap.registerEffect({
      name: 'fadeIn',
      effect: (targets, config) => {
        return $gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: config.duration || 0.5,
            ease: 'power2.out',
            stagger: config.stagger || 0,
          }
        );
      },
      defaults: { duration: 0.5, stagger: 0 },
      extendTimeline: true,
    });

    $gsap.registerEffect({
      name: 'fadeUp',
      effect: (targets, config) => {
        return $gsap.fromTo(
          targets,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration || 0.5,
            ease: 'power2.out',
            stagger: config.stagger || 0,
          }
        );
      },
      defaults: { duration: 0.5, stagger: 0 },
      extendTimeline: true,
    });

    $gsap.registerEffect({
      name: 'splitText',
      effect: (targets, config) => {
        const targetElement = targets instanceof Element ? targets : targets[0];
        if (!targetElement) return;

        const split = new $SplitText(targetElement, { type: 'chars' });
        const tl = $gsap.timeline({
          onComplete: () => {
            if (config.revertOnComplete) split.revert(true);
          },
        });

        const durationPerChar = config.duration || 1;
        const staggerPerChar = config.stagger || 0.05;
        const totalChars = split.chars.length;

        tl.from(
          split.chars,
          {
            opacity: 0,
            y: 20,
            duration: durationPerChar,
            ease: 'power2.out',
            stagger: staggerPerChar,
          },
          0
        );

        const uElement = targetElement.querySelector('u');
        if (uElement) {
          tl.fromTo(
            uElement,
            { '--underline-scale': 0 },
            { '--underline-scale': 1, duration: durationPerChar, ease: 'sine.out' },
            0.1
          );
        }

        return tl;
      },
      defaults: { duration: 1, stagger: 0.05, revertOnComplete: false },
      extendTimeline: true,
    });
  };

  const initSectionAnimations = () => {
    const DEFAULT_SCROLL_START = 'top 80%';
    const DEFAULT_SCROLL_END = 'bottom 20%';
    const DEFAULT_TOGGLE_ACTIONS = 'play none none none';
    const GLOBAL_OVERLAP = '-=0.5';

    document.querySelectorAll('[data-scroll-section]').forEach((section) => {
      const sectionStart = section.getAttribute('data-scroll-start') || DEFAULT_SCROLL_START;
      const sectionEnd = section.getAttribute('data-scroll-end') || DEFAULT_SCROLL_END;
      const sectionToggleActions =
        section.getAttribute('data-scroll-toggle') || DEFAULT_TOGGLE_ACTIONS;

      const tl = $gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: sectionStart,
          end: sectionEnd,
          toggleActions: sectionToggleActions,
          markers: false, // Set to true for debugging
        },
      });

      const items = section.querySelectorAll('[data-scroll-item], [data-scroll-stagger-group]');
      const orderedItems = Array.from(items).sort((a, b) => {
        return (
          parseInt(a.getAttribute('data-scroll-order') || '0') -
          parseInt(b.getAttribute('data-scroll-order') || '0')
        );
      });

      orderedItems.forEach((item, index) => {
        const isIndependent = item.getAttribute('data-scroll-independent') === 'true';
        const animationType = item.getAttribute('data-scroll-animation') || 'fadeUp';
        const duration = parseFloat(item.getAttribute('data-scroll-duration')) || 0.5;
        const stagger = parseFloat(item.getAttribute('data-scroll-stagger')) || 0.1;
        const delay = parseFloat(item.getAttribute('data-scroll-delay')) || 0;

        if (isIndependent) {
          const itemStart = item.getAttribute('data-scroll-start') || DEFAULT_SCROLL_START;
          const itemEnd = item.getAttribute('data-scroll-end') || DEFAULT_SCROLL_END;
          const itemToggleActions =
            item.getAttribute('data-scroll-toggle') || DEFAULT_TOGGLE_ACTIONS;

          const independentTL = $gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: itemStart,
              end: itemEnd,
              toggleActions: itemToggleActions,
              markers: false,
            },
          });

          const animation = $gsap.effects[animationType](item, { duration, stagger });
          independentTL.add(animation, delay);
        } else {
          const position = index === 0 ? 0 : GLOBAL_OVERLAP;
          const animation = $gsap.effects[animationType](item, { duration, stagger });
          tl.add(animation, position + delay);
        }
      });
    });
  };

  const initScrollSmoother = () => {
    $gsap.registerPlugin($ScrollTrigger, $ScrollSmoother, $SplitText);
    registerEffects();

    const wrapper = document.querySelector('#smooth-wrapper');
    const content = document.querySelector('#smooth-content');

    if (wrapper && content) {
      scrollSmoother = $ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        touchMultiplier: 2,
        ignoreMobileResize: true,
      });

      $gsap.delayedCall(0.1, () => {
        initSectionAnimations();
        $ScrollTrigger.refresh();
      });
    }
  };

  const resetEffects = () => {
    if (!scrollSmoother) return;

    // console.log('🔄 Plugin: Resetting effects');
    const elements = document.querySelectorAll('[data-speed]');
    elements.forEach((el) => {
      $gsap.set(el, {
        clearProps: 'transform,willChange',
      });
    });

    $ScrollTrigger.refresh(true);
    scrollSmoother.effects('[data-speed], [data-lag]', true);
  };

  // Initialize on plugin load
  if (process.client) {
    initScrollSmoother();
  }

  // Handle page transitions
  nuxtApp.hook('page:transition:finish', () => {
    if (scrollSmoother) {
      scrollSmoother.scrollTop(0);
      resetEffects();

      // Re-init animations after transition
      $gsap.delayedCall(0.2, () => {
        initSectionAnimations();
        $ScrollTrigger.refresh();
      });
    }
  });

  // Cleanup on app unmount
  nuxtApp.hook('app:unmount', () => {
    if (scrollSmoother) {
      // console.log('🧹 Plugin: Cleaning up ScrollSmoother');
      scrollSmoother.kill();
    }
  });

  // Provide methods to components
  return {
    provide: {
      smoothScroller: {
        get: () => scrollSmoother,
        reset: resetEffects,
      },
    },
  };
});
