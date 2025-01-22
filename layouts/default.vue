<script setup>
import { useMenuStore } from "@/stores/menuStore";
import { useScrollHeader } from "~/composables/useScrollHeader";
const { $gsap, $ScrollTrigger, $ScrollSmoother, $MorphSVGPlugin } =
  useNuxtApp();
useHead({
  title: "Molki Design",
});

const wrapper = ref(null);
const content = ref(null);
let smoother = null;
const menuStore = useMenuStore();
const { initScrollHeader, cleanup } = useScrollHeader(".nav");

// Initialize ScrollSmoother
const initSmoother = async () => {
  if (!process.client) return;
  await nextTick();

  // Register ScrollTrigger first as ScrollSmoother depends on it
  $gsap.registerPlugin($ScrollTrigger);

  if ($ScrollSmoother) {
    smoother = $ScrollSmoother.create({
      wrapper: wrapper.value,
      content: content.value,
      smooth: 1, // Smoothness level (higher is smoother, default is 1)
      effects: true, // Enables ScrollTrigger-based effects
      normalizeScroll: true, // Normalizes scrolling behavior
      touchMultiplier: 2, // Adjusts the scroll speed on touch devices
      ignoreMobileResize: true, // Prevents resizing issues on iOS Safari
      preventDefault: true,
    });
  }
};

// Handle page transitions
const handlePageTransition = async () => {
  if (smoother) {
    smoother.kill();
  }
  await nextTick();
  initSmoother();
};

onMounted(() => {
  if (process.client) {
    $MorphSVGPlugin.convertToPath(
      "circle, rect, ellipse, line, polygon, polyline"
    );
    initScrollHeader();
    menuStore.initAnimation($gsap);
  }
  initSmoother();
  const loaderGroup = document.querySelector(".loader-group");
  if (loaderGroup) {
    loaderGroup.classList.add("loader-group--hidden");
    setTimeout(() => {
      loaderGroup.remove();
    }, 200);
  }
});

onUnmounted(() => {
  if (smoother) {
    smoother.kill();
  }
  if ($ScrollTrigger) {
    $ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
  cleanup();
  menuStore.cleanup();
});

// Watch for route changes
const route = useRoute();
watch(() => route.path, handlePageTransition);
</script>

<template>
  <div>
    <Loader />
    <div ref="wrapper" id="smooth-wrapper" class="min-h-screen">
      <div ref="content" id="smooth-content">
        <HeaderComponent />

        <div class="">
          <!-- Add padding to account for fixed header -->
          <NuxtPage />
          <div class="spacer w-full h-screen bg-red-400" data-speed="1.1"></div>
          <div
            class="spacer w-full h-screen bg-teal-400"
            data-speed="1.2"
          ></div>
          <div class="spacer w-full h-screen bg-red-400" data-speed="1.1"></div>
          <div
            class="spacer w-full h-screen bg-teal-400"
            data-speed="1.2"
          ></div>
          <div
            id="spacer1"
            class="spacer w-full h-screen bg-red-400"
            data-speed="1.1"
          ></div>
          <div
            class="spacer w-full h-screen bg-teal-400"
            data-speed="1.2"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
