export const usePageSeo = (page: Ref<any>) => {
  const { $config } = useNuxtApp();
  const siteConfig = useSiteConfig();
  const route = useRoute();
  const config = useRuntimeConfig();

  // Get the base URL from site config, with fallback
  const baseUrl =
    siteConfig.url || config.public.siteUrl || 'https://molki-design-2025.netlify.app';

  // Helper function to ensure URL is absolute
  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';

    // If already absolute, return as is
    if (url.startsWith('http')) return url;

    // Ensure URL starts with a slash
    const path = url.startsWith('/') ? url : `/${url}`;

    // Combine with base URL
    return `${baseUrl}${path}`;
  };

  // Default values from site config with fallbacks
  const defaults = {
    title: siteConfig.name || 'Molki Design',
    description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
    imageUrl: getAbsoluteUrl(siteConfig.image || '/og-social-default.jpg'),
  };

  // Social media validation function - ensure content is the right length
  const validateSocialMeta = (content: string, fallback: string) => {
    const validated = content || fallback;
    return validated.length > 60 && validated.length < 300 ? validated : fallback;
  };

  // Get the best available image for social sharing
  const getSocialImage = () => {
    // Priority order for images:
    // 1. Explicit OG image from page data
    if (page.value?.ogImage?.cover) {
      return getAbsoluteUrl(page.value.ogImage.cover);
    }

    // 2. Cover image from page data
    if (page.value?.cover) {
      return getAbsoluteUrl(page.value.cover);
    }

    // 3. Default image
    return getAbsoluteUrl('/og-social-default.jpg');
  };

  // Get the current page URL - ensure it's always absolute
  const getCurrentPageUrl = () => {
    // First try page._path, then route.path
    const pagePath = page.value?._path || route.path;
    return getAbsoluteUrl(pagePath);
  };

  // If page is undefined, use defaults
  if (!page?.value) {
    useSeoMeta({
      title: defaults.title,
      ogTitle: defaults.title,
      description: defaults.description,
      ogDescription: defaults.description,
      ogImage: defaults.imageUrl,
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
      twitterImage: defaults.imageUrl,
      twitterSite: siteConfig.twitter,
      twitterCreator: siteConfig.twitter,
      fbAppId: siteConfig.facebookPage,
    });

    defineOgImage({
      component: 'Custom',
      props: {
        title: defaults.title,
        description: defaults.description,
        cover: defaults.imageUrl,
      },
    });
    return;
  }

  // Extract page metadata with clear fallbacks
  const pageTitle = page.value?.seo?.title || page.value?.title || defaults.title;
  const pageDescription =
    page.value?.seo?.description ||
    page.value?.excerpt ||
    page.value?.description ||
    defaults.description;
  const pageImage = getSocialImage();
  const pageUrl = getCurrentPageUrl();

  // Log SEO information in development mode
  if (config.public.isDev) {
    console.log('📝 SEO Meta for', route.path);
    console.log('Title:', pageTitle);
    console.log('Description:', pageDescription);
    console.log('Image:', pageImage);
    console.log('URL:', pageUrl);
  }

  // Apply SEO meta tags
  useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogImage: pageImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogUrl: pageUrl,
    ogLocale: 'pl',
    ogSiteName: defaults.title,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: pageImage,
    twitterSite: siteConfig.twitter,
    twitterCreator: siteConfig.twitter,
    fbAppId: siteConfig.facebookPage,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    defineOgImage({
      component: 'Custom',
      props: {
        title: page.value.ogImage.title || pageTitle,
        description: page.value.ogImage.description || pageDescription,
        cover: page.value.ogImage.cover ? getAbsoluteUrl(page.value.ogImage.cover) : pageImage,
      },
    });
  } else if (page.value?.cover) {
    defineOgImage({
      component: 'Custom',
      props: {
        title: pageTitle,
        description: pageDescription,
        cover: getAbsoluteUrl(page.value.cover),
      },
    });
  } else {
    defineOgImage({
      component: 'Custom',
      props: {
        title: pageTitle,
        description: pageDescription,
        cover: defaults.imageUrl,
      },
    });
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
        name: pageTitle,
        description: validateSocialMeta(pageDescription, siteConfig.description),
        image: pageImage,
        url: pageUrl,
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
