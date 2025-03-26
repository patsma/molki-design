<template>
  <div :id="formContainerId" class="hubspot-form-container">
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-600">Loading form...</p>
    </div>
    <div v-if="error" class="text-red-600 py-4">
      {{ error }}
    </div>

    <!-- Debug info in development -->
    <!-- <div v-if="isDev" class="mt-4 p-4 bg-gray-100 rounded text-sm">
      <p>Portal ID: {{ portalId || 'Not set' }}</p>
      <p>Form ID: {{ formId }}</p>
      <p>Status: {{ loading ? 'Loading' : error ? 'Error' : 'Ready' }}</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  formId: string;
  region?: string;
  portalId?: string;
}>();

const config = useRuntimeConfig();
const { $hubspotForm } = useNuxtApp();
const formContainerId = `hubspot-form-${props.formId}`;
const loading = ref(true);
const error = ref('');
const isDev = config.public.isDev;

// Use provided portal ID or fall back to config
const portalId = computed(() => props.portalId || config.public.hubspotPortalId);

onMounted(() => {
  if (!portalId.value) {
    error.value = 'HubSpot portal ID is not configured';
    loading.value = false;
    return;
  }

  // Wait for HubSpot Forms script to load
  const checkHubspot = setInterval(() => {
    if (window.hbspt) {
      clearInterval(checkHubspot);
      try {
        $hubspotForm.create({
          target: `#${formContainerId}`,
          formId: props.formId,
          region: props.region,
          portalId: portalId.value,
        });
        loading.value = false;
      } catch (e: any) {
        error.value = `Failed to load form: ${e.message}`;
        console.error('HubSpot form creation error:', e);
      }
    }
  }, 100);

  // Cleanup after 10 seconds if script doesn't load
  setTimeout(() => {
    clearInterval(checkHubspot);
    if (loading.value) {
      error.value = 'Form failed to load';
      loading.value = false;
    }
  }, 10000);
});
</script>
