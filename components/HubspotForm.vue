<template>
  <div :id="formContainerId" class="hubspot-form-container">
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-600">Loading form...</p>
    </div>
    <div v-if="error" class="text-red-600 py-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  formId: string;
  region?: string;
  portalId?: string;
}>();

const { $hubspotForm } = useNuxtApp();
const formContainerId = `hubspot-form-${props.formId}`;
const loading = ref(true);
const error = ref('');

onMounted(() => {
  // Wait for HubSpot Forms script to load
  const checkHubspot = setInterval(() => {
    if (window.hbspt) {
      clearInterval(checkHubspot);
      try {
        $hubspotForm.create({
          target: `#${formContainerId}`,
          formId: props.formId,
          region: props.region,
          portalId: props.portalId,
        });
        loading.value = false;
      } catch (e) {
        error.value = 'Failed to load form';
        console.error('HubSpot form creation error:', e);
      }
    }
  }, 100);

  // Cleanup after 10 seconds if script doesn't load
  setTimeout(() => {
    clearInterval(checkHubspot);
    if (loading.value) {
      error.value = 'Form failed to load';
    }
  }, 10000);
});
</script>
