<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>
    <SquareGrid>
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz nasze najnowsze projekty</template>
      <template #items>
        <SquareGridItem
          to="/projects/project-1"
          number="01"
          title="Projekt wnętrza mieszkania"
          location="Gdańsk"
          year="2023"
          image="/heroHome.jpg"
        />
        <SquareGridItem
          to="/projects/project-2"
          number="02"
          title="Apartament nad morzem"
          location="Sopot"
          year="2023"
          image="/heroHome.jpg"
        />
        <SquareGridItem
          to="/projects/project-3"
          number="03"
          title="Dom jednorodzinny"
          location="Gdynia"
          year="2022"
          image="/heroHome.jpg"
        />
      </template>
    </SquareGrid>
    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import SquareGrid from '~/components/SquareGrid.vue';
import SquareGridItem from '~/components/SquareGridItem.vue';
</script>
