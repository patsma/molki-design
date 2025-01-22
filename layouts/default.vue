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

// Handle page transitions
const handlePageTransition = async () => {
  console.log("🔄 Layout: Starting page transition");
  cleanup();
  await nextTick();
  initScrollHeader();
};

const initSmoother = async () => {
  if (!process.client) return;

  // Register plugins first
  $gsap.registerPlugin($ScrollTrigger, $ScrollSmoother);

  console.log("🎯 Layout: Initial ScrollSmoother setup");
  smoother = $ScrollSmoother.create({
    wrapper: wrapper.value,
    content: content.value,
    smooth: 1,
    effects: true,
    normalizeScroll: true,
    touchMultiplier: 2,
    ignoreMobileResize: true,
  });
};

onMounted(() => {
  if (process.client) {
    $MorphSVGPlugin.convertToPath(
      "circle, rect, ellipse, line, polygon, polyline"
    );
    initScrollHeader();
    menuStore.initAnimation($gsap);
    initSmoother();
  }
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
    <GSAPScrollSmoother>
      <HeaderComponent />
      <div class="">
        <NuxtPage />
      </div>
    </GSAPScrollSmoother>
  </div>
</template>
