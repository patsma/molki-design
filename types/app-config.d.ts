declare module '@nuxt/schema' {
  interface AppConfigInput {
    navigation?: {
      main: {
        items: Array<{
          label: string;
          link: string;
          children?: Array<{
            label: string;
            link: string;
          }>;
        }>;
      };
    };
    contactInfo?: {
      email: string;
      phone: string;
      address: string;
      socialLinks: {
        instagram: string;
        facebook: string;
        linkedin: string;
        pinterest: string;
      };
      locations: {
        city: string;
        fullAddress: string;
        phone: string;
        email: string;
        openingHours: string;
      };
      showMap: boolean;
      preferredContact: string;
    };
    studio?: {
      title: string;
    };
  }
}
