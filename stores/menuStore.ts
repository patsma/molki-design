import { defineStore } from "pinia";

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
    },

    toggleMenu() {
      console.log("Toggle menu");
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (this.isMobileMenuOpen) {
        this.mobileMenuTimeline?.play();
      } else {
        this.mobileMenuTimeline?.reverse();
      }
    },
  },
});
