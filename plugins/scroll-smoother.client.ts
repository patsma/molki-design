import { useMobileDetection } from '~/composables/useMobileDetection';
import { useLoaderStore } from '@/stores/loaderStore';
import { useAnimationStore } from '~/stores/animationStore';

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
  const animationStore = useAnimationStore();
  let scrollSmoother: any = null;
  const debug = process.env.NODE_ENV === 'development';

  const log = (message: string, data?: any) => {
    if (debug) {
      console.log(`[ScrollSmoother] ${message}`, data || '');
    }
  };

  // Initialize scroll-based animations
  const initAnimations = () => {
    if (!process.client) return;
    const { $gsap, $ScrollTrigger } = useNuxtApp();
    log('Initializing animations');

    // First kill any existing ScrollTriggers
    $ScrollTrigger.getAll().forEach((st: any) => st.kill());

    document.querySelectorAll('[data-scroll-section]').forEach((section, index) => {
      const items = section.querySelectorAll('[data-scroll-item]');
      if (!items.length) return;

      const id = `section_${index}`;
      log(`Creating timeline for section ${id}`, { items: items.length });

      // Create a timeline for this section
      const tl = $gsap.timeline({ paused: true });

      // Add animations to timeline
      items.forEach((item: Element) => {
        const type = item.getAttribute('data-scroll-animation') || 'fadeUp';
        const delay = parseFloat(item.getAttribute('data-scroll-delay') || '0');
        const duration = parseFloat(item.getAttribute('data-scroll-duration') || '0.5');

        log(`Adding ${type} animation to timeline`, { delay, duration });

        if (type === 'fadeUp') {
          tl.fromTo(
            item,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              ease: 'power2.out',
            },
            delay
          );
        } else if (type === 'fadeIn') {
          tl.fromTo(
            item,
            { opacity: 0 },
            {
              opacity: 1,
              duration,
              ease: 'power2.out',
            },
            delay
          );
        }
      });

      // Create ScrollTrigger after timeline is set up
      $ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          log(`Section ${id} entered viewport`);
          tl.play();
        },
        onLeaveBack: () => {
          log(`Section ${id} left viewport`);
          tl.pause();
        },
        onRefresh: ({ progress, direction, isActive }) => {
          log(`ScrollTrigger refresh for ${id}`, { progress, direction, isActive });
        },
      });

      // Register timeline with animation store
      animationStore.register(id, tl);
    });

    // Refresh ScrollTrigger after all animations are set up
    $ScrollTrigger.refresh();
  };

  // Initialize ScrollSmoother
  const init = () => {
    if (!process.client) return;
    log('Initializing ScrollSmoother');

    const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

    // Clean up existing setup
    cleanup();

    // Setup ScrollSmoother for desktop
    if (!isMobile.value) {
      const wrapper = document.querySelector('#smooth-wrapper');
      const content = document.querySelector('#smooth-content');

      if (wrapper && content) {
        log('Creating ScrollSmoother instance');
        try {
          scrollSmoother = $ScrollSmoother.create({
            wrapper,
            content,
            smooth: 1,
            effects: true,
          });

          // Add scroll listener instead of using onUpdate
          if (debug) {
            window.addEventListener(
              'scroll',
              () => {
                requestAnimationFrame(() => {
                  if (scrollSmoother && scrollSmoother.scrollTop) {
                    const scrollTop = Math.round(scrollSmoother.scrollTop());
                    // Only log every 100px to avoid console spam
                    if (scrollTop % 100 === 0) {
                      log('Scroll position', { scrollTop });
                    }
                  }
                });
              },
              { passive: true }
            );
          }
        } catch (error) {
          console.error('Error creating ScrollSmoother:', error);
        }
      }
    }

    // Initialize animations with a slight delay
    setTimeout(() => {
      initAnimations();
      animationStore.setReady(true);
      log('Animation system initialized');
      // Finish loading after animations are ready
      loaderStore.finishLoading();
    }, 100);
  };

  // Clean up
  const cleanup = () => {
    log('Cleaning up ScrollSmoother');

    const { $ScrollTrigger } = useNuxtApp();

    // Kill all ScrollTriggers first
    if ($ScrollTrigger) {
      $ScrollTrigger.getAll().forEach((st: any) => st.kill());
    }

    // Kill ScrollSmoother
    if (scrollSmoother) {
      scrollSmoother.kill();
      scrollSmoother = null;
    }

    // Clean up animation store
    animationStore.cleanup();
  };

  // Watch for loader state changes
  watch(
    () => loaderStore.isLoading,
    (isLoading) => {
      log('Loader state changed', { isLoading });
      if (!isLoading && animationStore.isReady) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          animationStore.playInView();
        }, 50);
      }
    }
  );

  // Initialize on plugin load
  if (process.client) {
    // Delay initialization to ensure DOM is ready
    window.addEventListener('load', () => {
      init();
    });
  }

  // Handle page transitions
  nuxtApp.hook('page:start', () => {
    if (!process.client) return;
    log('Page transition started');
    loaderStore.startLoading();
    cleanup();
  });

  nuxtApp.hook('page:finish', () => {
    if (!process.client) return;
    log('Page transition finished');
    // Initialize with a delay to ensure new page content is ready
    setTimeout(() => {
      init();
    }, 100);
  });

  return {
    provide: {
      smoothScroller: {
        get: () => scrollSmoother,
        init,
        cleanup,
        playAnimations: () => animationStore.playInView(),
      },
    },
  };
});
