<script setup>
const route = useRoute();
const fullPath = `/realizacje/${route.params.slug.join('/')}`;
const swiperRef = ref(null);

const { data } = await useAsyncData(`project-${route.path}`, async () => {
  try {
    const project = await queryCollection('projects').where('slug', '=', route.params.slug).first();
    // During prerendering, return null if project doesn't exist
    if (!project && process.server && import.meta.env.NITRO_PRERENDER) {
      return null;
    }
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    if (process.server && import.meta.env.NITRO_PRERENDER) {
      return null;
    }
    return null;
  }
});

// Only throw 404 during client-side navigation or non-prerender server-side
if (!data.value && (!process.server || !import.meta.env.NITRO_PRERENDER)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Projekt nie został odnaleziony',
    fatal: true,
  });
}

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

    // If the project has specific OG image config, use it
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
  console.error('Error applying SEO to project page:', e);
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

// Normalize images to handle both formats
const normalizedImages = computed(() => {
  if (!data.value?.images) return [];

  return data.value.images.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: `${data.value.title} - Project image` };
    }
    return image;
  });
});

// Get slider images
const sliderImages = computed(() => {
  if (!data.value?.slider?.images) return [];
  return data.value.slider.images;
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
            <div class="text-6xl font-bold text-primary" v-scroll-anim:scale="{ delay: 0.3 }">
              {{ data.number }}
            </div>
            <div class="grid">
              <h1
                class="h3-style text-primary"
                v-scroll-anim:splitText="{ type: 'words', stagger: 0.05, delay: 0.4 }"
              >
                {{ data.title }}
              </h1>
              <div class="text-xl text-neutral-600" v-scroll-anim:fadeUp="{ delay: 0.5 }">
                {{ data.location }} | {{ data.year }}
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
        <div
          class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8"
          v-scroll-anim:fadeUp="{ delay: 0.7 }"
        >
          <!-- Image Slider -->
          <div class="grid">
            <div
              class="aspect-video overflow-hidden rounded-lg"
              v-scroll-anim:scale="{ delay: 0.8 }"
            >
              <ClientOnly>
                <swiper-container
                  ref="swiperRef"
                  :loop="true"
                  :pagination="true"
                  :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                  }"
                  class="w-full h-full"
                >
                  <!-- Cover image is always first -->
                  <swiper-slide v-if="data.cover" class="w-full h-full">
                    <nuxt-img
                      :src="data.cover.src"
                      :alt="data.cover.alt"
                      class="w-full h-full object-cover"
                      format="webp"
                    />
                  </swiper-slide>

                  <!-- Slider images -->
                  <swiper-slide
                    v-for="(image, index) in sliderImages"
                    :key="index"
                    class="w-full h-full"
                  >
                    <nuxt-img
                      :src="image.src"
                      :alt="image.alt"
                      class="w-full h-full object-cover"
                      format="webp"
                    />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>
          </div>

          <!-- Project Description -->
          <div class="grid" v-scroll-anim:fadeLeft="{ delay: 0.9 }">
            <article class="prose prose-xl max-w-none">
              <ContentRenderer
                v-if="data?.meta?.body"
                :value="{ body: data.meta.body }"
                :excerpt="false"
              />
            </article>
          </div>
        </div>
      </div>
    </div>
    <LayoutPreFooterContent />
    <LayoutFooterContent />
  </main>
</template>
