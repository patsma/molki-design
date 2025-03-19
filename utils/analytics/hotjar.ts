import type { TrackingService } from '~/types/analytics';
import { analyticsConfig } from '~/config/analytics.config';

export const hotjarService: TrackingService = {
  init: () => {
    const hjid = analyticsConfig.hotjar?.hjid;
    const hjsv = analyticsConfig.hotjar?.hjsv;
    if (!hjid || !hjsv) return;

    // Initialize Hotjar
    (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid, hjsv };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  },

  cleanup: () => {
    // Remove Hotjar script
    const scripts = document.querySelectorAll('script[src*="hotjar.com"]');
    scripts.forEach((script) => script.remove());

    // Remove Hotjar function
    delete window.hj;
    delete (window as any)._hjSettings;
  },
};
