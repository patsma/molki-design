<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useAnimationStore } from "@/stores/animationStore";
import SplitText from "gsap/SplitText";
import { watch } from "vue";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import useThemeSwitch from "~/composables/useThemeSwitch";
import useHeadroom from "~/composables/useHeadroom";
import ThemeToggleSVG from "~/components/ThemeToggleSVG.vue";

const isClient = ref(false);

const { initHeadroom, destroyHeadroom } = useHeadroom(".nav");
const { $gsap } = useNuxtApp();

onMounted(() => {
  MorphSVGPlugin.convertToPath(
    "circle, rect, ellipse, line, polygon, polyline"
  );
  const { initThemeSwitch } = useThemeSwitch();
  initHeadroom();
  initThemeSwitch();
});

if (process.client) {
  isClient.value = true; // Set to true only on client-side
  $gsap.registerPlugin(SplitText, MorphSVGPlugin);
}
</script>

<template>
  <header>
    <nav
      class="nav fixed z-100 top-4 z-40 col-start-1 col-end-13 grid h-16 w-full grid-cols-12"
    >
      <div
        class="nav__wrapper col-start-2 col-end-12 grid grid-flow-col items-center justify-between"
      >
        <div class="nav__logo">
          <div class="ibmplex-400 grid gap-1">
            <NuxtLink
              to="/"
              class="text-dark-100 text-xs leading-[100%] tracking-[-0.03125rem]"
              >Molki</NuxtLink
            >
          </div>
        </div>
        <ul
          class="nav__list peiko-500 hidden grid-flow-col gap-8 text-base leading-[100%] md:grid"
        >
          <li class="nav__item grid" id="themeSwitch">
            <button>
              <ThemeToggleSVG class="w-12"></ThemeToggleSVG>
            </button>
          </li>
          <li class="nav__item">
            <NuxtLink to="/buttons" class="nav__link">Buttons</NuxtLink>
          </li>
        </ul>
        <div>
          <button
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
