<template>
  <div ref="wrapper" id="smooth-wrapper" class="min-h-screen">
    <div ref="content" id="smooth-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const wrapper = ref(null);
const content = ref(null);
</script>
