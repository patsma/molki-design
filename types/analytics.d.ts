// Global window extensions for various tracking services
declare global {
  interface Window {
    // Google Analytics
    dataLayer: any[];
    gtag: (...args: any[]) => void;

    // Facebook Pixel
    fbq: (...args: any[]) => void;

    // Hotjar
    hj: (...args: any[]) => void;

    // Microsoft Clarity (alternative to Hotjar)
    clarity: (...args: any[]) => void;
  }
}

// Analytics Service Configuration Types
export interface AnalyticsConfig {
  googleAnalytics?: {
    measurementId: string;
  };
  facebookPixel?: {
    pixelId: string;
  };
  hotjar?: {
    hjid: number;
    hjsv: number;
  };
  clarity?: {
    projectId: string;
  };
}

export interface TrackingService {
  init: () => void;
  cleanup: () => void;
}
