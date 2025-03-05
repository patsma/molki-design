import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { useMobileDetection } from '~/composables/useMobileDetection';
import { useLoaderStore } from '@/stores/loaderStore';

export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother, $SplitText } = nuxtApp;
  const { isMobile } = useMobileDetection();
  const loaderStore = useLoaderStore();
  let scrollSmoother = null;
  let animationContext = null;

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
  };

  const initSectionAnimations = () => {
    // console.log('🎯 Initializing section animations');
    const DEFAULT_SCROLL_START = 'top 80%';
    const DEFAULT_SCROLL_END = 'bottom 20%';
    const DEFAULT_TOGGLE_ACTIONS = 'play none none none';
    const GLOBAL_OVERLAP = '-=0.5';

    const ctx = $gsap.context(() => {
      document.querySelectorAll('[data-scroll-section]').forEach((section) => {
        // console.log('📍 Found scroll section:', section);
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
          // console.log(
          //   '🔄 Processing item:',
          //   item,
          //   'Animation type:',
          //   item.getAttribute('data-scroll-animation')
          // );
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
    });
    return ctx;
  };

  const initScrollSmoother = () => {
    if (window.__gsap_init) return;
    window.__gsap_init = true;

    // console.log('🚀 Initializing ScrollSmoother, isMobile:', isMobile.value);
    $gsap.registerPlugin($ScrollTrigger, $ScrollSmoother, $SplitText);
    registerEffects();

    if (isMobile.value) {
      // console.log('📱 Mobile detected - initializing native scroll');
      animationContext = initSectionAnimations();
      $gsap.delayedCall(0.1, () => {
        $ScrollTrigger.refresh(true);
        window.scrollTo(0, 0);
      });
      return;
    }

    // Desktop setup
    const wrapper = document.querySelector('#smooth-wrapper');
    const content = document.querySelector('#smooth-content');

    if (wrapper && content) {
      // console.log('🖥️ Creating ScrollSmoother instance');
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

    console.log('🔄 Plugin: Resetting effects');
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

  // Update the transition hooks with better timing
  nuxtApp.hook('page:start', () => {
    // console.log('🔄 [1] Page transition starting');
    if (!process.client) return;

    // Show loader immediately and hide content
    loaderStore.startLoading();

    // Handle ScrollSmoother after a small delay
    $gsap.delayedCall(0.1, () => {
      if (scrollSmoother && !isMobile.value) {
        // console.log('🔄 [2] Freezing ScrollSmoother');
        scrollSmoother.paused(true);
        $gsap.set(scrollSmoother, { scrollTop: 0 });
      }
    });
  });

  nuxtApp.hook('page:transition:finish', () => {
    // console.log('🔄 [3] Page transition finished');
    if (!process.client) return;

    const transitionTL = $gsap.timeline({
      onComplete: () => {
        // console.log('🔄 [6] All transitions complete, hiding loader');
        $gsap.delayedCall(0.3, () => {
          loaderStore.finishLoading();
        });
      },
    });

    // Reset ScrollSmoother first
    if (scrollSmoother && !isMobile.value) {
      transitionTL.add(() => {
        scrollSmoother.scrollTop(0);
        scrollSmoother.paused(false);
      });
    }

    // Then handle animations with shorter delays
    transitionTL
      .add(() => {
        // console.log('🔄 [4] Resetting effects and initializing animations');
        if (animationContext) {
          animationContext.revert();
        }
        resetEffects();
        animationContext = initSectionAnimations();
      }, '+=0.1')
      .add(() => {
        // console.log('🔄 [5] Refreshing ScrollTrigger');
        $ScrollTrigger.refresh(true);
      }, '+=0.1');

    if (isMobile.value) {
      window.scrollTo(0, 0);
    }
  });

  // Keep your existing cleanup code
  nuxtApp.hook('app:unmount', () => {
    delete window.__gsap_init;
    if (scrollSmoother) {
      scrollSmoother.kill();
    }
    if (animationContext) {
      animationContext.revert();
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
