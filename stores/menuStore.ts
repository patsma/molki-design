import { defineStore } from 'pinia';
import { useAppConfig } from '#imports';

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

export const useMenuStore = defineStore('menu', {
  state: () => {
    const appConfig = useAppConfig();
    const configMenuItems = appConfig.navigation?.main?.items || [];

    return {
      isMobileMenuOpen: false,
      mobileMenuTimeline: null as gsap.core.Timeline | null,
      gsapInstance: null as typeof gsap | null,
      menuItems: configMenuItems as MenuItem[],
      activeDropdownId: null as string | null,
      dropdownTimelines: new Map<string, gsap.core.Timeline>(),
    };
  },

  actions: {
    initAnimation($gsap: typeof gsap) {
      if (!process.client) {
        console.warn('⚠️ Not running on client side, skipping animation init');
        return;
      }

      try {
        this.gsapInstance = $gsap;

        const menu = document.querySelector('.mobile-menu');
        const menuItems = document.querySelectorAll('.mobile-menu .nav-menu__item');
        const menuButton = document.querySelector('.mobile-menu-button');

        if (!menu || !menuItems.length) {
          console.warn('⚠️ Menu elements not found');
          return;
        }

        // Initial state
        $gsap.set(menu, {
          display: 'none',
          xPercent: 0,
          opacity: 0,
        });

        $gsap.set([menuItems, menuButton], {
          autoAlpha: 0,
          y: 20,
        });

        this.mobileMenuTimeline = $gsap
          .timeline({ paused: true })
          .to(menu, {
            display: 'grid',
            xPercent: 0,
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

        // Watch for route changes
        const route = useRoute();
        watch(
          () => route.path,
          () => {
            if (this.isMobileMenuOpen) {
              this.closeMenu();
            }
          }
        );

        this.initDropdownTimelines();
      } catch (error) {
        console.warn('Error initializing menu animations:', error);
      }
    },

    initDropdownTimelines() {
      if (!this.gsapInstance || !process.client) return;

      try {
        // Clean up existing timelines
        this.cleanup();

        document.querySelectorAll('.nav-menu.mobile .nav-menu__item').forEach((item, index) => {
          const submenu = item.querySelector('.nav-menu__item-submenu');
          const arrow = item.querySelector('.dropdown-arrow');

          if (!submenu || !arrow || !this.gsapInstance) return;

          const dropdownId = `dropdown-${index}`;

          // First, measure the content height
          this.gsapInstance.set(submenu, {
            display: 'grid',
            maxHeight: 'none',
            height: 'auto',
            opacity: 0,
            visibility: 'hidden',
          });

          const contentHeight = (submenu as HTMLElement).offsetHeight;

          // Set initial state
          this.gsapInstance.set(submenu, {
            display: 'grid',
            maxHeight: 0,
            height: 'auto',
            opacity: 0,
            visibility: 'visible',
          });

          const tl = this.gsapInstance
            .timeline({
              paused: true,
              defaults: { duration: 0.7, ease: 'power2.inOut' },
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

          this.dropdownTimelines.set(dropdownId, tl);
        });
      } catch (error) {
        console.warn('Error initializing dropdown timelines:', error);
      }
    },

    toggleDropdown(itemIndex: number) {
      const dropdownId = `dropdown-${itemIndex}`;
      const timeline = this.dropdownTimelines.get(dropdownId);

      if (!timeline) return;

      try {
        if (this.activeDropdownId && this.activeDropdownId !== dropdownId) {
          const activeTimeline = this.dropdownTimelines.get(this.activeDropdownId);
          activeTimeline?.reverse();
          this.activeDropdownId = null;
        }

        if (timeline.progress() === 0 || timeline.reversed()) {
          timeline.play();
          this.activeDropdownId = dropdownId;
        } else {
          timeline.reverse();
          this.activeDropdownId = null;
        }
      } catch (error) {
        console.warn('Error toggling dropdown:', error);
      }
    },

    toggleMenu() {
      try {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        if (!this.mobileMenuTimeline) {
          console.warn('Timeline not initialized');
          return;
        }

        if (this.isMobileMenuOpen) {
          this.mobileMenuTimeline.play();
        } else {
          this.mobileMenuTimeline.reverse();
        }
      } catch (error) {
        console.warn('Error toggling menu:', error);
      }
    },

    closeMenu() {
      if (!this.isMobileMenuOpen) return;

      try {
        this.isMobileMenuOpen = false;
        this.mobileMenuTimeline?.reverse();
      } catch (error) {
        console.warn('Error closing menu:', error);
      }
    },

    async handleMenuItemClick(link: string, router: any, event: MouseEvent) {
      try {
        // Close mobile menu if open
        if (this.isMobileMenuOpen) {
          this.closeMenu();
        }

        // Handle hash links
        if (link.startsWith('#')) {
          event.preventDefault();
          const element = document.querySelector(link);
          if (element) {
            const { $gsap } = useNuxtApp();
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

        // Handle regular navigation
        await router.push(link);
      } catch (error) {
        console.warn('Error handling menu item click:', error);
      }
    },

    cleanup() {
      if (!process.client) return;

      try {
        // Clean up mobile menu timeline
        if (this.mobileMenuTimeline) {
          this.mobileMenuTimeline.kill();
          this.mobileMenuTimeline = null;
        }

        // Clean up dropdown timelines
        this.dropdownTimelines.forEach((timeline) => {
          timeline.kill();
        });
        this.dropdownTimelines.clear();
        this.activeDropdownId = null;

        // Reset state
        this.isMobileMenuOpen = false;
        this.gsapInstance = null;
      } catch (error) {
        console.warn('Error during menu cleanup:', error);
      }
    },
  },
});
