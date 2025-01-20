<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const { $gsap } = useNuxtApp();
useHead({
  title: "Morten Portfolio",
});

const wrapper = ref(null);
const content = ref(null);
let smoother = null;

// Initialize ScrollSmoother
const initSmoother = async () => {
  if (!process.client) return;

  await nextTick();

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  smoother = ScrollSmoother.create({
    wrapper: wrapper.value,
    content: content.value,
    smooth: 1,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
  });
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
  initSmoother();
  const loaderGroup = document.querySelector(".loader-group");
  loaderGroup.classList.add("loader-group--hidden");
  setTimeout(() => {
    loaderGroup.remove();
  }, 200);
});

onUnmounted(() => {
  if (smoother) {
    smoother.kill();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

// Watch for route changes
const route = useRoute();
watch(() => route.path, handlePageTransition);
</script>

<template>
  <div class="content-grid">
    <HeaderComponent />
    <Loader />
    <div ref="wrapper" id="smooth-wrapper" class="min-h-screen">
      <div ref="content" id="smooth-content">
        <NuxtPage />
        <div class="spacer w-full h-screen bg-red-400"></div>
        <div class="spacer w-full h-screen bg-teal-400"></div>
      </div>
    </div>
  </div>
</template>
