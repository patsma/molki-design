<script setup lang="ts">
defineProps<{
  name: string;
  basicFunc?: boolean;
  premiumFunc?: boolean;
  basicExec?: boolean;
  premiumExec?: boolean;
}>();
</script>

<template>
  <tr class="border-b border-neutral-400">
    <td class="p-4 font-medium">{{ name }}</td>
    <td
      v-for="(value, key) in { basicFunc, premiumFunc, basicExec, premiumExec }"
      :key="key"
      class="p-4 text-center align-middle h-18"
    >
      <div class="flex items-center justify-center h-full">
        <Icon
          :name="value ? 'fig:checked' : 'fig:crossed'"
          class="w-6 h-6"
          :class="value ? 'text-primary' : 'text-neutral-500'"
        />
      </div>
    </td>
  </tr>
</template>
