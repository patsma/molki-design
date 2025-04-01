import type { AnalyticsConfig } from '~/types/analytics';

export const analyticsConfig: AnalyticsConfig = {
  googleAnalytics: {
    measurementId: 'G-242W7FGX6K', // Your existing GA4 ID
  },
  facebookPixel: {
    pixelId: '404666508931450', // Facebook Meta Pixel ID
  },
  hotjar: {
    hjid: 3579246, // Replace with your Hotjar ID
    hjsv: 6,
  },
  clarity: {
    projectId: 'abc123xyz', // Replace with your Microsoft Clarity Project ID
  },
};
