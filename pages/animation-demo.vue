<script setup>
// Define some demo data
const items = [
  {
    title: 'Card One',
    text: 'This is the first card that demonstrates the animation system.',
    image: 'https://picsum.photos/seed/one/500/300',
  },
  {
    title: 'Card Two',
    text: 'This is the second card with a different animation delay.',
    image: 'https://picsum.photos/seed/two/500/300',
  },
  {
    title: 'Card Three',
    text: 'Notice how these cards animate in sequence as you scroll.',
    image: 'https://picsum.photos/seed/three/500/300',
  },
  {
    title: 'Card Four',
    text: 'Each card has a slightly longer delay for a smooth staggered effect.',
    image: 'https://picsum.photos/seed/four/500/300',
  },
  {
    title: 'Card Five',
    text: 'Simple scroll animations that work across page transitions.',
    image: 'https://picsum.photos/seed/five/500/300',
  },
  {
    title: 'Card Six',
    text: 'Easy to implement with directives or programmatically.',
    image: 'https://picsum.photos/seed/six/500/300',
  },
];

// Using the new animation system programmatically
const headerRef = ref(null);
const { $scrollAnimations } = useNuxtApp();

onMounted(() => {
  if (process.client && headerRef.value) {
    $scrollAnimations.create(headerRef.value, 'fadeUp', { delay: 0.1 });
  }
});
</script>

<template>
  <div>
    <!-- Hero section with manual animation -->
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 ref="headerRef" class="text-4xl md:text-6xl font-bold mb-6">Animation System Demo</h1>

        <p
          class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          v-scroll-anim:fadeUp="{ delay: 0.3 }"
        >
          A simple, clean approach to scroll-triggered animations
        </p>
      </div>
    </section>

    <!-- Cards Grid Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center" v-scroll-anim:fadeUp>
          Animation Examples
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            v-scroll-anim:fadeUp="{ delay: index * 0.1 }"
          >
            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Animation Types Demo -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center" v-scroll-anim:scale>
          Different Animation Types
        </h2>

        <div class="grid md:grid-cols-2 gap-12 mb-12">
          <div class="bg-white p-8 rounded-lg shadow-md" v-scroll-anim:fadeLeft>
            <h3 class="text-xl font-semibold mb-4">Fade Left</h3>
            <p>This element slides in from the left side of the screen.</p>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md" v-scroll-anim:fadeRight>
            <h3 class="text-xl font-semibold mb-4">Fade Right</h3>
            <p>This element slides in from the right side of the screen.</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white p-8 rounded-lg shadow-md text-center"
            v-scroll-anim:fadeUp="{ delay: i * 0.2 }"
          >
            <div
              class="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
            >
              {{ i }}
            </div>
            <h3 class="text-xl font-semibold mb-2">Feature {{ i }}</h3>
            <p>This element fades up with a staggered delay.</p>
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
</style>
