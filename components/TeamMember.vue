<script setup lang="ts">
import HeroPath from '~/components/HeroPath.vue';
import FrameCorner from '~/components/FrameCorner.vue';
</script>

<template>
  <section class="min-h-screen bg-neutral-100">
    <div class="content-grid py-24">
      <div class="breakout1 grid md:grid-cols-2 gap-12" data-scroll-section>
        <!-- Text Column -->
        <div class="flex flex-col h-full gap-10">
          <!-- Section Title -->
          <ClientOnly>
            <h3
              v-scroll-anim:fadeUp="{ delay: 0.2 }"
              class="font-bold uppercase tracking-widest text-secondary text-3xl md:text-4xl"
            >
              <slot name="section-title" mdc-unwrap="p">POZNAJMY SIĘ!</slot>
            </h3>

            <div class="grid gap-8">
              <!-- Name and Role with Decorator -->
              <div
                class="relative gap-1 grid pl-6 border-l-2 border-primary"
                v-scroll-anim:fadeLeft="{ delay: 0.4 }"
              >
                <h2
                  v-if="$slots.name"
                  class="font-semibold text-primary text-4xl md:text-5xl lg:text-6xl"
                >
                  <slot name="name" mdc-unwrap="p" />
                </h2>
                <p v-if="$slots.role" class="font-medium text-lg md:text-xl lg:text-2xl">
                  <slot name="role" mdc-unwrap="p" />
                </p>
              </div>

              <!-- Description -->
              <div
                v-if="$slots.description"
                v-scroll-anim:fadeUp="{ delay: 0.6 }"
                class="text-neutral-700 leading-relaxed space-y-6 text-2xl md:text-2xl"
              >
                <slot name="description" />
              </div>
            </div>
          </ClientOnly>
        </div>

        <!-- Image Column -->
        <div
          v-if="$slots.image"
          class="relative"
          v-scroll-anim:fadeIn="{ duration: 1.2, delay: 0.3 }"
        >
          <div class="relative aspect-[3/3.7] overflow-hidden">
            <slot name="image" />
            <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
          </div>
        </div>
      </div>

      <!-- Achievements Grid -->
      <div
        v-if="$slots.achievements"
        class="breakout1 mt-16 relative p-4 md:p-8"
        data-scroll-section
      >
        <ClientOnly>
          <FrameCorner v-scroll-anim:fadeUp="{ delay: 0.2 }" position="top-left" class="-top-4" />
          <div
            class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8"
            v-scroll-anim:staggerUp="{
              stagger: {
                amount: 0.4,
                from: 'start',
                grid: [4, 1],
              },
            }"
          >
            <slot name="achievements" />
          </div>
          <FrameCorner
            v-scroll-anim:fadeUp="{ delay: 0.2 }"
            position="bottom-right"
            class="-bottom-4"
          />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>
