<template>
  <div class="content-grid pt-20">
    <h1 class="text-4xl font-bold my-8">Button Examples</h1>
    <ButtonExamples />
    <div class="grid h-[55vh] w-full overflow-hidden">
      <ParallaxImg
        src="/placeholder.jpg"
        alt="Full width parallax"
        class="h-full w-full"
        format="webp"
      />
    </div>
    <Hero />
    <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>

    <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
    <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
    <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
    <div id="spacer1" class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
    <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
  </div>
</template>

<script setup>
import ButtonExamples from '~/components/ButtonExamples.vue';
</script>
