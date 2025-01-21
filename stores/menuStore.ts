import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    isMobileMenuOpen: false,
    isAnimationInitialized: false,
    mobileMenuTimeline: null as gsap.core.Timeline | null,
  }),

  actions: {
    initAnimation($gsap: any) {
      if (!process.client || this.isAnimationInitialized) return;

      const menu = document.querySelector(".mobile-menu");
      const menuItems = document.querySelectorAll(
        ".mobile-menu .nav-menu__item"
      );

      // Set initial states
      $gsap.set(menu, {
        xPercent: 100,
        autoAlpha: 0,
      });

      $gsap.set(menuItems, {
        x: 50,
        autoAlpha: 0,
      });

      this.mobileMenuTimeline = $gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.inOut",
          duration: 0.6,
        },
      });

      this.mobileMenuTimeline
        .to(menu, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          menuItems,
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );

      this.isAnimationInitialized = true;
    },

    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (this.isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
        this.mobileMenuTimeline?.play();
      } else {
        document.body.style.overflow = "";
        this.mobileMenuTimeline?.reverse();
      }
    },

    cleanup() {
      if (this.mobileMenuTimeline) {
        this.mobileMenuTimeline.kill();
        this.mobileMenuTimeline = null;
      }
      this.isAnimationInitialized = false;
    },
  },
});
