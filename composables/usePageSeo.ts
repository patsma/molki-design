export const usePageSeo = (page: Ref<any>) => {
  // Get site config from runtime config
  const runtimeConfig = useRuntimeConfig();
  const siteConfig = useSiteConfig();

  // Default values from site config
  const defaults = {
    title: siteConfig.name || 'Molki Design',
    description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
    imageUrl: siteConfig.image || '/og-image.jpg',
    fallbackImage: {
      title: siteConfig.name || 'Molki Design',
      description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
      cover: siteConfig.image || '/og-image.jpg',
    },
  };

  if (!page?.value) {
    // Handle undefined page case with defaults
    useSeoMeta({
      title: defaults.title,
      ogTitle: defaults.title,
      description: defaults.description,
      ogDescription: defaults.description,
      ogImage: defaults.imageUrl,
      twitterCard: 'summary_large_image',
      twitterTitle: defaults.title,
      twitterDescription: defaults.description,
      twitterImage: defaults.imageUrl,
    });

    defineOgImage(defaults.fallbackImage);
    return;
  }

  // SEO Meta Tags
  useSeoMeta({
    title: page.value?.seo?.title || page.value?.title || defaults.title,
    ogTitle: page.value?.seo?.title || page.value?.title || defaults.title,
    description:
      page.value?.seo?.description ||
      page.value?.excerpt ||
      page.value?.description ||
      defaults.description,
    ogDescription:
      page.value?.seo?.description ||
      page.value?.excerpt ||
      page.value?.description ||
      defaults.description,
    ogImage: page.value?.cover || defaults.imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: page.value?.seo?.title || page.value?.title || defaults.title,
    twitterDescription:
      page.value?.seo?.description ||
      page.value?.excerpt ||
      page.value?.description ||
      defaults.description,
    twitterImage: page.value?.cover || defaults.imageUrl,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    defineOgImage(page.value.ogImage);
  } else if (page.value?.cover) {
    defineOgImage({
      title: page.value?.title || defaults.title,
      description: page.value?.excerpt || page.value?.description || defaults.description,
      cover: page.value.cover,
    });
  } else {
    defineOgImage(defaults.fallbackImage);
  }
};
