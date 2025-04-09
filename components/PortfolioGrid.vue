<script setup lang="ts">
// Define content types for proper typing
type ContentType = 'projects' | 'blog' | 'realizacje';

// Define props with more flexibility for different content types
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    contentType?: ContentType;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
    limit?: number;
  }>(),
  {
    contentType: 'realizacje',
    orderBy: 'number',
    orderDirection: 'ASC',
    limit: 0,
  }
);

// Fetch and transform content based on content type
const { data: rawItems } = await useAsyncData(`${props.contentType}-grid`, async () => {
  try {
    let query = queryCollection(props.contentType as any);

    if (props.orderBy) {
      query = query.order(props.orderBy as any, props.orderDirection);
    }

    if (props.limit > 0) {
      query = query.limit(props.limit);
    }

    return await query.all();
  } catch (error) {
    console.error(`Error fetching ${props.contentType}:`, error);
    return [];
  }
});

// Transform items to ensure metraz is at root level
const items = computed(() => {
  if (!rawItems.value) return [];

  return rawItems.value.map((item) => ({
    ...item,
    metraz: item.metraz || item.meta?.metraz,
  }));
});
</script>

<template>
  <section class="py-10" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title and Subtitle -->
        <div v-if="$slots.title" class="text-center mb-16">
          <h2
            class="h2-style font-semibold text-primary mb-4"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <p
            v-if="$slots.subtitle"
            class="text-xl md:text-2xl text-neutral-800"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <slot name="subtitle" mdc-unwrap="p" />
          </p>
        </div>

        <!-- Portfolio Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <template v-if="items?.length">
            <slot name="item" v-for="item in items" :key="item.id" :item="item" />
          </template>
          <slot name="items" v-else />
        </div>
      </div>
    </div>
  </section>
</template>
