<template>
  <div class="p-6 space-y-8">
    <h2 class="text-2xl font-bold mb-4">BaseButton Examples</h2>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Button Types</h3>
      <div class="flex flex-wrap gap-4">
        <!-- Regular Button -->
        <BaseButton @click="handleButtonClick"> Regular Button ({{ clickCount }}) </BaseButton>

        <!-- Internal Link -->
        <BaseButton to="/o-nas"> Internal Link </BaseButton>

        <!-- External Link -->
        <BaseButton href="https://nuxtjs.org" target="_blank"> External Link </BaseButton>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Button Variants</h3>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="primary"> Primary </BaseButton>

        <BaseButton variant="secondary"> Secondary </BaseButton>

        <BaseButton variant="text"> Text </BaseButton>

        <BaseButton variant="outline"> Outline </BaseButton>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Button Sizes</h3>
      <div class="flex flex-wrap gap-4 items-center">
        <BaseButton size="sm"> Small </BaseButton>

        <BaseButton size="md"> Medium </BaseButton>

        <BaseButton size="lg"> Large </BaseButton>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Full Width</h3>
      <div class="w-full">
        <BaseButton :full-width="true"> Full Width Button </BaseButton>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Case Control</h3>
      <div class="flex flex-wrap gap-4">
        <BaseButton> Default (Uppercase) </BaseButton>

        <BaseButton :uppercase="false"> Lowercase/Normal Case </BaseButton>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Disabled State</h3>
      <div class="flex flex-wrap gap-4">
        <BaseButton :disabled="true"> Disabled Button </BaseButton>

        <BaseButton variant="secondary" :disabled="true"> Disabled Secondary </BaseButton>

        <BaseButton to="/o-nas" :disabled="true"> Disabled Link </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '~/components/BaseButton.vue';

const clickCount = ref(0);

const handleButtonClick = () => {
  clickCount.value++;
};
</script>
