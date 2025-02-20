<template>
  <div>
    <!-- Example using images prop -->
    <FullViewportSlider
      :images="['/heroHome.jpg', '/heroAbout.jpg']"
      cta-text="UMÓW KONSULTACJĘ"
      cta-link="/buttons"
    />

    <!-- Example using slots (commented out) -->
    <!--
    <FullViewportSlider cta-text="UMÓW KONSULTACJĘ" cta-link="/buttons">
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
      <template #cta>
        UMÓW KONSULTACJĘ
      </template>
    </FullViewportSlider>
    -->

    <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
