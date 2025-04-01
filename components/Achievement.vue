<script setup lang="ts">
// Props to control the animation
const props = defineProps<{
  duration?: number;
}>();

const numberEl = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);

// Function to animate number
const animateNumber = (el: HTMLElement) => {
  if (!el || hasAnimated.value) return;

  const content = el.textContent || '';
  const match = content.match(/^(\d+)([^0-9]*)$/);

  if (!match) return;

  const endNumber = parseInt(match[1]);
  const suffix = match[2]; // This will capture '+', '%', ' lat', etc.

  if (isNaN(endNumber)) return;

  hasAnimated.value = true;
  let startNumber = 0;

  const increment = endNumber / 50; // We'll do 50 steps
  const stepDuration = (props.duration || 1.5) / 50;

  const updateNumber = () => {
    startNumber = Math.min(startNumber + increment, endNumber);
    el.textContent = Math.round(startNumber) + suffix;

    if (startNumber < endNumber) {
      requestAnimationFrame(() => setTimeout(updateNumber, stepDuration * 1000));
    }
  };

  updateNumber();
};

// Watch for intersection
onMounted(() => {
  if (!numberEl.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(numberEl.value!);
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(numberEl.value);
});
</script>

<template>
  <div class="relative p-4 md:p-8 text-center">
    <h3 v-if="$slots.title" class="h2-style font-bold text-primary mb-2" ref="numberEl">
      <slot name="title" mdc-unwrap="p" />
    </h3>
    <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
    <p v-if="$slots.subtitle" class="text-xl">
      <slot name="subtitle" mdc-unwrap="p" />
    </p>
  </div>
</template>
