<script setup>
/**
 * Component for testing cookie functionality
 * For development purposes only
 */
import { useCookieManagement } from '~/composables/useCookieManagement';

const cookieManagement = useCookieManagement();

// Test if cookies are accepted
const acceptedCookies = ref(false);
const functionalCookiesEnabled = ref(false);

onMounted(() => {
  if (process.client) {
    // Update status on mount
    updateCookieStatus();

    // Set up interval to check status
    const interval = setInterval(updateCookieStatus, 2000);

    // Clean up interval
    onBeforeUnmount(() => {
      clearInterval(interval);
    });
  }
});

// Function to update cookie status
function updateCookieStatus() {
  acceptedCookies.value = cookieManagement.areCookiesAccepted();
  functionalCookiesEnabled.value = cookieManagement.isCookieEnabled('functional');

  // Also log status
  cookieManagement.logCookieStatus();
}
</script>

<template>
  <div class="cookie-test p-4 bg-neutral-200 rounded-lg max-w-md mx-auto my-8">
    <h2 class="text-lg font-bold text-secondary mb-4">Cookie Test Panel</h2>
    <div class="space-y-2">
      <p class="text-text-primary">
        <span class="font-bold">Cookies Accepted:</span>
        <span
          class="ml-2 px-2 py-1 rounded text-white"
          :class="acceptedCookies ? 'bg-primary' : 'bg-neutral-600'"
          >{{ acceptedCookies ? 'Yes' : 'No' }}</span
        >
      </p>

      <p class="text-text-primary">
        <span class="font-bold">Functional Cookies:</span>
        <span
          class="ml-2 px-2 py-1 rounded text-white"
          :class="functionalCookiesEnabled ? 'bg-primary' : 'bg-neutral-600'"
          >{{ functionalCookiesEnabled ? 'Enabled' : 'Disabled' }}</span
        >
      </p>

      <div class="pt-2">
        <button
          @click="updateCookieStatus"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          Refresh Status
        </button>
      </div>

      <p class="text-sm text-neutral-600 mt-4">
        This component is for development purposes only. Check the console for detailed cookie
        information.
      </p>
    </div>
  </div>
</template>
