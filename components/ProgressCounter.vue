<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const completedCount = ref(0);
const inProgressCount = ref(0);
const notStartedCount = ref(0);

// Oblicz sumę i procent ukończenia
const totalCount = computed(() => {
  return completedCount.value + inProgressCount.value + notStartedCount.value;
});

const percentComplete = computed(() => {
  return Math.round((completedCount.value / totalCount.value) * 100) || 0;
});

// Pobierz pełną treść dokumentu - będziemy liczyć ręcznie po zamontowaniu
onMounted(() => {
  // Daj czas na wyrenderowanie treści
  setTimeout(() => {
    // Zlicz emoji bezpośrednio z DOM
    const allItems = document.querySelectorAll('.prose li');

    allItems.forEach((item) => {
      const text = item.textContent;
      if (text.includes('✅')) {
        completedCount.value++;
      } else if (text.includes('🟡')) {
        inProgressCount.value++;
      } else if (text.includes('❌')) {
        notStartedCount.value++;
      }
    });
  }, 500);
});
</script>

<template>
  <div class="progress-stats p-4 bg-neutral-300 rounded-lg my-6">
    <h3 class="text-lg font-semibold mb-2">Aktualny Postęp: {{ percentComplete }}% Ukończono</h3>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="bg-green-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">✅</span>
          <span class="font-bold text-lg">{{ completedCount }}</span>
        </div>
        <div class="text-sm">Ukończone</div>
      </div>

      <div class="bg-yellow-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">🟡</span>
          <span class="font-bold text-lg">{{ inProgressCount }}</span>
        </div>
        <div class="text-sm">W Trakcie</div>
      </div>

      <div class="bg-red-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">❌</span>
          <span class="font-bold text-lg">{{ notStartedCount }}</span>
        </div>
        <div class="text-sm">Nie Rozpoczęte</div>
      </div>
    </div>

    <div class="w-full bg-gray-200 rounded-full h-4">
      <div
        class="bg-primary h-4 rounded-full transition-all duration-500 ease-in-out"
        :style="{ width: `${percentComplete}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-stats {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
