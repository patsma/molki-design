<template>
  <div class="parallax-wrapper" data-speed="auto">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :format="format"
      :quality="quality"
      :loading="loading"
      class="parallax-content h-[150%]"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: [String, Number],
    height: [String, Number],
    format: String,
    quality: [String, Number],
    loading: String,
  },
};
</script>
<style lang="scss">
.parallax-wrapper {
  height: 120%;
}
</style>
