<template>
  <div class="text-center">
    <div class="p-8 bg-primary md:border-r border-white/40">
      <h3 class="text-xl font-semibold text-white">
        <slot name="title" mdc-unwrap="p" />
      </h3>
    </div>
    <div class="p-8 bg-white md:border-r border-neutral-300">
      <p class="text-2xl font-bold">
        <slot name="price" mdc-unwrap="p" />
      </p>
    </div>
  </div>
</template>
