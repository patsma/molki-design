import type { TrackingService } from '~/types/analytics';
import { analyticsConfig } from '~/config/analytics.config';

// Create the service as an object with both TrackingService interface and custom properties
const googleAnalyticsService = {
  // Expose measurement ID for page view tracking
  measurementId: analyticsConfig.googleAnalytics?.measurementId,

  init: () => {
    const gtagId = analyticsConfig.googleAnalytics?.measurementId;
    if (!gtagId) return;

    // Remove any existing scripts
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
    existingScripts.forEach((script) => script.remove());

    // Create and add the GA script
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gtagId);

    // Add to window
    window.gtag = gtag;
  },

  cleanup: () => {
    // Remove scripts
    const scripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
    scripts.forEach((script) => script.remove());

    // Clear dataLayer
    if (window.dataLayer) {
      window.dataLayer = [];
    }

    // Remove gtag function
    delete window.gtag;
  },
};

export { googleAnalyticsService };
