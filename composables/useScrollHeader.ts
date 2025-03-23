import { useElementBounding, useThrottleFn } from '@vueuse/core';

export const useScrollHeader = () => {
  // Refs for header element and its height
  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef, { reset: false });

  // Track scroll position and direction
  let lastScrollY = 0;

  // Set CSS variables based on header height
  const setHeaderHeightCSSVars = () => {
    if (!process.client || !headerHeight.value) return;

    document.documentElement.style.setProperty('--header-height', `${headerHeight.value}px`);

    const isMobileView = window.innerWidth < 768;
    if (isMobileView) {
      document.documentElement.style.setProperty(
        '--header-height-mobile',
        `${headerHeight.value}px`
      );
    } else {
      document.documentElement.style.setProperty(
        '--header-height-desktop',
        `${headerHeight.value}px`
      );
    }
  };

  // Throttled scroll handler for better performance
  const handleScroll = useThrottleFn(() => {
    if (!headerRef.value || !process.client) return;

    try {
      const currentScrollY = window.scrollY;

      // Minimum scroll threshold to trigger header visibility change (10px)
      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      // Determine scroll direction
      const scrollingDown = currentScrollY > lastScrollY;

      // Only hide header after scrolling past it
      if (scrollingDown && currentScrollY > headerHeight.value) {
        // Scrolling down - hide header
        headerRef.value.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show header
        headerRef.value.style.transform = 'translateY(0)';
      }

      // Update last scroll position
      lastScrollY = currentScrollY;
    } catch (error) {
      console.warn('Error in scroll handler:', error);
    }
  }, 100);

  // Handle resize events
  const handleResize = useThrottleFn(() => {
    if (headerRef.value && headerHeight.value) {
      setHeaderHeightCSSVars();
    }
  }, 200);

  // Initialize header behavior
  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) return;

    try {
      // Set initial styles
      headerRef.value.style.position = 'fixed';
      headerRef.value.style.top = '0';
      headerRef.value.style.width = '100%';
      headerRef.value.style.zIndex = '50';
      headerRef.value.style.transition = 'transform 0.3s ease';

      // Set initial header height CSS variables
      setHeaderHeightCSSVars();

      // Set initial scroll position
      lastScrollY = window.scrollY;

      // Add event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
    } catch (error) {
      console.warn('Error initializing scroll header:', error);
    }
  };

  // Clean up event listeners
  const cleanup = () => {
    if (!process.client) return;

    try {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  };

  // Clean up on component unmount
  onUnmounted(() => {
    if (process.client) {
      cleanup();
    }
  });

  // Watch for header height changes
  watch(headerHeight, (newHeight) => {
    if (newHeight && process.client) {
      setHeaderHeightCSSVars();
    }
  });

  return {
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
    setHeaderHeightCSSVars,
  };
};
