<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>

    <SquareGrid v-if="projects?.length">
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz nasze najnowsze projekty</template>
      <template #items>
        <SquareGridItem
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          :number="project.number"
          :title="project.title"
          :location="project.location"
          :year="project.year"
          :image="project.cover"
        />
      </template>
    </SquareGrid>

    <BannerPricing>
      <template #title>
        <h2>Nowe Pomysły na Twoje Wnętrze</h2>
      </template>

      <template #description>
        <p>
          Czujesz, że Twoje wnętrze nie spełnia Twoich oczekiwań, ale nie potrzebujesz pełnego
          projektu? Skorzystaj z naszej Porady Projektowej.
        </p>
      </template>

      <template #image>
        <ParallaxImg>
          <nuxt-img
            src="/heroInterior.jpg"
            alt="Interior Design Consultation"
            class="parallax-content"
            format="webp"
          />
        </ParallaxImg>
      </template>

      <template #options>
        <PricingOption>
          <template #title>Porada Projektowa</template>
          <template #price>600 zł</template>
        </PricingOption>
        <PricingOption>
          <template #title>Porada Projektowa z dokumentacją</template>
          <template #price>1 200 zł</template>
        </PricingOption>
      </template>

      <template #infoText>
        Do porady projektowej oferujemy opcję wykonania wizualizacji pomieszczeń, dostępnych po
        indywidualnej wycenie
      </template>
    </BannerPricing>

    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import { queryCollection } from '#imports';

const { data: projects } = await useAsyncData('isolation-projects', () =>
  queryCollection('projects').order('number', 'ASC').all()
);
</script>
