<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <div class="content-grid py-10">
    <h1 class="text-2xl font-bold mb-6">App Config Test</h1>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Menu Items from App Config:</h2>
      <pre class="bg-neutral-100 p-4 rounded overflow-auto">{{ appConfig.menu }}</pre>
    </div>
  </div>
</template>
