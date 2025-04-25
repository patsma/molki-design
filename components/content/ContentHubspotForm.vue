<script setup>
defineProps({
  formId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="content-hubspot-form">
    <div v-if="$slots.title" class="mb-6">
      <h3 class="text-2xl font-semibold">
        <slot name="title" />
      </h3>
    </div>

    <div v-if="$slots.description" class="mb-6">
      <p class="text-gray-600">
        <slot name="description" />
      </p>
    </div>

    <ClientOnly>
      <HubspotForm :form-id="formId" region="eu1" />
      <template #fallback>
        <div class="animate-pulse">
          <div class="h-12 bg-gray-200 rounded mb-4"></div>
          <div class="h-12 bg-gray-200 rounded mb-4"></div>
          <div class="h-12 bg-gray-200 rounded"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
