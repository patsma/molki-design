<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  modelValue: string;
  baseDirectory: string;
}>();

const emit = defineEmits(['update:modelValue']);

const pdfFiles = ref<string[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Function to list PDF files from the public directory
const listPdfFiles = async () => {
  try {
    isLoading.value = true;
    // This would need to be implemented on the server side
    // For now, we'll use a placeholder API endpoint
    const response = await fetch('/api/studio/list-pdfs');
    const files = await response.json();
    pdfFiles.value = files.map((file: string) => ({
      path: file,
      name: file.split('/').pop(),
    }));
  } catch (e) {
    error.value = 'Failed to load PDF files';
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const selectFile = (path: string) => {
  emit('update:modelValue', path);
};

onMounted(() => {
  listPdfFiles();
});
</script>

<template>
  <div class="pdf-picker">
    <div v-if="isLoading" class="loading">Loading PDF files...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="picker-container">
      <select
        :value="modelValue"
        @change="(e) => selectFile((e.target as HTMLSelectElement).value)"
        class="pdf-select"
      >
        <option value="">Select a PDF file</option>
        <option
          v-for="file in pdfFiles"
          :key="file.path"
          :value="file.path"
          :selected="modelValue === file.path"
        >
          {{ file.name }}
        </option>
      </select>

      <div v-if="modelValue" class="preview">Selected: {{ modelValue.split('/').pop() }}</div>
    </div>
  </div>
</template>

<style scoped>
.pdf-picker {
  width: 100%;
  padding: 1rem;
}

.pdf-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
}

.preview {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 0.375rem;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
}

.error {
  color: #e53e3e;
}
</style>
