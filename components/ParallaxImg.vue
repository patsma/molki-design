<template>
  <div class="parallax-wrapper overflow-hidden" data-speed="auto">
    <NuxtImg v-bind="$attrs" class="parallax-content w-full h-full object-cover" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>
