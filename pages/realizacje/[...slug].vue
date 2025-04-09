<script setup>
import FsLightbox from 'fslightbox-vue';

const route = useRoute();
const fullPath = `/realizacje/${route.params.slug.join('/')}`;

// Lightbox state
const toggler = ref(false);
const currentImageIndex = ref(0);

const { data } = await useAsyncData(`realizacja-${route.path}`, async () => {
  try {
    const realizacja = await queryCollection('realizacje')
      .where('slug', '=', route.params.slug)
      .first();
    if (!realizacja && process.server && import.meta.env.NITRO_PRERENDER) {
      return null;
    }
    console.log('Fetched realizacja data:', realizacja);
    console.log('Metraz value:', realizacja?.metraz);
    return realizacja;
  } catch (error) {
    console.error('Error fetching realizacja:', error);
    if (process.server && import.meta.env.NITRO_PRERENDER) {
      return null;
    }
    return null;
  }
});

// Throw 404 if data not found
if (!data.value && (!process.server || !import.meta.env.NITRO_PRERENDER)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Realizacja nie została odnaleziona',
    fatal: true,
  });
}

// Get all images for the gallery
const galleryImages = computed(() => {
  if (!data.value) return [];

  const images = [];

  // Add cover image if exists
  if (data.value.cover) {
    images.push(data.value.cover);
  }

  // Add slider images if they exist
  if (data.value.slider?.images) {
    images.push(...data.value.slider.images);
  }

  // Add regular images if they exist
  if (data.value.images) {
    images.push(...data.value.images);
  }

  // Normalize image format
  return images.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: 'Gallery image' };
    }
    return image;
  });
});

// Handle image click
const openLightbox = (index) => {
  currentImageIndex.value = index;
  toggler.value = !toggler.value;
};

// Apply optimized SEO using the composable
import { usePageSeo } from '~/composables/usePageSeo';

// Apply SEO with error handling
try {
  if (data.value || !import.meta.env.NITRO_PRERENDER) {
    usePageSeo(data);

    // Define OG image with proper component and props
    const ogImageConfig = {
      component: 'Custom',
      props: {
        title: data.value?.title || 'Molki Design - Realizacje',
        description: data.value?.description || 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: data.value?.cover?.src || '/og-social-default.jpg',
      },
    };

    // If the realizacja has specific OG image config, use it
    if (data.value?.ogImage?.component && data.value?.ogImage?.props) {
      ogImageConfig.component = data.value.ogImage.component;
      ogImageConfig.props = {
        ...ogImageConfig.props,
        ...data.value.ogImage.props,
      };
    }

    defineOgImage(ogImageConfig);
  }
} catch (e) {
  console.error('Error applying SEO to realizacja page:', e);
}

// Get headerSpacing setting from meta
const needsHeaderSpacing = computed(() => {
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (data.value?.meta?.headerSpacing === false) {
    // console.log('Project: headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (data.value?.meta?.headerSpacing === true) {
    // console.log('Project: headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default for project pages is to ADD spacing if not specified
  // console.log(
  //   'Project: headerSpacing not specified in frontmatter, ADDING spacing by default for project pages'
  // );
  return true;
});

const ctaLink = computed(() => {
  if (data.value?.ctaLink) return data.value.ctaLink;
  if (data.value?.slug) return `/realizacje/${data.value.slug}`;
  return '/realizacje';
});
</script>

<template>
  <main :class="{ 'has-header-spacing': needsHeaderSpacing }">
    <div class="content-grid py-32">
      <div class="breakout1">
        <!-- Project Header -->
        <div
          class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-center pb-14"
          v-scroll-anim:fadeUp="{ delay: 0.2 }"
        >
          <div class="grid grid-flow-col justify-start gap-8">
            <div class="grid gap-3">
              <h1
                class="h3-style text-primary"
                v-scroll-anim:splitText="{ type: 'words', stagger: 0.05, delay: 0.4 }"
              >
                {{ data.title }}
              </h1>
              <div class="text-xl text-neutral-600" v-scroll-anim:fadeUp="{ delay: 0.5 }">
                <div class="flex items-center gap-4">
                  <div v-if="data.location" class="flex items-center">
                    <Icon name="ph:map-pin" class="w-5 h-5 mr-2 text-primary/70" />
                    {{ data.location }}
                  </div>
                  <div v-if="data.metraz" class="flex items-center">
                    <Icon name="uil:square-full" class="w-5 h-5 mr-2 text-primary/70" />
                    {{ data.metraz }} m²
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid text-center" v-scroll-anim:fadeLeft="{ delay: 0.6 }">
            <NuxtLink
              :to="ctaLink"
              class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Zobacz więcej"
            >
              {{ data.ctaText || 'ZOBACZ WIĘCEJ' }}
            </NuxtLink>
          </div>
        </div>

        <!-- Project Content -->
        <div class="grid" v-scroll-anim:fadeUp="{ delay: 0.7 }">
          <!-- Image Grid -->
          <div class="grid">
            <div class="gallery-container">
              <div class="gallery-grid">
                <div
                  v-for="(image, index) in galleryImages"
                  :key="index"
                  class="gallery-item"
                  @click="openLightbox(index)"
                >
                  <nuxt-img :src="image.src" :alt="image.alt" class="gallery-image" format="webp" />
                  <div class="pulse-circle">
                    <div class="rim1"></div>
                    <div class="rim2"></div>
                    <div class="rim3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LayoutPreFooterContent />
    <LayoutFooterContent />

    <!-- Lightbox -->
    <FsLightbox
      :toggler="toggler"
      :sources="galleryImages.map((img) => img.src)"
      :slide="currentImageIndex + 1"
      :initialAnimation="'fslightbox-fade-in-complete'"
      :slideChangeAnimation="'fslightbox-slide-change-complete'"
    />
  </main>
</template>

<style lang="scss">
.fslightbox-open {
  overflow: visible !important;
}
.container {
  max-width: 1920px;
}

.gallery {
  &-container {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &-item {
    aspect-ratio: 1;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    // Base states
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 1;
    }

    &::after {
      content: 'ZOBACZ';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1.125rem;
      font-weight: 500;
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 2;
    }

    // Pulse circle
    .pulse-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6rem;
      height: 6rem;
      opacity: 0;
      z-index: 2;
      transition: opacity 0.8s ease;

      .rim1,
      .rim2,
      .rim3 {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 6rem;
        height: 6rem;
        border: 0.0625rem solid white;
        background: transparent;
        opacity: 0;
      }
    }

    // Image
    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    // Hover states
    &:hover {
      &::before,
      &::after,
      .pulse-circle {
        opacity: 1;
      }

      .pulse-circle {
        .rim1 {
          animation: expand 3s ease-out infinite;
        }

        .rim2 {
          animation: expand 3s ease-out infinite 1s;
        }

        .rim3 {
          animation: expand 3s ease-out infinite 2s;
        }
      }

      .gallery-image {
        transform: scale(1.2);
      }
    }
  }
}

// Ripple animation
@keyframes expand {
  0% {
    width: 6rem;
    height: 6rem;
    border-width: 0.0625rem;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
  15% {
    opacity: 0.6;
  }
  100% {
    width: 6rem;
    height: 6rem;
    border-width: 0.0625rem;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.8);
  }
}

// Lightbox animations
.fslightbox {
  &-fade-in-complete {
    animation: lightboxFadeIn 0.3s ease-out;
  }

  &-slide-change-complete {
    animation: lightboxSlideChange 0.3s ease-out;
  }
}

@keyframes lightboxFadeIn {
  from {
    opacity: 0;
    transform: scale(0.93);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes lightboxSlideChange {
  from {
    opacity: 0;
    transform: translateX(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
