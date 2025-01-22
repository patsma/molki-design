<template>
  <div ref="wrapper" id="smooth-wrapper" class="min-h-screen">
    <div ref="content" id="smooth-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Component now only handles markup structure
// All ScrollSmoother logic is handled by the plugin
</script>
