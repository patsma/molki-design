import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

// Create a shared state outside the composable
const sharedState = {
  activeSection: ref<string | null>(null),
};

export const useScrollHeader = () => {
  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);

  let headerTrigger: ScrollTrigger | null = null;
  let headerAnimation: gsap.core.Timeline | null = null;
  let lastCheck = 0;

  const initScrollHeader = () => {
    console.log('🚀 Initializing ScrollHeader');
    if (!process.client || !headerRef.value) return;

    const header = headerRef.value;

    // Ensure header has correct height before pinning
    gsap.set(header, {
      height: headerHeight.value,
      clearProps: 'all', // Clear all other properties
    });

    // Pin the header
    headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        // Ensure header maintains correct height during refresh
        gsap.set(header, { height: headerHeight.value });
      },
    });

    // Create hide/show animation
    headerAnimation = gsap
      .timeline({ paused: true })
      .fromTo(header, { yPercent: 0 }, { yPercent: -100, duration: 0.3, ease: 'power3.inOut' });

    // Create scroll listener
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const now = Date.now();
        if (now - lastCheck < 400) return;
        lastCheck = now;

        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        const scrollTop = smoother.scrollTop();
        const direction = self.direction;

        if (direction > 0 && scrollTop > headerHeight.value) {
          gsap.to(header, { yPercent: -100, duration: 0.3 });
        } else if (direction < 0) {
          gsap.to(header, { yPercent: 0, duration: 0.3 });
        }
      },
    });

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      if (!section.id) return;

      ScrollTrigger.create({
        markers: true,
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          sharedState.activeSection.value = section.id;
          console.log(`➡️ Entered section: ${section.id}`);
          console.log('🔥 Active section is now:', sharedState.activeSection.value);
        },
        onEnterBack: () => {
          sharedState.activeSection.value = section.id;
          console.log(`⬅️ Entered back section: ${section.id}`);
          console.log('🔥 Active section is now:', sharedState.activeSection.value);
        },
        onLeave: () => {
          if (sharedState.activeSection.value === section.id) {
            sharedState.activeSection.value = null;
            console.log(`⬇️ Left section: ${section.id}`);
            console.log('🔥 Active section cleared');
          }
        },
        onLeaveBack: () => {
          if (sharedState.activeSection.value === section.id) {
            sharedState.activeSection.value = null;
            console.log(`⬆️ Left back section: ${section.id}`);
            console.log('🔥 Active section cleared');
          }
        },
      });
    });
  };

  const cleanup = () => {
    if (headerTrigger) {
      headerTrigger.kill();
      headerTrigger = null;
    }
    if (headerAnimation) {
      headerAnimation.kill();
      headerAnimation = null;
    }
  };

  return {
    headerRef,
    headerHeight,
    activeSection: sharedState.activeSection,
    initScrollHeader,
    cleanup,
  };
};
