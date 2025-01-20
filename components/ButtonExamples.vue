<template>
  <div class="grid gap-8 p-8">
    <!-- Primary Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Primary Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <!-- Default Primary -->
        <button
          class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Default Primary
        </button>

        <!-- Large Primary -->
        <button
          class="rounded-md bg-primary px-6 py-3 text-base font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Large Primary
        </button>

        <!-- Small Primary -->
        <button
          class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Small Primary
        </button>
      </div>
    </div>

    <!-- Secondary Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Secondary Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <!-- Default Secondary -->
        <button
          class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Default Secondary
        </button>

        <!-- Large Secondary -->
        <button
          class="rounded-md bg-secondary px-6 py-3 text-base font-medium text-neutral-100 transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Large Secondary
        </button>

        <!-- Small Secondary -->
        <button
          class="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-neutral-100 transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Small Secondary
        </button>
      </div>
    </div>

    <!-- Outline Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Outline Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <!-- Primary Outline -->
        <button
          class="rounded-md border-2 border-primary px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Primary Outline
        </button>

        <!-- Secondary Outline -->
        <button
          class="rounded-md border-2 border-secondary px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-secondary hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Secondary Outline
        </button>
      </div>
    </div>

    <!-- Ghost Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Ghost Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <!-- Primary Ghost -->
        <button
          class="rounded-md px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Primary Ghost
        </button>

        <!-- Secondary Ghost -->
        <button
          class="rounded-md px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Secondary Ghost
        </button>
      </div>
    </div>

    <!-- Disabled States -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Disabled States</h2>
      <div class="flex flex-wrap gap-4">
        <button
          disabled
          class="rounded-md bg-primary/50 px-4 py-2 text-sm font-medium text-neutral-100 cursor-not-allowed"
        >
          Disabled Primary
        </button>
        <button
          disabled
          class="rounded-md bg-secondary/50 px-4 py-2 text-sm font-medium text-neutral-100 cursor-not-allowed"
        >
          Disabled Secondary
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed
</script>
