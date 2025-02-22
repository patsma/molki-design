declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region?: string;
          target: string | HTMLElement;
        }) => void;
      };
    };
  }
}

export {};
