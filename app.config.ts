export default defineAppConfig({
  // Menu configuration
  menu: {
    items: [
      {
        label: 'Strona główna',
        link: '/',
      },
      {
        label: 'O nas',
        link: '/o-nas',
      },
      {
        label: 'Usługi',
        link: '/uslugi',
        children: [
          {
            label: 'Projektowanie wnętrz',
            link: '/uslugi/projektowanie-wnetrz',
          },
          {
            label: 'Wizualizacje 3D',
            link: '/uslugi/wizualizacje-3d',
          },
          {
            label: 'Nadzór projektowy',
            link: '/uslugi/nadzor-projektowy',
          },
        ],
      },
      {
        label: 'Realizacje',
        link: '/realizacje',
      },
      {
        label: 'Kontakt',
        link: '/kontakt',
      },
    ],
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
