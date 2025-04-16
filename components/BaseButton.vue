<script setup>
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
  // NuxtLink props
  to: {
    type: [String, Object],
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  rel: {
    type: String,
    default: '',
  },
  noRel: {
    type: Boolean,
    default: false,
  },
  activeClass: {
    type: String,
    default: undefined,
  },
  exactActiveClass: {
    type: String,
    default: undefined,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  ariaCurrentValue: {
    type: String,
    default: undefined,
  },
  external: {
    type: Boolean,
    default: false,
  },
  prefetch: {
    type: Boolean,
    default: undefined,
  },
  noPrefetch: {
    type: Boolean,
    default: false,
  },
  prefetchedClass: {
    type: String,
    default: undefined,
  },

  // Button styling props
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text', 'outline'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  uppercase: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Custom events
const emit = defineEmits(['click']);

// Handle click events
const handleClick = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};

// Classes based on props
const btnClasses = [
  // Base styles
  'rounded-md font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',

  // Size variants
  props.size === 'sm'
    ? 'px-3 py-1 text-xs'
    : props.size === 'lg'
      ? 'px-6 py-3 text-base'
      : 'px-4 py-2 text-sm',

  // Width
  props.fullWidth ? 'w-full grid text-center' : '',

  // Text transform
  props.uppercase ? 'uppercase' : '',

  // Disabled state
  props.disabled ? 'opacity-60 cursor-not-allowed' : '',

  // Variants
  !props.disabled &&
    (props.variant === 'primary'
      ? 'cursor-pointer bg-primary text-neutral-100 hover:bg-primary-dark'
      : props.variant === 'secondary'
        ? 'cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300'
        : props.variant === 'text'
          ? 'cursor-pointer bg-transparent text-primary hover:text-primary-dark'
          : 'cursor-pointer bg-transparent text-primary border border-primary hover:bg-primary hover:text-neutral-100'),
];

// NuxtLink props that should be passed
const nuxtLinkProps = {
  to: props.to,
  activeClass: props.activeClass,
  exactActiveClass: props.exactActiveClass,
  replace: props.replace,
  ariaCurrentValue: props.ariaCurrentValue,
  external: props.external,
  prefetch: props.prefetch,
  noPrefetch: props.noPrefetch,
  prefetchedClass: props.prefetchedClass,
  rel: props.rel,
  noRel: props.noRel,
  target: props.target,
};

// External link props
const externalLinkProps = {
  href: props.href,
  target: props.target || '_blank',
  rel: props.rel || (props.noRel ? undefined : 'noopener noreferrer'),
};
</script>

<template>
  <!-- Render as NuxtLink for internal routes -->
  <NuxtLink v-if="to" v-bind="nuxtLinkProps" :class="btnClasses" @click="handleClick">
    <slot></slot>
  </NuxtLink>

  <!-- Render as anchor for external links -->
  <a v-else-if="href" v-bind="externalLinkProps" :class="btnClasses" @click="handleClick">
    <slot></slot>
  </a>

  <!-- Render as button by default -->
  <button v-else type="button" :disabled="disabled" :class="btnClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>
