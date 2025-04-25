<script setup lang="ts">
interface Props {
  src: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  aspectRatio: '16:9',
  autoplay: false,
  controls: true,
  muted: false,
});

// Get aspect ratio class
const aspectRatioClass = computed(() => {
  switch (props.aspectRatio) {
    case '4:3':
      return 'aspect-[4/3]';
    case '1:1':
      return 'aspect-square';
    default:
      return 'aspect-video'; // 16:9
  }
});

// Detect video type and get embed URL
const videoUrl = computed(() => {
  const url = props.src;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com')
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];

    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  // Direct video URL
  return url;
});

// Check if it's an embed (YouTube/Vimeo) or direct video
const isEmbed = computed(() => {
  return (
    props.src.includes('youtube.com') ||
    props.src.includes('youtu.be') ||
    props.src.includes('vimeo.com')
  );
});
</script>

<template>
  <div class="content-video">
    <!-- Video Title -->
    <div v-if="title" class="mb-4">
      <h3 class="text-xl font-medium text-gray-900">{{ title }}</h3>
    </div>

    <!-- Video Container -->
    <div :class="['relative w-full overflow-hidden rounded-lg shadow-lg', aspectRatioClass]">
      <!-- Iframe for YouTube/Vimeo -->
      <iframe
        v-if="isEmbed"
        :src="videoUrl"
        :title="title"
        class="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <!-- Native video player for direct video URLs -->
      <video
        v-else
        :src="src"
        :controls="controls"
        :autoplay="autoplay"
        :muted="muted"
        class="absolute inset-0 h-full w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
