<script setup>
import { onMounted, ref } from "vue";
import { useAnimationStore } from "@/stores/animationStore";
import SplitText from "gsap/SplitText";
import { watch } from "vue";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// import useThemeSwitch from "~/composables/useThemeSwitch";
import useHeadroom from "~/composables/useHeadroom";
// import ThemeToggleSVG from "~/components/ThemeToggleSVG.vue";
import MainMenu from "~/components/MainMenu.vue";

const isClient = ref(false);

const { initHeadroom, destroyHeadroom } = useHeadroom(".nav");
const { $gsap } = useNuxtApp();

onMounted(() => {
  MorphSVGPlugin.convertToPath(
    "circle, rect, ellipse, line, polygon, polyline"
  );
  initHeadroom();
});

if (process.client) {
  isClient.value = true; // Set to true only on client-side
  $gsap.registerPlugin(SplitText, MorphSVGPlugin);
}
</script>

<template>
  <header>
    <nav class="nav fixed z-40 top-4 w-full grid grid-cols-12">
      <div
        class="nav__wrapper col-start-2 col-end-12 grid grid-flow-col items-center justify-between"
      >
        <!-- Logo -->
        <div class="nav__logo">
          <NuxtLink
            to="/"
            class="text-xs leading-[100%] tracking-[-0.03125rem]"
          >
            Molki
          </NuxtLink>
        </div>

        <!-- Main Menu -->
        <MainMenu />

        <!-- Theme Toggle -->
        <div class="flex items-center gap-4">
          <button
            class="rounded-md uppercase bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Umów konsultację
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
