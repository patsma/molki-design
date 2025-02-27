export default defineAppConfig({
  navigation: {
    main: {
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
  },
  studio: {
    title: 'Molki Design',
  },
});
