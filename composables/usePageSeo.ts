export const usePageSeo = (page: Ref<any>) => {
  const { $config } = useNuxtApp();
  const siteConfig = useSiteConfig();
  const route = useRoute();

  // Simplify URL configuration - use siteConfig.url as the primary source
  const baseUrl = siteConfig.url || 'https://molki-design-2025.netlify.app';

  // Helper function to ensure URL is absolute
  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Default values from site config
  const defaults = {
    title: siteConfig.name || 'Molki Design',
    description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
    imageUrl: getAbsoluteUrl('/og-social-default.jpg'), // Use a consistent default image
  };

  // New: Social media validation function
  const validateSocialMeta = (content: string, fallback: string) => {
    const validated = content || fallback;
    return validated.length > 60 && validated.length < 300 ? validated : fallback;
  };

  // Simplified image handling for social media platforms
  const getSocialImage = () => {
    // Prioritize specific OG images for social sharing
    if (page.value?.ogImage?.cover) {
      return getAbsoluteUrl(page.value.ogImage.cover);
    }
    if (page.value?.cover) {
      return getAbsoluteUrl(page.value.cover);
    }
    // Use default image
    return getAbsoluteUrl('/og-social-default.jpg');
  };

  // Get the current page URL - ensure it's always absolute
  const getCurrentPageUrl = () => {
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

  // Get page metadata with clear fallbacks
  const pageTitle = page.value?.seo?.title || page.value?.title || defaults.title;
  const pageDescription =
    page.value?.seo?.description ||
    page.value?.excerpt ||
    page.value?.description ||
    defaults.description;
  const pageImage = getSocialImage();
  const pageUrl = getCurrentPageUrl();

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
