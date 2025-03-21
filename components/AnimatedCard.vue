<script setup>
const props = defineProps({
  title: String,
  text: String,
  image: String,
  index: {
    type: Number,
    default: 0,
  },
});

// Calculate animation delay based on item index
const delay = computed(() => 0.2 + props.index * 0.1);
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden" v-scroll-anim="{ delay }">
    <div v-if="image" class="h-48 overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>

    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600">{{ text }}</p>
    </div>
  </div>
</template>
