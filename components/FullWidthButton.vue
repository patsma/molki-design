<script setup lang="ts">
/**
 * FullWidthButton component
 *
 * A button that spans the full width of its container with a decorative line
 * and centered text. Used for prominent call-to-action elements.
 */

// Define props with default values
const props = withDefaults(
  defineProps<{
    /**
     * The link destination for the button
     * @default "/"
     */
    to: string;

    /**
     * The background color of the button and line
     * @default "primary"
     */
    color?: 'primary' | 'secondary' | 'neutral' | 'neutral-400' | 'transparent-white';

    /**
     * Whether to animate the button with scroll effects
     * @default true
     */
    animate?: boolean;

    /**
     * Background color for the entire section
     * @default ""
     */
    background?: 'primary' | 'secondary' | 'neutral' | 'neutral-400' | 'neutral-100' | 'white' | '';

    /**
     * Additional padding for the section
     * @default "py-16"
     */
    padding?: string;
  }>(),
  {
    to: '/',
    color: 'primary',
    animate: true,
    background: '',
    padding: 'py-16',
  }
);

// Map color prop to BaseButton variant
const buttonVariant = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'primary';
    case 'secondary':
      return 'secondary';
    case 'neutral':
    case 'neutral-400':
      return 'primary'; // Using primary as fallback for neutral tones
    case 'transparent-white':
      return 'outline';
    default:
      return 'primary';
  }
});
</script>

<template>
  <div
    :class="[
      padding,
      {
        'bg-primary': background === 'primary',
        'bg-secondary': background === 'secondary',
        'bg-neutral-800': background === 'neutral',
        'bg-neutral-400': background === 'neutral-400',
        'bg-neutral-100': background === 'neutral-100',
        'bg-white': background === 'white',
      },
    ]"
  >
    <div class="grid">
      <div class="relative w-full h-full grid place-items-center">
        <!-- Decorator Line -->
        <div
          v-scroll-anim:scaleX="{ delay: 0.5, start: 'top 95%' }"
          class="absolute w-screen h-[0.15rem]"
          :class="{
            'bg-primary': color === 'primary',
            'bg-secondary': color === 'secondary',
            'bg-neutral-800': color === 'neutral',
            'bg-neutral-400': color === 'neutral-400',
            'bg-white bg-opacity-70': color === 'transparent-white',
          }"
        ></div>

        <!-- Button -->
        <BaseButton
          :to="to"
          :variant="buttonVariant"
          size="lg"
          class="relative tracking-widest font-spartan font-bold"
          :class="{
            'text-neutral-100': ['primary', 'secondary', 'neutral', 'neutral-400'].includes(color),
            'text-neutral-800': color === 'transparent-white',
          }"
        >
          <slot mdc-unwrap="p" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
