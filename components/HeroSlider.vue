<script setup lang="ts">
import FrameCorner from '~/components/FrameCorner.vue';
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  achievements: Achievement[];
}

interface Achievement {
  title: string;
  subtitle: string;
}

const teamData = {
  intro: {
    title: 'POZNAJ ZESPÓŁ MOLKI DESIGN!',
    description: [
      'Od 2019 roku Molki Design, z siedzibą w Gdańsku, działa na rynku trójmiejskim, oferując kreatywne rozwiązania, które przekraczają oczekiwania.',
      'Nasz zespół to grupa pasjonatów, którzy wzajemnie się uzupełniają, by dostarczać projekty, z których możemy być dumni.',
    ],
    image: '/heroHome.jpg',
  },
  members: [
    {
      name: 'Anna Kowalska',
      role: 'Główna Projektantka',
      description: 'Z pasją do designu i wieloletnim doświadczeniem w projektowaniu wnętrz...',
      image: '/heroHome.jpg',
      achievements: [
        { title: '150+', subtitle: 'Zrealizowanych Projektów' },
        { title: '10 lat', subtitle: 'Doświadczenia' },
        { title: '98%', subtitle: 'Zadowolonych Klientów' },
        { title: '25+', subtitle: 'Nagród Branżowych' },
      ],
    },
  ],
};
</script>

<template>
  <div class="hero-slider">
    <!-- Team Intro Section -->
    <section class="min-h-screen relative flex flex-col">
      <div class="relative flex-1 flex flex-col">
        <!-- Title Section - ~10% -->
        <div data-scroll-section class="content-grid relative z-10 py-8 md:py-12">
          <div class="breakout1">
            <h2
              class="h2-style font-semibold text-primary"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-position="+=0.5"
            >
              {{ teamData.intro.title }}
            </h2>
          </div>
        </div>

        <!-- Image Section - ~60% -->
        <div class="relative flex-1 min-h-[70vh] overflow-hidden">
          <div class="absolute w-full h-full inset-0 z-0">
            <div class="absolute inset-0 bg-black/30"></div>

            <ParallaxImg
              src="/heroHome.jpg"
              alt="Full width parallax"
              class="h-full w-full object-cover"
              format="webp"
            />
          </div>
        </div>

        <!-- Description Section - remaining space -->
        <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100" data-scroll-section>
          <div class="breakout1">
            <div class="relative">
              <FrameCorner
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="0.8"
                data-scroll-independent="true"
                data-scroll-start="top center"
                position="top-left"
              />
              <div class="space-y-6 px-8 py-12">
                <p
                  data-scroll-stagger-group
                  data-scroll-animation="fadeUp"
                  data-scroll-duration="0.8"
                  data-scroll-stagger="0.2"
                  v-for="(paragraph, index) in teamData.intro.description"
                  :key="index"
                  class="text-xl md:text-2xl leading-relaxed text-neutral-800 opacity-0"
                >
                  {{ paragraph }}
                </p>
              </div>
              <FrameCorner
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="0.8"
                data-scroll-independent="true"
                data-scroll-start="top center"
                position="bottom-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
