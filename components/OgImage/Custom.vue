<script setup lang="ts">
interface Author {
  name?: string;
  link?: string;
  avatarUrl?: string;
}

interface Props {
  path?: string;
  title?: string;
  description?: string;
  cover?: string;
  author?: Author;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Molki Design',
  description: '',
  cover: '/og-social-default.jpg',
});

// Make sure images have proper dimensions for social media platforms
const imageWidth = 1200;
const imageHeight = 630;

// Helper to ensure image URLs are valid and optimize for social sharing
const getCoverImage = computed(() => {
  if (!props.cover) return '/og-social-default.jpg';

  // If cover image starts with http, it's already an absolute URL
  if (props.cover.startsWith('http')) {
    return props.cover;
  }

  // Otherwise, it's a relative URL - we'll use it as is since
  // the SEO composable is responsible for making it absolute
  return props.cover;
});

// Limit title and description lengths to avoid overflow
const formattedTitle = computed(() => {
  return props.title && props.title.length > 80
    ? props.title.substring(0, 77) + '...'
    : props.title || 'Molki Design';
});

const formattedDescription = computed(() => {
  return props.description && props.description.length > 180
    ? props.description.substring(0, 177) + '...'
    : props.description || '';
});

const twitter = computed(() => {
  return props.author?.link?.replace('https://twitter.com/', '@') || '';
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center text-white bg-gray-900"
    :style="{ padding: '30px 45px', width: imageWidth + 'px', height: imageHeight + 'px' }"
  >
    <div class="px-5 py-3 rounded absolute bottom-10 bg-white right-10">
      <img src="/logo.svg" width="99" height="29" alt="Molki Design Logo" />
    </div>
    <div class="pb-10 justify-center items-center flex flex-col">
      <img
        v-if="getCoverImage"
        :src="getCoverImage"
        :alt="formattedTitle"
        width="432"
        height="243"
        :style="{ borderRadius: '8px', overflow: 'hidden', objectFit: 'cover' }"
      />
      <h1
        :style="{
          fontSize: '65px',
          lineHeight: '85px',
          margin: '20px 0 0 0',
          padding: '0',
          maxWidth: '1000px',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }"
      >
        {{ formattedTitle }}
      </h1>
      <p
        :style="{
          fontSize: '29px',
          lineHeight: '45px',
          maxWidth: '900px',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
        }"
        class="mx-10 mt-5 text-gray-400"
      >
        {{ formattedDescription }}
      </p>
      <div v-if="author" class="flex items-center mt-5">
        <img
          v-if="author.avatarUrl"
          :src="author.avatarUrl"
          width="80"
          height="80"
          class="rounded-full mr-5"
          alt="Author avatar"
        />
        <div class="flex flex-col text-gray-300">
          <div class="text-3xl" :style="{ whiteSpace: 'pre' }">
            {{ author.name }}
          </div>
          <div class="text-gray-200">{{ twitter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
