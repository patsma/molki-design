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
          link: '/nasze-realizacje',
        },
        {
          label: 'Kontakt',
          link: '/kontakt',
        },
      ],
    },
  },
  contactInfo: {
    email: 'kontakt@molki.pl',
    phone: '+48 572 323 207',
    address: 'ul. Heweliusza 11/811, 80-890 Gdańsk',
    socialLinks: {
      instagram: 'https://instagram.com/molki.design',
      facebook: 'https://facebook.com/molki.design',
      linkedin: '',
      pinterest: '',
    },
    locations: {
      city: 'Gdańsk',
      fullAddress: 'ul. Heweliusza 11/811\n80-890 Gdańsk',
      phone: '+48 572 323 207',
      email: 'kontakt@molki.pl',
      openingHours: 'Pon. - Pt.: 9:00 - 17:00',
    },
    showMap: true,
    preferredContact: 'Email',
  },
  studio: {
    title: 'Molki Design',
  },
  testMenu: {
    links: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' },
    ],
  },
});
