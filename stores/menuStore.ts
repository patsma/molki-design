import { defineStore } from "pinia";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    isMobileMenuOpen: false,
    mobileMenuTimeline: null as gsap.core.Timeline | null,
  }),

  actions: {
    initAnimation($gsap: any) {
      console.log("Initializing menu animation");
      if (!process.client) return;

      const menu = document.querySelector(".mobile-menu");
      const menuItems = document.querySelectorAll(
        ".mobile-menu .nav-menu__item"
      );

      // Initial state
      $gsap.set(menu, {
        display: "none",
        xPercent: 100,
        opacity: 0,
      });

      $gsap.set(menuItems, {
        opacity: 0,
        x: 50,
      });

      this.mobileMenuTimeline = $gsap
        .timeline({ paused: true })
        .to(menu, {
          display: "block",
          xPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          menuItems,
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.3,
          },
          "-=0.2"
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
      console.log("Toggle menu called");
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (!this.mobileMenuTimeline) {
        console.warn("Timeline not initialized");
        return;
      }

      if (this.isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
        this.mobileMenuTimeline.play();
      } else {
        document.body.style.overflow = "";
        this.mobileMenuTimeline.reverse();
      }
    },

    closeMenu() {
      if (!this.isMobileMenuOpen) return;

      this.isMobileMenuOpen = false;
      document.body.style.overflow = "";
      this.mobileMenuTimeline?.reverse();
    },

    async handleMenuItemClick(link: string, router: any) {
      const smoother = ScrollSmoother.get();

      if (link.startsWith("#")) {
        if (this.isMobileMenuOpen) {
          await this.closeMenu();
          await new Promise((resolve) => setTimeout(resolve, 400));
        }

        if (smoother) {
          smoother.scrollTo(link, {
            duration: 1,
            ease: "power2.inOut",
            offset: -100,
          });
        }
      } else {
        if (this.isMobileMenuOpen) {
          await this.closeMenu();
        }
        await router.push(link);
      }
    },

    cleanup() {
      if (this.mobileMenuTimeline) {
        this.mobileMenuTimeline.kill();
        this.mobileMenuTimeline = null;
      }
      document.body.style.overflow = "";
    },
  },
});
