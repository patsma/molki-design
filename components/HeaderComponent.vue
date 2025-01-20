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
import Logo from "~/components/Logo.vue";

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
  <header class="content-grid">
    <nav class="full-width grid nav fixed z-40 py-4 w-full bg-white">
      <div
        class="nav__wrapper content-grid grid grid-flow-col items-center justify-between"
      >
        <div class="breakout1 justify-between grid grid-flow-col">
          <!-- Logo -->
          <div class="nav__logo w-32">
            <NuxtLink to="/" class="inline-block" aria-label="Molki - Home">
              <Logo />
            </NuxtLink>
          </div>
          <!-- Main Menu -->
          <MainMenu />
          <!-- Theme Toggle -->
          <div class="grid justify-end">
            <button
              class="rounded-md uppercase bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Umów konsultację
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
