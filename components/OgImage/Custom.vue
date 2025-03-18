<script setup lang="ts">
const props = defineProps({
  path: String,
  title: String,
  description: String,
  cover: String,
  author: Object,
});

const siteConfig = useSiteConfig();
const twitter = props.author?.link?.replace('https://twitter.com/', '@');

// Make sure images have proper dimensions for social media platforms
const imageWidth = 1200;
const imageHeight = 630;

// Helper to ensure image URLs are valid and absolute
const getCoverImage = computed(() => {
  // Default fallback image
  const defaultImage = '/og-social-default.jpg';

  if (!props.cover) return defaultImage;

  // If already absolute URL, use it directly
  if (props.cover.startsWith('http')) {
    return props.cover;
  }

  // For relative URLs, make them absolute using site config
  const baseUrl = siteConfig.url || 'https://molki-design-2025.netlify.app';
  const path = props.cover.startsWith('/') ? props.cover : `/${props.cover}`;
  return `${baseUrl}${path}`;
});

// Truncate text to prevent overflow
const truncatedTitle = computed(() => {
  if (!props.title) return 'Molki Design';
  return props.title.length > 60 ? props.title.substring(0, 57) + '...' : props.title;
});

const truncatedDescription = computed(() => {
  if (!props.description) return 'Profesjonalne projekty wnętrz w Trójmieście';
  return props.description.length > 140
    ? props.description.substring(0, 137) + '...'
    : props.description;
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center text-white bg-gray-900"
    :style="{ padding: '30px 45px', width: '1200px', height: '630px' }"
  >
    <div class="px-5 py-3 rounded absolute bottom-10 bg-white right-10">
      <img src="/logo.svg" width="99" height="29" class="" />
    </div>
    <div class="pb-10 justify-center items-center flex flex-col">
      <img
        v-if="getCoverImage"
        :src="getCoverImage"
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
        {{ truncatedTitle }}
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
        {{ truncatedDescription }}
      </p>
      <div v-if="author" class="flex items-center mt-5">
        <img :src="author.avatarUrl" width="80" height="80" class="rounded-full mr-5" />
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
