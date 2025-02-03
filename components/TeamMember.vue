<script setup lang="ts">
import HeroPath from '~/components/HeroPath.vue';

const isClient = ref(false);

onMounted(() => {
  nextTick(() => {
    isClient.value = true;
  });
});
</script>

<template>
  <section class="min-h-screen bg-neutral-100">
    <div class="content-grid py-24">
      <div class="breakout1 grid md:grid-cols-2 gap-12">
        <!-- Text Column -->
        <div class="grid content-center gap-8">
          <div class="grid gap-4">
            <h2
              :data-scroll-item="isClient"
              :data-scroll-animation="isClient ? 'fadeUp' : null"
              :data-scroll-duration="isClient ? '1' : null"
              :data-scroll-order="isClient ? '1' : null"
              class="h2-style font-semibold"
            >
              <slot name="name" />
            </h2>
            <p
              :data-scroll-item="isClient"
              :data-scroll-animation="isClient ? 'fadeUp' : null"
              :data-scroll-duration="isClient ? '1' : null"
              :data-scroll-order="isClient ? '2' : null"
              class="text-primary font-medium"
            >
              <slot name="role" />
            </p>
            <p
              :data-scroll-item="isClient"
              :data-scroll-animation="isClient ? 'fadeUp' : null"
              :data-scroll-duration="isClient ? '1' : null"
              :data-scroll-order="isClient ? '3' : null"
              class="body-large"
            >
              <slot name="description" />
            </p>
          </div>
        </div>

        <!-- Image Column -->
        <div
          class="relative"
          :data-scroll-item="isClient"
          :data-scroll-animation="isClient ? 'fadeIn' : null"
          :data-scroll-duration="isClient ? '1.5' : null"
        >
          <div class="relative aspect-[3/4] overflow-hidden">
            <slot name="image" />
            <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
          </div>
        </div>
      </div>

      <!-- Achievements Grid -->
      <div class="breakout1 mt-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <slot name="achievements" />
        </div>
      </div>
    </div>
  </section>
</template>
