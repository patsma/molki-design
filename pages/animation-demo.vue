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
    text: 'Easy to implement with directives or the composable.',
    image: 'https://picsum.photos/seed/six/500/300',
  },
];

// Using the scroll animation composable for custom elements
const headerRef = ref(null);
const { animate } = useScrollAnimation();

onMounted(() => {
  if (headerRef.value) {
    animate(headerRef.value, 'fadeUp', { delay: 0.1 });
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
          v-scroll-anim="{ delay: 0.3 }"
        >
          A simple, clean approach to scroll-triggered animations
        </p>
      </div>
    </section>

    <!-- First animated section -->
    <AnimatedSection
      title="Using the AnimatedSection Component"
      subtitle="This component handles animations for its children automatically"
    >
      <AnimatedCard
        v-for="(item, index) in items.slice(0, 3)"
        :key="index"
        :title="item.title"
        :text="item.text"
        :image="item.image"
        :index="index"
      />
    </AnimatedSection>

    <!-- Second animated section with different animation type -->
    <AnimatedSection
      title="Different Animation Types"
      subtitle="You can use various animation presets like fadeLeft, fadeRight, scale, etc."
      animation-type="fadeLeft"
    >
      <AnimatedCard
        v-for="(item, index) in items.slice(3)"
        :key="index"
        :title="item.title"
        :text="item.text"
        :image="item.image"
        :index="index"
      />
    </AnimatedSection>

    <!-- Direct use of directive on custom elements -->
    <section class="py-16 md:py-24 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center" v-scroll-anim:scale>
          Direct Directive Usage
        </h2>

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
            <p>This element uses the v-scroll-anim directive directly with custom delay.</p>
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
