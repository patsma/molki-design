<template>
  <section class="py-16" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title Section -->
        <div class="text-center mb-16" v-if="$slots.title">
          <h2
            v-scroll-anim:splitText="{ type: 'words', stagger: 0.2 }"
            class="h2-style font-semibold text-primary mb-4"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
        </div>

        <!-- Grid Layout -->
        <div
          v-scroll-anim:staggerUp="{ stagger: { amount: 2, from: 'start' } }"
          class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          <slot name="items" />
        </div>
      </div>
    </div>
  </section>
</template>
