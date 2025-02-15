<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>
    <SquareGrid>
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz nasze najnowsze projekty</template>
      <template #items>
        <!-- Items will go here -->
      </template>
    </SquareGrid>
    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import SquareGrid from '~/components/SquareGrid.vue';
</script>
