export const usePageSeo = (page: Ref<any>) => {
  // Get site config from runtime config
  const runtimeConfig = useRuntimeConfig();
  const siteConfig = useSiteConfig();
  const config = useRuntimeConfig();
  const baseUrl = config.public.siteUrl || 'https://molki-design-2025.netlify.app';

  // Helper function to ensure URL is absolute
  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Default values from site config
  const defaults = {
    title: siteConfig.name || 'Molki Design',
    description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
    imageUrl: getAbsoluteUrl(siteConfig.image || '/og-image.jpg'),
    fallbackImage: {
      title: siteConfig.name || 'Molki Design',
      description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
      cover: getAbsoluteUrl(siteConfig.image || '/og-image.jpg'),
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
      ogImageWidth: 1200,
      ogImageHeight: 600,
      ogImageType: 'image/png',
      ogUrl: baseUrl,
      ogLocale: 'pl',
      ogSiteName: defaults.title,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: defaults.title,
      twitterDescription: defaults.description,
      twitterImage: defaults.imageUrl,
    });

    defineOgImage(defaults.fallbackImage);
    return;
  }

  // Get absolute URL for page cover
  const coverImage = page.value?.cover ? getAbsoluteUrl(page.value.cover) : defaults.imageUrl;

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
    ogImage: coverImage,
    ogImageWidth: 1200,
    ogImageHeight: 600,
    ogImageType: 'image/png',
    ogUrl: getAbsoluteUrl(page.value?._path || ''),
    ogLocale: 'pl',
    ogSiteName: defaults.title,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: page.value?.seo?.title || page.value?.title || defaults.title,
    twitterDescription:
      page.value?.seo?.description ||
      page.value?.excerpt ||
      page.value?.description ||
      defaults.description,
    twitterImage: coverImage,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    defineOgImage({
      ...page.value.ogImage,
      cover: page.value.ogImage.cover ? getAbsoluteUrl(page.value.ogImage.cover) : undefined,
    });
  } else if (page.value?.cover) {
    defineOgImage({
      title: page.value?.title || defaults.title,
      description: page.value?.excerpt || page.value?.description || defaults.description,
      cover: coverImage,
    });
  } else {
    defineOgImage(defaults.fallbackImage);
  }
};
