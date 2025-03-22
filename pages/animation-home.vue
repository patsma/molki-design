<script setup>
// Using the home page to showcase our animation system
const { $scrollAnimations } = useNuxtApp();

// Optional: Create animations programmatically if needed
onMounted(() => {
  if (process.client) {
    // Example of programmatic animation creation
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el, index) => {
      $scrollAnimations.create(el, 'fadeUp', { delay: index * 0.1 });
    });
  }
});
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

    <!-- Additional Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center" v-scroll-anim:fadeUp>Nasze Usługi</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white p-8 rounded-lg shadow-md"
            v-scroll-anim:fadeUp="{ delay: i * 0.2 }"
          >
            <div
              class="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center text-white"
            >
              <span class="text-2xl">{{ i }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-4">Usługa {{ i }}</h3>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
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
