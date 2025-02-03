<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroTeam>
        <template #title>POZNAJ ZESPÓŁ MOLKI DESIGN!</template>
        <template #image>
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #description>
          <p
            data-scroll-stagger-group
            data-scroll-animation="fadeUp"
            data-scroll-duration="0.8"
            data-scroll-stagger="0.2"
            class="text-xl md:text-2xl leading-relaxed text-neutral-800 opacity-0"
          >
            Od 2019 roku Molki Design, z siedzibą w Gdańsku, działa na rynku trójmiejskim, oferując
            kreatywne rozwiązania, które przekraczają oczekiwania.
          </p>
          <p
            data-scroll-stagger-group
            data-scroll-animation="fadeUp"
            data-scroll-duration="0.8"
            data-scroll-stagger="0.2"
            class="text-xl md:text-2xl leading-relaxed text-neutral-800 opacity-0"
          >
            Nasz zespół to grupa pasjonatów, którzy wzajemnie się uzupełniają, by dostarczać
            projekty, z których możemy być dumni.
          </p>
        </template>
      </HeroTeam>

      <TeamMember>
        <template #name>Anna Kowalska</template>
        <template #role>Główna Projektantka</template>
        <template #description>
          Z pasją do designu i wieloletnim doświadczeniem w projektowaniu wnętrz...
        </template>
        <template #image>
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Anna Kowalska"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #achievements>
          <Achievement>
            <template #title>150+</template>
            <template #subtitle>Zrealizowanych Projektów</template>
          </Achievement>
          <Achievement>
            <template #title>10 lat</template>
            <template #subtitle>Doświadczenia</template>
          </Achievement>
          <Achievement>
            <template #title>98%</template>
            <template #subtitle>Zadowolonych Klientów</template>
          </Achievement>
          <Achievement>
            <template #title>25+</template>
            <template #subtitle>Nagród Branżowych</template>
          </Achievement>
        </template>
      </TeamMember>

      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import HeroTeam from '~/components/HeroTeam.vue';
import TeamMember from '~/components/TeamMember.vue';
import Achievement from '~/components/Achievement.vue';
</script>
