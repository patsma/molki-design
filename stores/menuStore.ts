import { defineStore } from 'pinia';
import { useAppConfig, useNuxtApp } from '#imports';

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

  // Only instantiate these on client side
  let mobileMenuTimeline: gsap.core.Timeline | null = null;
  let dropdownTimelines = new Map<string, gsap.core.Timeline>();

  // Setup mobile menu when component mounts
  function setupMobileMenu() {
    if (!process.client) return;

    const { $gsap } = useNuxtApp();

    // Find elements
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;

    const menuItems = document.querySelectorAll('.mobile-menu .nav-menu__item');
    const menuButton = document.querySelector('.mobile-menu-button');

    // Create timeline if not already created
    if (!mobileMenuTimeline) {
      // Set initial states
      $gsap.set(menu, {
        display: 'none',
        opacity: 0,
      });

      $gsap.set([menuItems, menuButton], {
        autoAlpha: 0,
        y: 20,
      });

      // Create animation timeline
      mobileMenuTimeline = $gsap
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
    }

    setupDropdowns();
  }

  // Setup dropdown animations
  function setupDropdowns() {
    if (!process.client) return;

    const { $gsap } = useNuxtApp();

    // Clear existing timelines
    dropdownTimelines.forEach((timeline) => timeline.kill());
    dropdownTimelines.clear();

    // Setup new dropdown timelines
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
          defaults: { duration: 0.5, ease: 'power2.inOut' },
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

      dropdownTimelines.set(dropdownId, tl);
    });
  }

  // Toggle mobile menu
  function toggleMenu() {
    if (!process.client) return;

    // Setup menu animations if not already done
    if (!mobileMenuTimeline) {
      setupMobileMenu();

      // If setup failed, return
      if (!mobileMenuTimeline) return;
    }

    // Toggle state and play animation
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
      mobileMenuTimeline.play();
    } else {
      mobileMenuTimeline.reverse();
      // Close any open dropdowns
      closeDropdowns();
    }
  }

  // Close the menu
  function closeMenu() {
    if (!isMobileMenuOpen.value || !process.client) return;

    isMobileMenuOpen.value = false;
    mobileMenuTimeline?.reverse();
    closeDropdowns();
  }

  // Toggle dropdown
  function toggleDropdown(itemIndex: number) {
    if (!process.client) return;

    const dropdownId = `dropdown-${itemIndex}`;
    const timeline = dropdownTimelines.get(dropdownId);

    if (!timeline) return;

    // Close previously open dropdown if different
    if (activeDropdownId.value && activeDropdownId.value !== dropdownId) {
      const prevTimeline = dropdownTimelines.get(activeDropdownId.value);
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

    const timeline = dropdownTimelines.get(activeDropdownId.value);
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

    // Kill all animations
    if (mobileMenuTimeline) {
      mobileMenuTimeline.kill();
      mobileMenuTimeline = null;
    }

    dropdownTimelines.forEach((timeline) => timeline.kill());
    dropdownTimelines.clear();

    // Reset state
    isMobileMenuOpen.value = false;
    activeDropdownId.value = null;
  }

  // Watch for route changes to close menu
  if (process.client) {
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        if (isMobileMenuOpen.value) {
          closeMenu();
        }
      }
    );
  }

  return {
    // State
    isMobileMenuOpen,
    activeDropdownId,
    menuItems,

    // Actions
    setupMobileMenu,
    toggleMenu,
    closeMenu,
    toggleDropdown,
    handleMenuItemClick,
    cleanup,
  };
});
