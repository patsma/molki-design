<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero>
        <template #heroImage>
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroTeam>
        <template #title>POZNAJ ZESPÓŁ MOLKI DESIGN!</template>
        <template #image>
          <ParallaxImg
            src="/heroAbout.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #description>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Od 2019 roku Molki Design, z siedzibą w Gdańsku, działa na rynku trójmiejskim, oferując
            kreatywne rozwiązania, które przekraczają oczekiwania.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Nasz zespół to grupa pasjonatów, którzy wzajemnie się uzupełniają, by dostarczać
            projekty, z których możemy być dumni.
          </p>
        </template>
      </HeroTeam>

      <TeamMember>
        <template #section-title>POZNAJMY SIĘ!</template>
        <template #name>Wioletta Retko</template>
        <template #role>Prezes Zarządu</template>
        <template #description>
          <p class="mb-6">
            Uwielbiam organizować i nadzorować złożone projekty. Codziennie dbam o to, by każdy etap
            realizacji przebiegał zgodnie z planem, a każdy detal był dopracowany do perfekcji.
          </p>
          <p>
            Nie tylko kocham kolory i estetykę, ale również dbam o funkcjonalność przestrzeni, by
            były one zarówno piękne, jak i praktyczne. To pozwala mi rozwijać zespół i osiągać
            lepsze rezultaty.
          </p>
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
      <HeroInterior>
        <template #heroImage>
          <ParallaxImg
            src="/heroInterior.jpg"
            alt="Interior design showcase"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #cta>ZOBACZ NASZE REALIZACJE</template>
        <template #title>PROJEKT WNĘTRZA</template>
        <template #content>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Projektowanie wnętrz w naszym wykonaniu to partnerska współpraca z każdym klientem
            oparta na komunikacji, szacunku i zaufaniu.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Do każdego projektu podchodzimy z otwartym umysłem, dobrym poczuciem humoru i chęcią
            wysłuchania.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Rezultatem jest wspólna wizja przestrzeni, nad którą wspólnie pracujemy.
          </p>
        </template>
      </HeroInterior>
      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import HeroInterior from '~/components/HeroInterior.vue';
import HeroTeam from '~/components/HeroTeam.vue';
import TeamMember from '~/components/TeamMember.vue';
import Achievement from '~/components/Achievement.vue';
</script>
