declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      hubspotPortalId: string;
      isDev: boolean;
    };
  }
}
