import { defineStore } from 'pinia';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { gsap } from 'gsap';

// Define the ScrollTo options type
interface ScrollToOptions {
  duration?: number;
  ease?: string;
  offset?: number;
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isMobileMenuOpen: false,
    mobileMenuTimeline: null as gsap.core.Timeline | null,
    gsapInstance: null as typeof gsap | null,
    activeDropdownId: null as string | null,
    dropdownTimelines: new Map<string, gsap.core.Timeline>(),
  }),

  actions: {
    initAnimation($gsap: typeof gsap) {
      console.log('🎨 Initializing animations');
      this.gsapInstance = $gsap;

      if (!process.client) {
        console.warn('⚠️ Not running on client side, skipping animation init');
        return;
      }

      const menu = document.querySelector('.mobile-menu');
      const menuItems = document.querySelectorAll('.mobile-menu .nav-menu__item');
      const menuButton = document.querySelector('.mobile-menu-button');

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
    },

    initDropdownTimelines() {
      if (!this.gsapInstance || !process.client) return;

      this.dropdownTimelines.forEach((tl) => tl.kill());
      this.dropdownTimelines.clear();

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
        console.log(`📏 Content height for ${dropdownId}:`, contentHeight);

        // Set initial state
        this.gsapInstance.set(submenu, {
          display: 'grid',
          maxHeight: 0,
          height: 'auto', // Keep auto height
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
    },

    toggleDropdown(itemIndex: number) {
      const dropdownId = `dropdown-${itemIndex}`;
      const timeline = this.dropdownTimelines.get(dropdownId);

      if (!timeline) return;

      // Close active dropdown if it's different from the current one
      if (this.activeDropdownId && this.activeDropdownId !== dropdownId) {
        const activeTimeline = this.dropdownTimelines.get(this.activeDropdownId);
        activeTimeline?.reverse();
        this.activeDropdownId = null;
      }

      // Toggle current dropdown
      if (timeline.progress() === 0 || timeline.reversed()) {
        timeline.play();
        this.activeDropdownId = dropdownId;
      } else {
        timeline.reverse();
        this.activeDropdownId = null;
      }
    },

    toggleMenu() {
      console.log('Toggle menu called');
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (!this.mobileMenuTimeline) {
        console.warn('Timeline not initialized');
        return;
      }

      if (this.isMobileMenuOpen) {
        // document.body.style.overflow = "hidden";
        this.mobileMenuTimeline.play();
      } else {
        document.body.style.overflow = '';
        this.mobileMenuTimeline.reverse();
      }
    },

    closeMenu() {
      if (!this.isMobileMenuOpen) return;

      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
      this.mobileMenuTimeline?.reverse();
    },

    async handleMenuItemClick(link: string, router: any, event?: Event) {
      event?.preventDefault();

      console.log('🎯 Handling menu item click:', link);
      const smoother = ScrollSmoother.get();

      if (link.startsWith('#')) {
        if (this.isMobileMenuOpen) {
          console.log('📱 Closing mobile menu before scroll');
          await this.closeMenu();
          await new Promise((resolve) => setTimeout(resolve, 400));
        }

        const target = document.querySelector(link);
        if (!target) {
          console.warn('🚫 Target element not found:', link);
          return;
        }

        console.log('🎯 Target element:', target);
        console.log('🔄 Starting scroll animation');

        if (smoother && this.gsapInstance) {
          console.log('Using ScrollSmoother for animation');

          try {
            const bounds = target.getBoundingClientRect();
            const scrollTop = smoother.scrollTop();
            const targetY = scrollTop + bounds.top - 100;

            console.log('📏 Calculated scroll position:', targetY);
            console.log('⏱️ Animation duration:', 2);

            this.gsapInstance.to(smoother, {
              scrollTop: targetY,
              duration: 2,
              ease: 'power3.inOut',
              overwrite: true,
              onStart: () => console.log('🎬 Animation starting'),
              onUpdate: () => console.log('⏱️ Progress:', smoother.scrollTop()),
              onComplete: () => console.log('✅ Animation complete'),
            });

            console.log('🎬 Scroll animation initiated');
          } catch (error) {
            console.error('Failed to scroll:', error);
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        } else {
          console.log('Using native smooth scroll');
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      } else if (link !== '#') {
        if (this.isMobileMenuOpen) {
          await this.closeMenu();
        }
        await navigateTo(link);
      }
    },

    cleanup() {
      console.log('🧹 Cleaning up store');
      if (this.mobileMenuTimeline) {
        this.mobileMenuTimeline.kill();
        this.mobileMenuTimeline = null;
      }
      this.dropdownTimelines.forEach((timeline) => timeline.kill());
      this.dropdownTimelines.clear();
      this.activeDropdownId = null;
      document.body.style.overflow = '';
    },
  },
});
