<script setup lang="ts">
defineProps<{
  isActive?: boolean;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  emit('click', event);
};
</script>

<template>
  <span class="dropdown-arrow" :class="{ 'is-active': isActive }" @click="handleClick">
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L9 9L17 1"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.dropdown-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  will-change: transform;
  margin-left: 0.5rem;
  color: #b76246; // Using the primary color from your gradient

  svg {
    width: 18px;
    height: 10px;
    display: inline-block;
  }
}
</style>
