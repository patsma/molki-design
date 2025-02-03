<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero data-scroll-section>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroTeam>
        <template #title> POZNAJ ZESPÓŁ MOLKI DESIGN! </template>

        <template #heroImage>
          <ParallaxImg src="/heroHome.jpg" class="h-full w-full object-cover" format="webp" />
        </template>

        <template #description-0> Od 2019 roku Molki Design, z siedzibą w Gdańsku... </template>

        <template #description-1> Nasz zespół to grupa pasjonatów... </template>
      </HeroTeam>

      <TeamMember>
        <template #name>Anna Kowalska</template>
        <template #role>Główna Projektantka</template>
        <template #description> Z pasją do designu i wieloletnim doświadczeniem... </template>

        <template #image>
          <ParallaxImg src="/heroHome.jpg" class="h-full w-full object-cover" format="webp" />
        </template>

        <template #achievement-0-title>150+</template>
        <template #achievement-0-subtitle>Projektów</template>

        <template #achievement-1-title>10 lat</template>
        <template #achievement-1-subtitle>Doświadczenia</template>
      </TeamMember>

      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>

      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import ParallaxImg from '~/components/ParallaxImg.vue';
import HeroTeam from '~/components/Hero/HeroTeam.vue';
import TeamMember from '~/components/Hero/TeamMember.vue';

const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
console.log(home.value?.title);

// Move teamData here or to a separate composable
const teamData = {
  intro: {
    /*...*/
  },
  members: [
    /*...*/
  ],
};
</script>
