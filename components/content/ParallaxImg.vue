<template>
  <div class="parallax-wrapper" data-speed="auto">
    <slot mdc-unwrap="p">
      <!-- This will be replaced by the editor's image -->
    </slot>
  </div>
</template>

<script setup></script>

<style lang="scss">
.parallax-wrapper {
  height: 120%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
