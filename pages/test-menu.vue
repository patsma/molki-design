<template>
  <div class="container mx-auto my-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Test Menu Configuration</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Display the TestMenu component -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Menu Display</h2>
        <TestMenu />
      </div>

      <!-- Display the raw JSON -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Configuration JSON</h2>
        <pre class="p-4 bg-gray-100 rounded-md overflow-auto text-sm">{{
          JSON.stringify(config, null, 2)
        }}</pre>

        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 class="font-medium text-blue-800 mb-2">How it works:</h3>
          <ol class="list-decimal pl-5 space-y-2 text-sm">
            <li>Edit the menu in Nuxt Studio under "Test Menu"</li>
            <li>The changes are automatically saved to app.config.ts</li>
            <li>The TestMenu component reads from useAppConfig()</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const appConfig = useAppConfig();
const config = computed(() => appConfig.testMenu);
</script>
