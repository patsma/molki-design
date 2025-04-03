<script setup lang="ts">
// Props to control the animation
const props = defineProps<{
  duration?: number;
}>();

const numberEl = ref<HTMLElement | null>(null);
const initialValue = ref<string>(''); // Store initial value

// Function to extract number and suffix from content
const parseContent = (content: string) => {
  const match = content.match(/^(\d+)([^0-9]*)$/);
  if (!match) return null;

  return {
    number: parseInt(match[1]),
    suffix: match[2], // This will capture '+', '%', ' lat', etc.
  };
};

onMounted(() => {
  if (!numberEl.value) return;

  // Store the initial content before any manipulation
  initialValue.value = numberEl.value.textContent || '0';

  const parsed = parseContent(initialValue.value);
  if (!parsed) {
    console.warn('Invalid number format in Achievement component');
    return;
  }

  const { number, suffix } = parsed;

  // Set initial state immediately to prevent flash
  numberEl.value.textContent = '0' + suffix;

  // Create GSAP animation using our scroll trigger system
  const { $gsap } = useNuxtApp();

  $gsap.set(numberEl.value, {
    immediateRender: true,
    modifiers: {
      textContent: () => '0' + suffix, // Ensure clean initial state
    },
  });

  $gsap.to(numberEl.value, {
    scrollTrigger: {
      trigger: numberEl.value,
      start: 'top 80%',
      toggleActions: 'play play play reverse', // Animate on scroll down AND up
    },
    textContent: number,
    duration: props.duration || 1.5,
    ease: 'power1.out',
    snap: { textContent: 1 }, // Snap to integer values
    modifiers: {
      textContent: (value: number) => {
        // Ensure we always return a valid string
        const roundedValue = Math.round(value);
        return !isNaN(roundedValue) ? roundedValue + suffix : initialValue.value;
      },
    },
  });
});
</script>

<template>
  <div class="relative p-4 md:p-8 text-center">
    <h3
      v-if="$slots.title"
      class="font-semibold text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2"
      ref="numberEl"
    >
      <slot name="title" mdc-unwrap="p" />
    </h3>
    <div class="w-6 sm:w-8 h-0.5 bg-primary mx-auto mb-2"></div>
    <p v-if="$slots.subtitle" class="text-sm sm:text-base md:text-lg lg:text-xl">
      <slot name="subtitle" mdc-unwrap="p" />
    </p>
  </div>
</template>
