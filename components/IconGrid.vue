<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="py-16" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title Section -->
        <div class="text-center mb-16" v-if="title || subtitle">
          <h2
            v-if="title"
            class="h2-style font-semibold text-primary mb-4"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            {{ title }}
          </h2>
          <p
            v-if="subtitle"
            class="text-xl md:text-2xl text-neutral-800"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            {{ subtitle }}
          </p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.icon-grid {
  &__container {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
    position: relative;

    @media (min-width: 768px) {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, auto);
      gap: 0;

      // Grid item positioning with separators
      > :nth-child(1) {
        grid-area: 1 / 1 / 2 / 2;
      }
      > :nth-child(2) {
        grid-area: 1 / 3 / 2 / 4;
      }
      > :nth-child(3) {
        grid-area: 1 / 5 / 2 / 6;
      }
      > :nth-child(4) {
        grid-area: 3 / 5 / 4 / 6;
      }
      > :nth-child(5) {
        grid-area: 3 / 3 / 4 / 4;
      }
      > :nth-child(6) {
        grid-area: 3 / 1 / 4 / 2;
      }
      > :nth-child(7) {
        grid-area: 5 / 1 / 6 / 2;
      }
      > :nth-child(8) {
        grid-area: 5 / 3 / 6 / 4;
      }
      > :nth-child(9) {
        grid-area: 5 / 5 / 6 / 6;
      }

      // Horizontal separators
      &::before {
        content: '';
        position: absolute;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
        height: 2px;
      }

      // First row horizontal lines
      &::before {
        content: '';
        grid-area: 1 / 2 / 2 / 3;
        width: 100%;
        top: 50%;
      }

      &::after {
        content: '';
        grid-area: 1 / 4 / 2 / 5;
        width: 100%;
        top: 50%;
        height: 2px;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
      }

      // Vertical and other connectors using pseudo-elements on grid items
      > :nth-child(3)::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom, #b76246, #d0835f, #a04225);
        left: 50%;
        top: 100%;
      }

      > :nth-child(6)::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom, #b76246, #d0835f, #a04225);
        left: 50%;
        top: 100%;
      }

      // Third row horizontal lines
      > :nth-child(6)::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 2px;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
        right: -100%;
        top: 50%;
      }

      > :nth-child(5)::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 2px;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
        right: -100%;
        top: 50%;
      }

      // Fifth row horizontal lines
      > :nth-child(7)::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 2px;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
        right: -100%;
        top: 50%;
      }

      > :nth-child(8)::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 2px;
        background: linear-gradient(to right, #b76246, #d0835f, #a04225);
        right: -100%;
        top: 50%;
      }
    }
  }
}
</style>
