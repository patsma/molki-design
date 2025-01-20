<template>
  <Hero>
    <template #heroText>
      <span class="text-dark-40"> Molki Design </span>
    </template>
    <template #content> </template>
  </Hero>
  <div class="spacer w-full h-screen bg-red-400"></div>
  <div class="spacer w-full h-screen bg-teal-400"></div>
</template>
<script setup lang="ts">
import Hero from "~/components/Hero.vue";
</script>
