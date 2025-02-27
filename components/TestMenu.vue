<template>
  <div class="p-4 border rounded-md bg-white">
    <h3 class="font-bold text-lg mb-4">Test Menu</h3>

    <div v-if="!filteredItems.length" class="text-gray-500">No menu items configured</div>

    <ul v-else class="space-y-2">
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        class="p-2 border rounded hover:bg-gray-50"
      >
        <div>
          <strong>{{ item.label }}</strong> →
          <code class="text-sm text-blue-600">{{ item.link }}</code>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const appConfig = useAppConfig();

const filteredItems = computed(() => {
  const items = appConfig.testMenu?.links || [];
  return items.filter((item) => item?.label?.trim() && item?.link?.trim());
});
</script>
