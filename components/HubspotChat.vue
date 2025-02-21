<template>
  <div class="fixed-element">
    <button
      @click="handleChatClick"
      class="absolute bottom-20 right-6 z-[9999] bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
    >
      <Icon name="uil:comments" class="w-6 h-6" />
      <span class="text-sm font-medium">Chat z nami</span>
      <span v-if="!isWidgetReady" class="text-xs">(Loading...)</span>
    </button>

    <!-- Debug info in development -->
    <div v-if="isDev" class="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs">
      <p>Widget Ready: {{ isWidgetReady }}</p>
      <p>Widget Status: {{ widgetStatus }}</p>
      <button @click="initializeWidget" class="text-blue-400 underline mt-2">
        Reinitialize Widget
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { openChat, isWidgetReady, widgetStatus, checkWidgetStatus, initializeWidget } =
  useHubspotChat();
const { $hubspotDebug } = useNuxtApp();
const config = useRuntimeConfig();
const isDev = config.public.isDev || process.env.NODE_ENV === 'development';

const handleChatClick = () => {
  console.log('Chat button clicked');
  $hubspotDebug();
  initializeWidget(); // Try to initialize first
  setTimeout(() => {
    openChat(); // Then try to open
  }, 500);
};
</script>

<style scoped>
.fixed-element {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.fixed-element button {
  pointer-events: auto;
}
</style>
