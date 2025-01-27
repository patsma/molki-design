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
  }),

  actions: {
    initAnimation($gsap: typeof gsap) {
      this.gsapInstance = $gsap;
      console.log('Initializing menu animation');
      if (!process.client) return;

      const menu = document.querySelector('.mobile-menu');
      const menuItems = document.querySelectorAll('.mobile-menu .nav-menu__item');

      // Initial state
      $gsap.set(menu, {
        display: 'none',
        xPercent: 0,
        opacity: 0,
      });

      $gsap.set(menuItems, {
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
          menuItems,
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
      console.log('🔍 Smoother instance:', smoother);

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
      } else {
        if (this.isMobileMenuOpen) {
          await this.closeMenu();
        }
        await navigateTo(link);
      }
    },

    cleanup() {
      if (this.mobileMenuTimeline) {
        this.mobileMenuTimeline.kill();
        this.mobileMenuTimeline = null;
      }
      document.body.style.overflow = '';
    },
  },
});
