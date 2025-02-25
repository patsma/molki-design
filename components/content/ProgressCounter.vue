<script setup>
import { computed } from 'vue';

// Accept the entire document body as a prop
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

// Count occurrences of each emoji
const completedCount = computed(() => {
  return (props.content.match(/✅/g) || []).length;
});

const inProgressCount = computed(() => {
  return (props.content.match(/🟡/g) || []).length;
});

const notStartedCount = computed(() => {
  return (props.content.match(/❌/g) || []).length;
});

const totalCount = computed(() => {
  return completedCount.value + inProgressCount.value + notStartedCount.value;
});

const percentComplete = computed(() => {
  return Math.round((completedCount.value / totalCount.value) * 100) || 0;
});
</script>

<template>
  <div class="progress-stats p-4 bg-neutral-300 rounded-lg my-6">
    <h3 class="text-lg font-semibold mb-2">Current Progress: {{ percentComplete }}% Complete</h3>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="bg-green-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">✅</span>
          <span class="font-bold text-lg">{{ completedCount }}</span>
        </div>
        <div class="text-sm">Completed</div>
      </div>

      <div class="bg-yellow-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">🟡</span>
          <span class="font-bold text-lg">{{ inProgressCount }}</span>
        </div>
        <div class="text-sm">In Progress</div>
      </div>

      <div class="bg-red-100 p-3 rounded">
        <div class="flex items-center gap-2">
          <span class="text-xl">❌</span>
          <span class="font-bold text-lg">{{ notStartedCount }}</span>
        </div>
        <div class="text-sm">Not Started</div>
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
