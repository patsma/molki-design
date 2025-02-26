export default defineAppConfig({
  // Menu configuration
  menu: {
    items: [],
  },

  // Nuxt Content configuration
  studio: {
    title: 'Molki Design',
    logo: {
      light: '/img/logo.svg',
      dark: '/img/logo-dark.svg',
    },
    theme: {
      colors: {
        primary: '#000000',
      },
    },
    navigation: {
      enabled: true,
    },
    editor: {
      actions: {
        save: {
          enabled: true,
          text: 'Save changes',
        },
        preview: {
          enabled: true,
          text: 'Preview',
        },
      },
    },
  },
});
