import { defineStore } from 'pinia';
import { useAppConfig, useNuxtApp } from '#imports';
import { useLoaderStore } from './loaderStore';

// Define the ScrollTo options type
interface ScrollToOptions {
  duration?: number;
  ease?: string;
  offset?: number;
}

export interface MenuItem {
  label: string;
  link: string;
  children?: MenuItem[];
}

export const useMenuStore = defineStore('menu', () => {
  // State
  const isMobileMenuOpen = ref(false);
  const activeDropdownId = ref<string | null>(null);
  const appConfig = useAppConfig();
  const menuItems = computed(() => appConfig.navigation?.main?.items || []);
  const isMenuReady = ref(false);
  const isPrepared = ref(false);

  // Animation references
  const menuAnimation = ref<gsap.core.Timeline | null>(null);
  const dropdownAnimations = reactive(new Map<string, gsap.core.Timeline>());

  // Reference to loader store
  const loaderStore = useLoaderStore();

  // Setup mobile menu (prepare only)
  function prepareMenu() {
    if (!process.client) return;
    if (isPrepared.value) return;

    const { $gsap } = useNuxtApp();

    // Find elements
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;

    const menuItems = document.querySelectorAll('.mobile-menu .nav-menu__item');
    const menuButton = document.querySelector('.mobile-menu-button');

    // Set initial states
    $gsap.set(menu, {
      display: 'none',
      opacity: 0,
    });

    $gsap.set([menuItems, menuButton], {
      autoAlpha: 0,
      y: 20,
    });

    // Create animation timeline but don't play it yet
    menuAnimation.value = $gsap
      .timeline({ paused: true })
      .to(menu, {
        display: 'grid',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(
        [menuItems, menuButton],
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.3,
        },
        '-=0.2'
      );

    prepareDropdowns();
    isPrepared.value = true;
  }

  // Setup mobile menu when needed
  function setupMobileMenu() {
    if (!process.client) return;

    // Make sure we've prepared the animations first
    if (!isPrepared.value) {
      prepareMenu();
    }

    // Only mark as ready if loader is already gone, otherwise wait for it
    if (!loaderStore.isActive) {
      isMenuReady.value = true;
    } else {
      // Watch for loader to disappear
      const stopWatch = watch(
        () => loaderStore.isActive,
        (isActive) => {
          if (!isActive) {
            isMenuReady.value = true;
            stopWatch(); // Clean up the watcher
          }
        },
        { immediate: true }
      );
    }
  }

  // Setup dropdown animations
  function prepareDropdowns() {
    if (!process.client) return;

    const { $gsap } = useNuxtApp();

    // Clear existing animations
    dropdownAnimations.clear();

    // Setup new dropdown animations
    document.querySelectorAll('.nav-menu.mobile .nav-menu__item').forEach((item, index) => {
      const submenu = item.querySelector('.nav-menu__item-submenu');
      const arrow = item.querySelector('.dropdown-arrow');

      if (!submenu || !arrow) return;

      const dropdownId = `dropdown-${index}`;

      // Set initial state
      $gsap.set(submenu, {
        display: 'grid',
        maxHeight: 0,
        height: 'auto',
        opacity: 0,
        visibility: 'visible',
      });

      // Create timeline
      const tl = $gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.4, ease: 'power2.inOut' }, // Slightly faster
        })
        .to(submenu, {
          maxHeight: '50vh',
          opacity: 1,
          immediateRender: false,
        })
        .to(
          arrow,
          {
            rotation: 90,
            ease: 'power2.out',
          },
          0
        );

      dropdownAnimations.set(dropdownId, tl);
    });
  }

  // Toggle mobile menu
  function toggleMenu() {
    if (!process.client) return;

    // Make sure menu is ready before toggling
    if (!isMenuReady.value) {
      setupMobileMenu();
      if (!isMenuReady.value) return; // Still not ready, exit
    }

    // Toggle state and play animation
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
      // Add overflow hidden to body when menu is open
      document.body.style.overflow = 'hidden';
      menuAnimation.value?.play();
    } else {
      // Restore scroll when menu is closed
      document.body.style.overflow = '';
      menuAnimation.value?.reverse();
      // Close any open dropdowns
      closeDropdowns();
    }
  }

  // Close the menu
  function closeMenu() {
    if (!isMobileMenuOpen.value || !process.client || !isMenuReady.value) return;

    isMobileMenuOpen.value = false;
    document.body.style.overflow = ''; // Restore scroll
    menuAnimation.value?.reverse();
    closeDropdowns();
  }

  // Toggle dropdown
  function toggleDropdown(itemIndex: number) {
    if (!process.client) return;

    const dropdownId = `dropdown-${itemIndex}`;
    const timeline = dropdownAnimations.get(dropdownId);

    if (!timeline) return;

    // Close previously open dropdown if different
    if (activeDropdownId.value && activeDropdownId.value !== dropdownId) {
      const prevTimeline = dropdownAnimations.get(activeDropdownId.value);
      if (prevTimeline) prevTimeline.reverse();
    }

    // Toggle current dropdown
    if (activeDropdownId.value === dropdownId) {
      timeline.reverse();
      activeDropdownId.value = null;
    } else {
      timeline.play();
      activeDropdownId.value = dropdownId;
    }
  }

  // Close all dropdowns
  function closeDropdowns() {
    if (!process.client || !activeDropdownId.value) return;

    const timeline = dropdownAnimations.get(activeDropdownId.value);
    if (timeline) timeline.reverse();
    activeDropdownId.value = null;
  }

  // Handle menu item click
  async function handleMenuItemClick(link: string, router: any, event: MouseEvent) {
    if (!process.client) return;

    // Close mobile menu if open
    if (isMobileMenuOpen.value) {
      closeMenu();
    }

    // Handle hash links with smooth scroll
    if (link.startsWith('#')) {
      event.preventDefault();
      const { $gsap } = useNuxtApp();
      const element = document.querySelector(link);

      if (element) {
        $gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: element,
            offsetY: 100,
          },
          ease: 'power2.inOut',
        });
      }
      return;
    }

    // Regular navigation
    await router.push(link);
  }

  // Clean up when component unmounts
  function cleanup() {
    if (!process.client) return;

    // Kill animations
    if (menuAnimation.value) {
      menuAnimation.value.kill();
      menuAnimation.value = null;
    }

    dropdownAnimations.forEach((timeline) => timeline.kill());
    dropdownAnimations.clear();

    // Restore any body styles
    document.body.style.overflow = '';

    // Reset state
    isMobileMenuOpen.value = false;
    activeDropdownId.value = null;
    isMenuReady.value = false;
    isPrepared.value = false;
  }

  // Reset menu on page change
  function resetMenu() {
    if (isMobileMenuOpen.value) {
      // Restore scroll if menu was open
      if (process.client) {
        document.body.style.overflow = '';
      }
      isMobileMenuOpen.value = false;
    }
    activeDropdownId.value = null;
  }

  // Hook into page transitions
  if (process.client) {
    const nuxtApp = useNuxtApp();

    // Prepare animations early during page load
    nuxtApp.hook('page:finish', () => {
      prepareMenu();
    });

    // Reset when navigation starts
    nuxtApp.hook('page:start', () => {
      resetMenu();
    });

    // Watch for route changes to close menu
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        if (isMobileMenuOpen.value) {
          resetMenu();
        }
      }
    );
  }

  return {
    // State
    isMobileMenuOpen,
    activeDropdownId,
    menuItems,
    isMenuReady,
    isPrepared,

    // Actions
    prepareMenu,
    setupMobileMenu,
    toggleMenu,
    closeMenu,
    toggleDropdown,
    handleMenuItemClick,
    resetMenu,
    cleanup,
  };
});
