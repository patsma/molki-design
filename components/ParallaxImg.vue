<template>
  <div ref="container" class="parallax-wrapper" :style="{ '--parallax-speed': speed }">
    <div ref="content" class="parallax-content">
      <slot mdc-unwrap="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    speed?: number;
  }>(),
  {
    speed: 0.15, // Default parallax speed (15% of scroll)
  }
);

const container = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let rafId: number | null = null;

// Handle parallax effect
const handleParallax = () => {
  if (!container.value || !content.value) return;

  const rect = container.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementTop = rect.top;
  const elementHeight = rect.height;

  // Calculate how far the element is from the center of the viewport
  const centerOffset = elementTop + elementHeight / 2 - viewportHeight / 2;

  // Calculate the parallax offset based on the center offset
  const parallaxOffset = centerOffset * props.speed;

  // Apply the transform with will-change optimization
  content.value.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
};

// Intersection Observer callback
const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Start animation loop when element is visible
      const animate = () => {
        handleParallax();
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
    } else {
      // Stop animation loop when element is not visible
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  });
};

onMounted(() => {
  if (!container.value) return;

  // Initialize Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0,
    rootMargin: '10%', // Start observing before element comes into view
  });

  observer.observe(container.value);
});

onUnmounted(() => {
  // Cleanup
  if (observer) {
    observer.disconnect();
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<style lang="scss">
.parallax-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .parallax-content {
    position: absolute;
    top: -10%; // Add extra space for parallax movement
    left: 0;
    width: 100%;
    height: 140%; // Add extra height to prevent gaps
    will-change: transform; // Optimize for animations

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
