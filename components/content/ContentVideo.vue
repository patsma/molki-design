/** * ContentVideo Component * * A versatile video and social media embed component for use in Nuxt
Content. * Supports YouTube, Vimeo, Facebook, Instagram, Twitter/X, and direct video files. * *
@example Basic Usage in Markdown: * ```md * ::content-video{src="YOUR_VIDEO_URL" title="Optional
Title"} * :: * ``` * * @example Platform-specific Examples: * * 1. YouTube: *
::content-video{src="https://www.youtube.com/watch?v=VIDEO_ID" title="YouTube Video"} * :: * * 2.
Vimeo: * ::content-video{src="https://vimeo.com/VIDEO_ID" title="Vimeo Video"} * :: * * 3. Facebook
Video: * ::content-video{src="https://www.facebook.com/PAGE/videos/VIDEO_ID" title="Facebook Video"}
* :: * * 4. Facebook Post: * ::content-video{src="https://www.facebook.com/PAGE/posts/POST_ID"
title="Facebook Post"} * :: * * 5. Instagram Post: *
::content-video{src="https://www.instagram.com/p/POST_ID" title="Instagram Post"} * :: * * 6.
Twitter/X Tweet: * ::content-video{src="https://twitter.com/USERNAME/status/TWEET_ID" title="Tweet"}
* :: * * 7. Direct Video with Custom Options: * ::content-video{ * src="/videos/my-video.mp4" *
title="Custom Video" * aspectRatio="4:3" * autoplay=true * muted=true * controls=true * } * :: * *
@prop {string} src - URL of the video or social media post (required) * @prop {string} title - Title
to display above the video (optional) * @prop {string} aspectRatio - Aspect ratio of the video:
'16:9' (default), '4:3', or '1:1' (optional) * @prop {boolean} autoplay - Enable autoplay for direct
videos (optional, default: false) * @prop {boolean} controls - Show video controls for direct videos
(optional, default: true) * @prop {boolean} muted - Mute direct videos (optional, default: false) */

<script setup lang="ts">
/**
 * A versatile video and social media embed component for Nuxt Content.
 * Supports YouTube, Vimeo, Facebook, Instagram, Twitter/X, and direct video files.
 *
 * Usage in Markdown:
 * ```md
 * Basic:
 * ::content-video{src="YOUR_VIDEO_URL" title="Optional Title"}
 * ::
 *
 * YouTube:
 * ::content-video{src="https://www.youtube.com/watch?v=VIDEO_ID"}
 * ::
 *
 * Vimeo:
 * ::content-video{src="https://vimeo.com/VIDEO_ID"}
 * ::
 *
 * Facebook:
 * ::content-video{src="https://www.facebook.com/PAGE/videos/VIDEO_ID"}
 * ::content-video{src="https://www.facebook.com/PAGE/posts/POST_ID"}
 * ::
 *
 * Instagram:
 * ::content-video{src="https://www.instagram.com/p/POST_ID"}
 * ::
 *
 * Twitter/X:
 * ::content-video{src="https://twitter.com/USERNAME/status/TWEET_ID"}
 * ::
 *
 * Direct Video:
 * ::content-video{
 *   src="/videos/my-video.mp4"
 *   aspectRatio="4:3"
 *   autoplay=true
 *   muted=true
 * }
 * ::
 * ```
 */

// Define window.twttr type
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

// Component props
interface Props {
  /** URL of the video or social media post */
  src: string;
  /** Optional title to display above the video */
  title?: string;
  /** Aspect ratio of the video container (default: '16:9') */
  aspectRatio?: '16:9' | '4:3' | '1:1';
  /** Enable autoplay for direct videos */
  autoplay?: boolean;
  /** Show video controls for direct videos */
  controls?: boolean;
  /** Mute direct videos */
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

// Detect platform and get embed URL
const { embedUrl, platform } = computed(() => {
  const url = props.src;
  let embedUrl = url;
  let platform = 'direct';

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com')
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
    platform = 'youtube';
  }

  // Vimeo
  else if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
    platform = 'vimeo';
  }

  // Facebook Video
  else if (url.includes('facebook.com') && url.includes('/videos/')) {
    embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    platform = 'facebook';
  }

  // Facebook Post
  else if (url.includes('facebook.com') && !url.includes('/videos/')) {
    embedUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true`;
    platform = 'facebook';
  }

  // Instagram
  else if (url.includes('instagram.com')) {
    embedUrl = `https://www.instagram.com/p/${url.split('/p/')[1]?.split('/')[0]}/embed`;
    platform = 'instagram';
  }

  // Twitter/X
  else if (url.includes('twitter.com') || url.includes('x.com')) {
    // For Twitter/X we'll need to use their embed script
    const tweetId = url.split('/status/')[1]?.split('?')[0];
    embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
    platform = 'twitter';
  }

  return { embedUrl, platform };
}).value;

// Check if it's a social media embed
const isSocialEmbed = computed(() => {
  return ['youtube', 'vimeo', 'facebook', 'instagram', 'twitter'].includes(platform);
});

// Load Twitter widgets if needed
onMounted(() => {
  if (platform === 'twitter') {
    // Load Twitter widget script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      document.head.appendChild(script);
    } else {
      // If already loaded, just trigger a widgets.load()
      window.twttr.widgets.load();
    }
  }
});
</script>

<template>
  <div class="content-video">
    <!-- Video Title -->
    <div v-if="title" class="mb-4">
      <h3 class="text-xl font-medium text-gray-900">{{ title }}</h3>
    </div>

    <!-- Video/Social Media Container -->
    <div :class="['relative w-full overflow-hidden rounded-lg shadow-lg', aspectRatioClass]">
      <!-- Social Media Embeds -->
      <iframe
        v-if="isSocialEmbed"
        :src="embedUrl"
        :title="title"
        class="absolute inset-0 h-full w-full"
        :class="{
          'min-h-[400px]': platform === 'facebook',
          'min-h-[450px]': platform === 'instagram',
        }"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
        scrolling="no"
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
