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
  const isPrepared = ref(false);

  // Animation references
  const menuAnimation = ref<gsap.core.Timeline | null>(null);
  const dropdownAnimations = reactive(new Map<string, gsap.core.Timeline>());

  // Reference to loader store
  const loaderStore = useLoaderStore();

  // Setup mobile menu animations
  function setupMobileMenu() {
    if (!process.client || isPrepared.value) return;

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

    // Create menu animation
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

    // Setup dropdown animations
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
          defaults: { duration: 0.4, ease: 'power2.inOut' },
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

    isPrepared.value = true;
  }

  // Toggle mobile menu
  function toggleMenu() {
    if (!process.client || !isPrepared.value) return;

    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden';
      menuAnimation.value?.play();
    } else {
      document.body.style.overflow = '';
      menuAnimation.value?.reverse();
      closeDropdowns();
    }
  }

  // Close the menu
  function closeMenu() {
    if (!isMobileMenuOpen.value || !process.client) return;

    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
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

  // Clean up animations and state
  function cleanup() {
    if (!process.client) return;

    menuAnimation.value?.kill();
    menuAnimation.value = null;

    dropdownAnimations.forEach((timeline) => timeline.kill());
    dropdownAnimations.clear();

    document.body.style.overflow = '';

    isMobileMenuOpen.value = false;
    activeDropdownId.value = null;
    isPrepared.value = false;
  }

  // Hook into page transitions
  if (process.client) {
    const nuxtApp = useNuxtApp();

    // Setup menu when page is ready and loader is hidden
    watch(
      () => loaderStore.isVisible,
      (isVisible) => {
        if (!isVisible && !isPrepared.value) {
          setupMobileMenu();
        }
      },
      { immediate: true }
    );

    // Reset menu state on page navigation
    nuxtApp.hook('page:start', () => {
      if (isMobileMenuOpen.value) {
        document.body.style.overflow = '';
        isMobileMenuOpen.value = false;
      }
      activeDropdownId.value = null;
    });
  }

  return {
    // State
    isMobileMenuOpen,
    activeDropdownId,
    menuItems,
    isPrepared,

    // Actions
    setupMobileMenu,
    toggleMenu,
    closeMenu,
    toggleDropdown,
    handleMenuItemClick,
    cleanup,
  };
});
