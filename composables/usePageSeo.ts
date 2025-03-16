export const usePageSeo = (page: Ref<any>) => {
  const { $config } = useNuxtApp();

  // Default values from site config
  const defaults = {
    title: $config.public.site.name || 'Molki',
    description: $config.public.site.description || 'Molki - Nowoczesne rozwiązania budowlane',
    imageUrl: $config.public.site.url
      ? `${$config.public.site.url}/__og-image__/image/og.png`
      : '/og-image.png',
    fallbackImage: {
      title: $config.public.site.name || 'Molki',
      description: $config.public.site.description || 'Molki - Nowoczesne rozwiązania budowlane',
      cover: '/og-image.png',
    },
  };

  // SEO Meta Tags
  useSeoMeta({
    title: page.value?.seo?.title || page.value?.title || defaults.title,
    ogTitle: page.value?.seo?.title || page.value?.title || defaults.title,
    description: page.value?.seo?.description || page.value?.excerpt || defaults.description,
    ogDescription: page.value?.seo?.description || page.value?.excerpt || defaults.description,
    ogImage: {
      url: page.value?.ogImage ? undefined : page.value?.cover || defaults.imageUrl,
      alt: page.value?.seo?.title || page.value?.title || defaults.title,
      width: 1200,
      height: 630,
      type: 'image/png',
    },
    twitterCard: 'summary_large_image',
    twitterTitle: page.value?.seo?.title || page.value?.title || defaults.title,
    twitterDescription: page.value?.seo?.description || page.value?.excerpt || defaults.description,
    twitterImage: page.value?.ogImage?.cover || page.value?.cover || defaults.imageUrl,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    defineOgImage(page.value.ogImage);
  } else if (page.value?.cover) {
    defineOgImage({
      ...defaults.fallbackImage,
      cover: page.value.cover,
      title: page.value?.title || defaults.title,
      description: page.value?.excerpt || defaults.description,
    });
  } else {
    defineOgImage(defaults.fallbackImage);
  }
};
