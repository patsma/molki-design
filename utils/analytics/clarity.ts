import type { TrackingService } from '~/types/analytics';
import { analyticsConfig } from '~/config/analytics.config';

export const clarityService: TrackingService = {
  init: () => {
    const projectId = analyticsConfig.clarity?.projectId;
    if (!projectId) return;

    // Initialize Microsoft Clarity
    (function (c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', projectId);
  },

  cleanup: () => {
    // Remove Clarity script
    const scripts = document.querySelectorAll('script[src*="clarity.ms"]');
    scripts.forEach((script) => script.remove());

    // Remove Clarity function
    delete window.clarity;
  },
};
