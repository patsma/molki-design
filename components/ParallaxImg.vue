<template>
  <div class="parallax-wrapper h-full" data-speed="auto">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :format="format"
      :quality="quality"
      :loading="loading"
      class="parallax-content"
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
