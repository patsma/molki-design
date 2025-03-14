import { useMobileDetection } from '~/composables/useMobileDetection';
import { useLoaderStore } from '@/stores/loaderStore';

/**
 * Scroll Smoother Plugin for Nuxt
 *
 * This plugin sets up smooth scrolling and scroll-based animations
 * using the @hypernym/nuxt-gsap module.
 *
 * Features:
 * - Uses Nuxt GSAP module's global instances via useNuxtApp()
 * - Provides smooth scrolling for desktop devices
 * - Falls back to native scrolling for mobile
 * - Allows configuration via data attributes:
 *   - data-scroll-section: Container for animations
 *   - data-scroll-item: Element to animate
 *   - data-scroll-animation: Animation type (fadeUp, fadeIn)
 *   - data-scroll-order: Order of animation (number)
 *   - data-scroll-delay: Delay before animation (seconds)
 *   - data-scroll-duration: Duration of animation (seconds)
 *   - data-scroll-stagger: Stagger between multiple elements (seconds)
 *   - data-scroll-independent: Whether to animate independently (true/false)
 *   - data-scroll-start: ScrollTrigger start position
 *   - data-scroll-end: ScrollTrigger end position
 *   - data-scroll-toggle: ScrollTrigger toggle actions
 *
 * Usage example in a component:
 * <div data-scroll-section>
 *   <h1 data-scroll-item data-scroll-animation="fadeUp">Title</h1>
 *   <p data-scroll-item data-scroll-animation="fadeIn" data-scroll-order="1">Text</p>
 * </div>
 */

export default defineNuxtPlugin((nuxtApp) => {
  const { isMobile } = useMobileDetection();
  const loaderStore = useLoaderStore();

  // Use ref to track initialization state cleanly
  const isInitialized = ref(false);

  // Store references with proper typing using 'any' to avoid TypeScript errors
  // We use 'any' here since the exact types from GSAP are complex and would add
  // unnecessary verbosity to the code
  let scrollSmoother: any = null;
  let animationContext: any = null;

  // Register GSAP effects
  const registerEffects = () => {
    const { $gsap } = useNuxtApp();

    $gsap.registerEffect({
      name: 'fadeIn',
      effect: (targets: any, config: any) => {
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
      effect: (targets: any, config: any) => {
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

  // Set up scroll-based animations using data attributes
  const initSectionAnimations = () => {
    const { $gsap } = useNuxtApp();

    const DEFAULT_SCROLL_START = 'top 80%';
    const DEFAULT_SCROLL_END = 'bottom 20%';
    const DEFAULT_TOGGLE_ACTIONS = 'play none none none';
    const GLOBAL_OVERLAP = '-=0.5';

    const ctx = $gsap.context(() => {
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
          const duration = parseFloat(item.getAttribute('data-scroll-duration') || '0.5') || 0.5;
          const stagger = parseFloat(item.getAttribute('data-scroll-stagger') || '0.1') || 0.1;
          const delay = parseFloat(item.getAttribute('data-scroll-delay') || '0') || 0;

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
            tl.add(animation, `${position}${delay > 0 ? '+=' + delay : ''}`);
          }
        });
      });
    });
    return ctx;
  };

  // Initialize ScrollSmoother and animations
  const initScrollSmoother = () => {
    // Prevent multiple initializations
    if (isInitialized.value) return;
    isInitialized.value = true;

    const { $gsap, $ScrollTrigger, $ScrollSmoother, $SplitText } = useNuxtApp();

    // Register effects
    registerEffects();

    if (isMobile.value) {
      // Mobile setup (native scroll)
      animationContext = initSectionAnimations();
      $gsap.delayedCall(0.1, () => {
        $ScrollTrigger.refresh(true);
        window.scrollTo(0, 0);
      });
      return;
    }

    // Desktop setup (smooth scroll)
    const wrapper = document.querySelector('#smooth-wrapper');
    const content = document.querySelector('#smooth-content');

    if (wrapper && content) {
      // Create ScrollSmoother instance
      scrollSmoother = $ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        touchMultiplier: 2,
        ignoreMobileResize: true,
      } as any);

      // Initialize animations after a short delay
      $gsap.delayedCall(0.1, () => {
        initSectionAnimations();
        $ScrollTrigger.refresh();
      });
    }
  };

  const resetEffects = () => {
    if (!scrollSmoother) return;

    const { $gsap, $ScrollTrigger } = useNuxtApp();

    // Reset elements with speed data attribute
    const elements = document.querySelectorAll('[data-speed]');
    elements.forEach((el) => {
      $gsap.set(el, {
        clearProps: 'transform,willChange',
      });
    });

    $ScrollTrigger.refresh(true);
    scrollSmoother.effects('[data-speed], [data-lag]', {});
  };

  // Initialize on plugin load (client-side only)
  if (process.client) {
    initScrollSmoother();
  }

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    if (!process.client) return;

    const { $gsap } = useNuxtApp();

    // Show loader immediately and hide content
    loaderStore.startLoading();

    // Handle ScrollSmoother after a small delay
    $gsap.delayedCall(0.1, () => {
      if (scrollSmoother && !isMobile.value) {
        scrollSmoother.paused(true);
        $gsap.set(scrollSmoother, { scrollTop: 0 });
      }
    });
  });

  nuxtApp.hook('page:transition:finish', () => {
    if (!process.client) return;

    const { $gsap, $ScrollTrigger } = useNuxtApp();

    const transitionTL = $gsap.timeline({
      onComplete: () => {
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
        if (animationContext) {
          animationContext.revert();
        }
        resetEffects();
        animationContext = initSectionAnimations();
      }, '+=0.1')
      .add(() => {
        $ScrollTrigger.refresh(true);
      }, '+=0.1');

    // Reset scroll position for mobile
    if (isMobile.value) {
      window.scrollTo(0, 0);
    }
  });

  // Clean up on unmount
  onUnmounted(() => {
    if (scrollSmoother) {
      scrollSmoother.kill();
    }
    if (animationContext) {
      animationContext.revert();
    }
  });

  // Provide ScrollSmoother to components
  return {
    provide: {
      smoothScroller: {
        get: () => scrollSmoother,
        reset: resetEffects,
      },
    },
  };
});
