export const usePageSeo = (page: Ref<any>) => {
  const { $config } = useNuxtApp();
  const siteConfig = useSiteConfig();
  const route = useRoute();

  // Get site config from runtime config
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
    imageUrl: getAbsoluteUrl(siteConfig.image || '/og-social-default.jpg'),
    fallbackImage: {
      component: 'Custom',
      props: {
        title: siteConfig.name || 'Molki Design',
        description: siteConfig.description || 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: getAbsoluteUrl(siteConfig.image || '/og-social-default.jpg'),
      },
    },
  };

  // Validation function for meta content
  const validateSocialMeta = (content: string, fallback: string) => {
    const validated = content || fallback;
    return validated.length > 60 && validated.length < 300 ? validated : fallback;
  };

  // Enhanced image handling with prioritization
  const getSocialImage = () => {
    // Prioritize OG image from page metadata
    if (page.value?.ogImage?.cover) {
      return getAbsoluteUrl(page.value.ogImage.cover);
    }

    // Fallback to page cover if available
    if (page.value?.cover) {
      return getAbsoluteUrl(page.value.cover);
    }

    // Use default image as last resort
    return defaults.imageUrl;
  };

  // Get the current page URL
  const getCurrentPageUrl = () => {
    const pagePath = page.value?._path || route.path;
    return getAbsoluteUrl(pagePath);
  };

  // Handle undefined page case
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

    defineOgImage(defaults.fallbackImage);
    return;
  }

  // Determine title and description
  const pageTitle = page.value?.seo?.title || page.value?.title || defaults.title;
  const pageDescription =
    page.value?.seo?.description ||
    page.value?.excerpt ||
    page.value?.description ||
    defaults.description;

  // Get the proper OG image
  const ogImageUrl = getSocialImage();

  // Apply SEO Meta Tags - simplified for clarity
  useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogImage: ogImageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogUrl: getCurrentPageUrl(),
    ogLocale: 'pl',
    ogSiteName: defaults.title,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImageUrl,
    twitterSite: siteConfig.twitter,
    twitterCreator: siteConfig.twitter,
    fbAppId: siteConfig.facebookPage,
  });

  // OG Image Generation
  if (page.value?.ogImage) {
    // If ogImage has a component property, use it
    if (page.value.ogImage.component) {
      defineOgImage({
        component: page.value.ogImage.component,
        props: {
          ...page.value.ogImage.props,
          // Ensure cover is an absolute URL if provided
          cover: page.value.ogImage.props?.cover
            ? getAbsoluteUrl(page.value.ogImage.props.cover)
            : undefined,
        },
      });
    } else {
      // Default to Custom component with provided ogImage properties
      defineOgImage({
        component: 'Custom',
        props: {
          title: page.value.ogImage.title || pageTitle,
          description: page.value.ogImage.description || pageDescription,
          cover: page.value.ogImage.cover ? getAbsoluteUrl(page.value.ogImage.cover) : undefined,
        },
      });
    }
  } else if (page.value?.cover) {
    // Use page cover for OG image
    defineOgImage({
      component: 'Custom',
      props: {
        title: pageTitle,
        description: pageDescription,
        cover: getAbsoluteUrl(page.value.cover),
      },
    });
  } else {
    // Fallback to default OG image
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
        name: pageTitle,
        description: validateSocialMeta(pageDescription, defaults.description),
        image: ogImageUrl,
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
