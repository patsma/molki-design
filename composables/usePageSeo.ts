export const usePageSeo = (page: Ref<any>) => {
  const { $config } = useNuxtApp();
  const siteConfig = useSiteConfig();
  const route = useRoute();

  // Get site config from runtime config
  const runtimeConfig = useRuntimeConfig();
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
      component: 'Custom',
      props: {
        title: siteConfig.name || 'Molki Design',
        description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: getAbsoluteUrl(siteConfig.image || '/og-image.jpg'),
      },
    },
  };

  // New: Social media validation function
  const validateSocialMeta = (content: string, fallback: string) => {
    const validated = content || fallback;
    return validated.length > 60 && validated.length < 300 ? validated : fallback;
  };

  // Updated: Enhanced image handling
  const getSocialImage = () => {
    if (page.value?.ogImage?.cover) {
      return getAbsoluteUrl(page.value.ogImage.cover);
    }
    if (page.value?.cover) {
      return getAbsoluteUrl(page.value.cover);
    }
    return getAbsoluteUrl('/og-social-default.jpg'); // Ensure this exists
  };

  // Get the current page URL
  const getCurrentPageUrl = () => {
    // First try to get the path from the page data
    const pagePath = page.value?._path || route.path;
    // Ensure we have a valid URL by combining with the base URL
    return getAbsoluteUrl(pagePath);
  };

  if (!page?.value) {
    // Handle undefined page case with defaults
    useSeoMeta({
      title: defaults.title,
      ogTitle: defaults.title,
      description: defaults.description,
      ogDescription: defaults.description,
      ogImage: {
        url: getSocialImage(),
        width: 1200,
        height: 630, // Standard social media ratio
        type: 'image/jpeg',
        alt: defaults.title,
      },
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageType: 'image/jpeg',
      ogUrl: baseUrl,
      ogLocale: 'pl',
      ogSiteName: defaults.title,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: defaults.title,
      twitterDescription: defaults.description,
      twitterImage: getSocialImage(),
      twitterSite: siteConfig.twitter,
      twitterCreator: siteConfig.twitter,
      fbAppId: siteConfig.facebookPage,
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
    ogImage: {
      url: getSocialImage(),
      width: 1200,
      height: 630, // Standard social media ratio
      type: 'image/jpeg',
      alt: page.value?.title || siteConfig.name,
    },
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogUrl: getCurrentPageUrl(),
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
    twitterImage: getSocialImage(),
    twitterSite: siteConfig.twitter,
    twitterCreator: siteConfig.twitter,
    fbAppId: siteConfig.facebookPage,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    defineOgImage({
      component: 'Custom',
      props: {
        ...page.value.ogImage,
        cover: page.value.ogImage.cover ? getAbsoluteUrl(page.value.ogImage.cover) : undefined,
      },
    });
  } else if (page.value?.cover) {
    defineOgImage({
      component: 'Custom',
      props: {
        title: page.value?.title || defaults.title,
        description: page.value?.excerpt || page.value?.description || defaults.description,
        cover: coverImage,
      },
    });
  } else {
    defineOgImage(defaults.fallbackImage);
  }

  // Schema.org structured data
  if (useSchemaOrg) {
    useSchemaOrg([
      {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        name: page.value?.title,
        description: validateSocialMeta(page.value?.description, siteConfig.description),
        image: getSocialImage(),
        datePublished: page.value?.createdAt,
        dateModified: page.value?.updatedAt,
        author: [
          {
            '@type': 'Person',
            name: 'Wioletta Retko',
            jobTitle: 'Główny Projektant',
            url: `${siteConfig.url}/o-nas`,
          },
        ],
      },
    ]);
  }
};
