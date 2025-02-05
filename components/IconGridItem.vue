<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center text-center md:items-start md:text-left gap-4"
    data-scroll-item
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
  >
    <IconBlock :name="icon" customClass="w-16 h-16 text-primary" />
    <h3 class="text-lg font-medium text-neutral-800">{{ title }}</h3>
  </div>
</template>

<style lang="scss">
.icon-grid-item {
  position: relative;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
    }
  }

  &__text {
    flex: 1;
  }

  &__connector {
    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      width: 3rem;
      height: 2px;
      background: linear-gradient(to right, #b76246, #d0835f, #a04225);
      transform: translateY(-50%);
    }
  }
}
</style>
