import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default defineNuxtPlugin((nuxtApp) => {
  // Listen for the custom hook emitted after polaroid initialization
  nuxtApp.hook("polaroid:initialized", () => {
    animationsOnScroll();
  });

  function animationsOnScroll() {
    gsap.registerEffect({
      name: "fadeIn",
      effect: (targets, config) => {
        return gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: config.duration || 0.5,
            ease: "power2.out",
            stagger: config.stagger || 0,
          },
        );
      },
      defaults: { duration: 0.5, stagger: 0 },
      extendTimeline: true,
    });

    gsap.registerEffect({
      name: "fadeUp",
      effect: (targets, config) => {
        return gsap.fromTo(
          targets,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration || 0.5,
            ease: "power2.out",
            stagger: config.stagger || 0,
          },
        );
      },
      defaults: { duration: 0.5, stagger: 0 },
      extendTimeline: true,
    });

    gsap.registerEffect({
      name: "splitText",
      effect: (targets, config) => {
        const targetElement = targets instanceof Element ? targets : targets[0];
        if (!targetElement) {
          console.error("No target element found for splitText effect.");
          return;
        }

        const split = new SplitText(targetElement, { type: "chars" });
        const tl = gsap.timeline({
          onComplete: () => {
            // split.revert(true); // Optional: Revert styles but keep spans
          },
        });

        const durationPerChar = config.duration || 1;
        const staggerPerChar = config.stagger || 0.05;
        const totalChars = split.chars.length;
        const totalDuration =
          durationPerChar + staggerPerChar * (totalChars - 1);

        tl.from(
          split.chars,
          {
            opacity: 0,
            y: 20,
            duration: durationPerChar,
            ease: "power2.out",
            stagger: staggerPerChar,
          },
          0,
        );

        const uElement = targetElement.querySelector("u");
        if (uElement) {
          tl.fromTo(
            uElement,
            {
              "--underline-scale": 0,
              duration: totalDuration,
              ease: "sine.Out",
            },
            {
              "--underline-scale": 1,
              duration: totalDuration,
              ease: "sine.Out",
            },
            0.1,
          );
        }

        return tl;
      },
      defaults: { duration: 1, stagger: 0.05, underlineDuration: 0.5 },
      extendTimeline: true,
    });

    // The rest of your animationsOnScroll function
    const DEFAULT_SCROLL_START = "top 80%";
    const DEFAULT_SCROLL_END = "bottom 20%";
    const DEFAULT_TOGGLE_ACTIONS = "play none none none";

    const GLOBAL_OVERLAP = "-=0.5";

    const sections = document.querySelectorAll("[data-scroll-section]");

    sections.forEach((section) => {
      const sectionStart =
        section.getAttribute("data-scroll-start") || DEFAULT_SCROLL_START;
      const sectionEnd =
        section.getAttribute("data-scroll-end") || DEFAULT_SCROLL_END;
      const sectionToggleActions =
        section.getAttribute("data-scroll-toggle") || DEFAULT_TOGGLE_ACTIONS;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: sectionStart,
          end: sectionEnd,
          toggleActions: sectionToggleActions,
        },
      });

      const items = section.querySelectorAll(
        "[data-scroll-item], [data-scroll-stagger-group]",
      );
      const orderedItems = Array.from(items).sort((a, b) => {
        const orderA = parseInt(a.getAttribute("data-scroll-order") || "0");
        const orderB = parseInt(b.getAttribute("data-scroll-order") || "0");
        return orderA - orderB;
      });

      orderedItems.forEach((item, index) => {
        const isStaggerGroup = item.hasAttribute("data-scroll-stagger-group");
        const isIndependent =
          item.getAttribute("data-scroll-independent") === "true";

        const animationType =
          item.getAttribute("data-scroll-animation") || "fadeUp";
        const duration =
          parseFloat(item.getAttribute("data-scroll-duration")) || 0.5;
        const stagger =
          parseFloat(item.getAttribute("data-scroll-stagger")) || 0.1;
        const delay = parseFloat(item.getAttribute("data-scroll-delay")) || 0;
        const positionAttr = item.getAttribute("data-scroll-position");

        let timelinePosition;

        if (isIndependent) {
          const itemStart =
            item.getAttribute("data-scroll-start") || DEFAULT_SCROLL_START;
          const itemEnd =
            item.getAttribute("data-scroll-end") || DEFAULT_SCROLL_END;
          const itemToggleActions =
            item.getAttribute("data-scroll-toggle") || DEFAULT_TOGGLE_ACTIONS;

          const independentTL = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: itemStart,
              end: itemEnd,
              toggleActions: itemToggleActions,
            },
          });

          const animation = gsap.effects[animationType](item, {
            duration,
            stagger,
          });

          if (delay) {
            independentTL.add(animation, delay);
          } else {
            independentTL.add(animation);
          }
        } else {
          if (positionAttr !== null) {
            timelinePosition = positionAttr;
          } else {
            timelinePosition = index === 0 ? 0 : GLOBAL_OVERLAP;
          }

          let animation;

          if (isStaggerGroup) {
            const groupItems = Array.from(item.children);

            animation = gsap.timeline();

            animation.add(
              gsap.effects[animationType](groupItems, {
                duration,
                stagger,
              }),
            );

            groupItems.forEach((groupItem) => {
              if (groupItem.hasAttribute("data-scroll-stagger-children")) {
                const childElements = Array.from(groupItem.children);
                const childAnimation = gsap.effects[animationType](
                  childElements,
                  {
                    duration,
                    stagger,
                  },
                );
                animation.add(childAnimation, 0);
              }
            });
          } else {
            animation = gsap.effects[animationType](item, {
              duration,
              stagger,
            });
          }

          if (delay) {
            tl.add(animation, `+=${delay}`);
          } else {
            tl.add(animation, timelinePosition);
          }
        }
      });
    });
  }
});
