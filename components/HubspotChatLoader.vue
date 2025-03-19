<!-- Component to handle HubSpot chat initialization based on cookie consent -->
<template>
  <!-- No visible elements - only initialization logic -->
</template>

<script setup lang="ts">
const { cookiesEnabledIds } = useCookieControl();
const { init } = useHubspotChat();

// Watch for cookie consent changes
watch(
  cookiesEnabledIds,
  (enabledCookies) => {
    // Check if chat cookies are accepted
    if (enabledCookies?.includes('chat')) {
      // Initialize HubSpot chat with default UI
      init();
    }
  },
  { immediate: true }
);
</script>
