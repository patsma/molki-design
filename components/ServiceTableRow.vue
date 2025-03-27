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
  <tr class="border-b border-neutral-400" v-scroll-anim:fadeLeft="{ delay: 0.2 }">
    <td class="p-4 font-medium" v-scroll-anim:fadeRight="{ delay: 0.3 }">{{ name }}</td>
    <td
      v-for="(value, key) in { basicFunc, premiumFunc, basicExec, premiumExec }"
      :key="key"
      class="p-4 text-center align-middle h-18"
      v-scroll-anim:scale="{ delay: 0.4 }"
    >
      <div class="flex items-center justify-center h-full">
        <Icon
          :name="value ? 'fig:checked' : 'fig:crossed'"
          class="w-6 h-6 transition-transform duration-300 hover:scale-110"
          :class="value ? 'text-primary' : 'text-neutral-500'"
          v-scroll-anim:scale="{ delay: 0.5 }"
        />
      </div>
    </td>
  </tr>
</template>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
</style>
