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
          v-scroll-anim:scaleX="{ delay: 2, start: 'top 95%' }"
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
        <NuxtLink
          :to="to"
          class="relative rounded-md cursor-pointer px-8 py-5 tracking-widest text-base font-spartan font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          :class="{
            'bg-primary hover:bg-primary-dark focus:ring-primary text-neutral-100':
              color === 'primary',
            'bg-secondary hover:bg-secondary-dark focus:ring-secondary text-neutral-100':
              color === 'secondary',
            'bg-neutral-800 hover:bg-neutral-900 focus:ring-neutral-800 text-neutral-100':
              color === 'neutral',
            'bg-neutral-400 hover:bg-neutral-500 focus:ring-neutral-400 text-neutral-100':
              color === 'neutral-400',
            'bg-white bg-opacity-70 hover:bg-opacity-100 focus:ring-white text-neutral-800':
              color === 'transparent-white',
          }"
        >
          <slot mdc-unwrap="p" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
