<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();
useHead({
  title: "Molki Design",
});

const wrapper = ref(null);
const content = ref(null);
let smoother = null;

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
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
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
});

// Watch for route changes
const route = useRoute();
watch(() => route.path, handlePageTransition);
</script>

<template>
  <div>
    <HeaderComponent />
    <Loader />
    <div ref="wrapper" id="smooth-wrapper" class="min-h-screen">
      <div ref="content" id="smooth-content">
        <div class="pt-20">
          <!-- Add padding to account for fixed header -->
          <NuxtPage />
          <div class="spacer w-full h-screen bg-red-400"></div>
          <div id="spacer1" class="spacer w-full h-screen bg-teal-400"></div>
        </div>
      </div>
    </div>
  </div>
</template>
