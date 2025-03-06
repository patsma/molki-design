<script setup>
import { computed } from 'vue';

/**
 * BaseButton component - A reusable button that can render as a button, internal link, or external link
 *
 * Usage examples:
 * <BaseButton>Default Button</BaseButton>
 * <BaseButton to="/contact">Internal Link</BaseButton>
 * <BaseButton href="https://example.com">External Link</BaseButton>
 * <BaseButton @click="handleClick">Click Handler</BaseButton>
 * <BaseButton full-width variant="secondary">Full Width Secondary Button</BaseButton>
 */

const props = defineProps({
  // Link props
  to: {
    type: String,
    default: '',
    description: 'Route path for internal links (uses NuxtLink)',
  },
  href: {
    type: String,
    default: '',
    description: 'URL for external links',
  },
  target: {
    type: String,
    default: '_blank',
    description: 'Target attribute for external links (default: _blank)',
  },
  rel: {
    type: String,
    default: 'noopener noreferrer',
    description: 'Rel attribute for external links (default: noopener noreferrer)',
  },

  // Button styling props
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text', 'outline'].includes(value),
    description: 'Button style variant',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
    description: 'Button size',
  },
  fullWidth: {
    type: Boolean,
    default: false,
    description: 'Whether the button should take full width',
  },
  uppercase: {
    type: Boolean,
    default: true,
    description: 'Whether text should be uppercase',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: 'Whether the button is disabled',
  },
});

// Custom events
const emit = defineEmits(['click']);

// Determine component type based on props
const is = computed(() => {
  if (props.to) return 'NuxtLink';
  if (props.href) return 'a';
  return 'button';
});

// Computed properties for attributes
const attributes = computed(() => {
  const attrs = {};

  if (is.value === 'a') {
    attrs.href = props.href;
    attrs.target = props.target;
    attrs.rel = props.rel;
  }

  if (is.value === 'NuxtLink') {
    attrs.to = props.to;
  }

  if (is.value === 'button') {
    attrs.type = 'button';
    attrs.disabled = props.disabled;
  }

  return attrs;
});

// Event handlers
const onClick = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click', event);
};

// Class computation
const buttonClasses = computed(() => {
  const classes = [
    // Base styles
    'rounded-md',
    'font-medium',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary',
    'focus:ring-offset-2',

    // Size variants
    {
      'px-3 py-1 text-xs': props.size === 'sm',
      'px-4 py-2 text-sm': props.size === 'md',
      'px-6 py-3 text-base': props.size === 'lg',
    },

    // Width
    { 'w-full': props.fullWidth },

    // Text transform
    { uppercase: props.uppercase },

    // Disabled state
    { 'opacity-60 cursor-not-allowed': props.disabled },

    // Variants
    {
      // Primary
      'cursor-pointer bg-primary text-neutral-100 hover:bg-primary-dark':
        props.variant === 'primary' && !props.disabled,

      // Secondary
      'cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300':
        props.variant === 'secondary' && !props.disabled,

      // Text
      'cursor-pointer bg-transparent text-primary hover:text-primary-dark':
        props.variant === 'text' && !props.disabled,

      // Outline
      'cursor-pointer bg-transparent text-primary border border-primary hover:bg-primary hover:text-neutral-100':
        props.variant === 'outline' && !props.disabled,
    },
  ];

  return classes;
});
</script>

<template>
  <component :is="is" :class="buttonClasses" v-bind="attributes" @click="onClick">
    <slot></slot>
  </component>
</template>
