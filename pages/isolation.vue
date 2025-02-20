<template>
  <div>
    <FullViewportSlider cta-text="UMÓW KONSULTACJĘ" cta-link="/contact">
      <template #slides-0>
        <parallax-img class="w-full h-full object-cover">
          <nuxt-img src="/heroHome.jpg" alt="Slide 1" format="webp" loading="eager" />
        </parallax-img>
      </template>
      <template #slides-1>
        <parallax-img class="w-full h-full object-cover">
          <nuxt-img src="/heroAbout.jpg" alt="Slide 2" format="webp" loading="eager" />
        </parallax-img>
      </template>
    </FullViewportSlider>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
