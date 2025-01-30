<script setup lang="ts">
import FrameCorner from './FrameCorner.vue';
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
        <div class="content-grid relative z-10 py-8 md:py-12">
          <div class="breakout1">
            <h2 class="h2-style font-semibold text-primary">
              {{ teamData.intro.title }}
            </h2>
          </div>
        </div>

        <!-- Image Section - ~60% -->
        <div class="relative flex-1 min-h-[70vh]">
          <div class="absolute w-full h-full inset-0 z-0">
            <div class="absolute inset-0 bg-black/30"></div>
            <NuxtImg
              :src="teamData.intro.image"
              alt="Molki Design Team"
              class="h-full w-full object-cover"
              format="webp"
              quality="70"
            />
          </div>
        </div>

        <!-- Description Section - remaining space -->
        <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100">
          <div class="breakout1">
            <div class="relative">
              <FrameCorner position="top-left" />
              <div class="space-y-6 px-8 py-12">
                <p
                  v-for="(paragraph, index) in teamData.intro.description"
                  :key="index"
                  class="text-xl md:text-2xl leading-relaxed text-neutral-800"
                >
                  {{ paragraph }}
                </p>
              </div>
              <FrameCorner position="bottom-right" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Member Sections -->
    <section
      v-for="(member, index) in teamData.members"
      :key="member.name"
      class="min-h-screen bg-neutral-100"
    >
      <div class="content-grid py-24">
        <div class="breakout1 grid md:grid-cols-2 gap-12">
          <!-- Text Column -->
          <div class="grid content-center gap-8">
            <div class="grid gap-4">
              <h2 class="h2-style font-semibold">{{ member.name }}</h2>
              <p class="text-primary font-medium">{{ member.role }}</p>
              <p class="body-large">{{ member.description }}</p>
            </div>
          </div>

          <!-- Image Column -->
          <div class="relative">
            <div class="relative aspect-[3/4] overflow-hidden">
              <NuxtImg
                :src="member.image"
                :alt="member.name"
                class="h-full w-full object-cover"
                format="webp"
                quality="90"
              />
              <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
            </div>
          </div>
        </div>

        <!-- Achievements Grid -->
        <div class="breakout1 mt-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
              v-for="achievement in member.achievements"
              :key="achievement.title"
              class="relative p-8 text-center"
            >
              <FrameCorner position="top-left" class="scale-75" />
              <h3 class="h3-style font-bold text-primary mb-2">{{ achievement.title }}</h3>
              <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
              <p class="body-small">{{ achievement.subtitle }}</p>
              <FrameCorner position="bottom-right" class="scale-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
