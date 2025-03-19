import { googleAnalyticsService } from '~/utils/analytics/googleAnalytics';
import { facebookPixelService } from '~/utils/analytics/facebookPixel';
import { hotjarService } from '~/utils/analytics/hotjar';
import { clarityService } from '~/utils/analytics/clarity';
import type { TrackingService } from '~/types/analytics';

export default defineNuxtPlugin(() => {
  const { cookiesEnabledIds, isConsentGiven } = useCookieControl();

  // Map of services to their respective cookie IDs
  const serviceMap: Record<string, { service: TrackingService; cookieId: string }> = {
    googleAnalytics: { service: googleAnalyticsService, cookieId: 'ana' },
    facebookPixel: { service: facebookPixelService, cookieId: 'mkt' },
    hotjar: { service: hotjarService, cookieId: 'ana' },
    clarity: { service: clarityService, cookieId: 'ana' },
  };

  // Function to manage services based on cookie consent
  const manageServices = (enabledCookies: string[] | null | undefined) => {
    if (!enabledCookies) return;

    // Initialize or cleanup each service based on cookie consent
    Object.entries(serviceMap).forEach(([name, { service, cookieId }]) => {
      if (enabledCookies.includes(cookieId)) {
        service.init();
      } else {
        service.cleanup();
      }
    });
  };

  // Watch for changes in cookie consent
  watch(
    cookiesEnabledIds,
    (enabledCookies) => {
      manageServices(enabledCookies);
    },
    { immediate: true }
  );

  // Handle initial state when consent is already given
  if (isConsentGiven && cookiesEnabledIds.value) {
    manageServices(cookiesEnabledIds.value);
  }

  // Provide tracking utilities to the rest of the application
  return {
    provide: {
      analytics: {
        trackEvent: (category: string, action: string, label?: string, value?: number) => {
          // Google Analytics
          if (cookiesEnabledIds.value?.includes('ana') && window.gtag) {
            window.gtag('event', action, {
              event_category: category,
              event_label: label,
              value: value,
            });
          }

          // Facebook Pixel
          if (cookiesEnabledIds.value?.includes('mkt') && window.fbq) {
            window.fbq('trackCustom', action, {
              category,
              label,
              value,
            });
          }
        },
      },
    },
  };
});
