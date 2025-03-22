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

// onMounted(() => {
//   if (process.client && headerRef.value) {
//     $scrollAnimations.create(headerRef.value, 'fadeUp', { delay: 0.1 });
//   }
// });
</script>

<template>
  <div>
    <div class="spacer w-full h-screen"></div>
    <!-- Hero section with manual animation -->

    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 ref="headerRef" class="text-4xl md:text-6xl font-bold mb-6" v-scroll-anim:fadeUp>
          Animation System Demo
        </h1>

        <p
          class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          v-scroll-anim:fadeUp="{ delay: 0.3 }"
        >
          A simple, clean approach to scroll-triggered animations
        </p>
      </div>
    </section>

    <!-- Add this new section before the Cards Grid Section -->

    <!-- Cards Grid Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center" v-scroll-anim:scale>
          Card Grid with Stagger
        </h2>

        <!-- Grid with stagger animation -->
        <div
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          v-scroll-anim:staggerUp="{
            stagger: {
              amount: 0.6,
              from: 'start',
              grid: 'auto',
            },
          }"
        >
          <div
            v-for="item in items"
            :key="item.title"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
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
          Different Animation Patterns
        </h2>

        <!-- Left to Right -->
        <div class="mb-16">
          <h3 class="text-xl font-semibold mb-4">Stagger from Left</h3>
          <div
            class="grid md:grid-cols-4 gap-4"
            v-scroll-anim:staggerLeft="{
              stagger: {
                amount: 0.4,
                from: 'start',
                grid: [4, 1],
              },
            }"
          >
            <div
              v-for="item in items.slice(0, 4)"
              :key="item.title"
              class="bg-white p-4 rounded-lg shadow-md"
            >
              {{ item.title }}
            </div>
          </div>
        </div>

        <!-- Right to Left -->
        <div class="mb-16">
          <h3 class="text-xl font-semibold mb-4">Stagger from Right</h3>
          <div
            class="grid md:grid-cols-4 gap-4"
            v-scroll-anim:staggerRight="{
              stagger: {
                amount: 0.4,
                from: 'end',
                grid: [4, 1],
              },
            }"
          >
            <div
              v-for="item in items.slice(0, 4)"
              :key="item.title"
              class="bg-white p-4 rounded-lg shadow-md"
            >
              {{ item.title }}
            </div>
          </div>
        </div>

        <!-- Scale Up -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Stagger Scale</h3>
          <div
            class="grid md:grid-cols-3 gap-4"
            v-scroll-anim:staggerScale="{
              stagger: {
                amount: 0.4,
                from: 'center',
                grid: 'auto',
              },
            }"
          >
            <div
              v-for="item in items"
              :key="item.title"
              class="bg-white p-4 rounded-lg shadow-md text-center"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2
          class="text-3xl font-bold mb-12 text-center"
          v-scroll-anim:splitText="{ type: 'chars', stagger: 0.02 }"
        >
          Text Animation Examples
        </h2>

        <div class="grid md:grid-cols-2 gap-12 mb-12">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3
              class="text-2xl font-semibold mb-4"
              v-scroll-anim:splitWords="{ type: 'words', stagger: 0.1 }"
            >
              Animate Each Word Separately
            </h3>
            <p
              class="text-lg"
              v-scroll-anim:splitText="{
                type: 'chars',
                stagger: 0.01,
                delay: 0.5,
              }"
            >
              Watch how each character animates individually in this text.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3
              class="text-2xl font-semibold mb-4"
              v-scroll-anim:splitText="{ type: 'words', stagger: 0.05 }"
            >
              Creative Text Animations
            </h3>
            <p
              class="text-lg"
              v-scroll-anim:splitWords="{
                type: 'words',
                stagger: 0.08,
                delay: 0.3,
              }"
            >
              Each word in this sentence will animate with a nice stagger effect.
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
</style>
