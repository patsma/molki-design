import { googleAnalyticsService } from '~/utils/analytics/googleAnalytics';
import { facebookPixelService } from '~/utils/analytics/facebookPixel';
import { hotjarService } from '~/utils/analytics/hotjar';
import { clarityService } from '~/utils/analytics/clarity';
import type { TrackingService } from '~/types/analytics';

export default defineNuxtPlugin(() => {
  const { cookiesEnabledIds, isConsentGiven } = useCookieControl();

  // Map services to their cookie consent categories
  const services = [
    { name: 'Google Analytics', service: googleAnalyticsService, cookieId: 'ana' },
    // { name: 'Facebook Pixel', service: facebookPixelService, cookieId: 'mkt' },
    // { name: 'Hotjar', service: hotjarService, cookieId: 'ana' },
    // { name: 'Clarity', service: clarityService, cookieId: 'ana' },
  ];

  // Initialize or cleanup services based on cookie consent
  const updateServices = (enabledCookies: string[] | null | undefined) => {
    if (!enabledCookies) return;

    // Process each service
    services.forEach(({ name, service, cookieId }) => {
      try {
        if (enabledCookies.includes(cookieId)) {
          console.log(`Initializing ${name}`);
          service.init();
        } else {
          console.log(`Cleaning up ${name}`);
          service.cleanup();
        }
      } catch (error) {
        console.error(`Error with ${name}:`, error);
      }
    });
  };

  // Watch for changes in cookie consent
  watch(cookiesEnabledIds, updateServices, { immediate: true });

  // Handle initial state
  if (process.client && isConsentGiven && cookiesEnabledIds.value) {
    updateServices(cookiesEnabledIds.value);
  }

  // Provide a simplified analytics API
  return {
    provide: {
      analytics: {
        // Track an event across all enabled services
        trackEvent: (action: string, category?: string, properties?: Record<string, any>) => {
          const enabledIds = cookiesEnabledIds.value || [];

          // Google Analytics (GA4)
          if (enabledIds.includes('ana') && window.gtag) {
            window.gtag('event', action, {
              event_category: category,
              ...properties,
            });
          }

          // Facebook Pixel
          if (enabledIds.includes('mkt') && window.fbq) {
            window.fbq('trackCustom', action, {
              category,
              ...properties,
            });
          }

          // Add other event tracking as needed
        },

        // Page view tracking
        trackPageView: (path?: string) => {
          const enabledIds = cookiesEnabledIds.value || [];
          const currentPath = path || window.location.pathname;

          // Google Analytics
          if (enabledIds.includes('ana') && window.gtag) {
            window.gtag('config', googleAnalyticsService.measurementId || '', {
              page_path: currentPath,
            });
          }

          // Facebook
          if (enabledIds.includes('mkt') && window.fbq) {
            window.fbq('track', 'PageView');
          }
        },
      },
    },
  };
});
