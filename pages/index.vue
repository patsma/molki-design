<script setup>
// Using the home page to showcase our animation system
</script>

<template>
  <div>
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6" v-scroll-anim:fadeUp>
          Welcome to Molki Design
        </h1>

        <p
          class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          v-scroll-anim:fadeUp="{ delay: 0.3 }"
        >
          Profesjonalne projekty wnętrz w Trójmieście
        </p>

        <div class="mt-10" v-scroll-anim:fadeUp="{ delay: 0.5 }">
          <NuxtLink
            to="/animation-demo"
            class="bg-primary text-white px-8 py-3 rounded-lg inline-block hover:bg-primary-dark transition-colors"
          >
            View Animation Demo
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Example section with content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6" v-scroll-anim:fadeLeft>O nas</h2>
            <p class="mb-4 leading-relaxed" v-scroll-anim:fadeLeft="{ delay: 0.2 }">
              Nasza firma specjalizuje się w projektowaniu wnętrz, które łączą estetykę z
              funkcjonalnością.
            </p>
            <p class="mb-4 leading-relaxed" v-scroll-anim:fadeLeft="{ delay: 0.3 }">
              Każdy projekt traktujemy indywidualnie, dostosowując rozwiązania do potrzeb i
              oczekiwań klienta.
            </p>
            <p class="leading-relaxed" v-scroll-anim:fadeLeft="{ delay: 0.4 }">
              Nasze realizacje charakteryzują się dbałością o detale i wykorzystaniem najnowszych
              trendów w architekturze wnętrz.
            </p>
          </div>

          <div v-scroll-anim:fadeRight="{ delay: 0.3 }">
            <img
              src="https://picsum.photos/seed/interior/800/600"
              alt="Interior design example"
              class="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #b76246;
}
.bg-primary-dark {
  background-color: #a65339;
}
</style>
