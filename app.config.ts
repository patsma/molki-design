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
          label: 'Projekt Wnętrza',
          link: '/projekt-wnetrza',
        },
        {
          label: 'Remont Pod Klucz',
          link: '/remont-pod-klucz',
        },
        {
          label: 'Dla Biznesu',
          link: '/dla-biznesu',
        },
        {
          label: 'Blog',
          link: '/blog',
        },
        {
          label: 'Kontakt',
          link: '/kontakt',
        },
        {
          label: 'Cenniki',
          link: '/cenniki',
          children: [
            {
              label: 'Cennik Remontów pod Klucz',
              link: '/cenniki/remonty-pod-klucz',
            },
            {
              label: 'Cennik Projektowania Wnętrz',
              link: '/cenniki/projektowanie-wnetrz',
            },
          ],
        },
        {
          label: 'Realizacje',
          link: '/realizacje',
          children: [
            {
              label: 'Realizacje Projektów Wnętrz',
              link: '/realizacje/projekty-wnetrz',
            },
            {
              label: 'Projekty i Remonty dla Biznesu',
              link: '/realizacje/dla-biznesu',
            },
          ],
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
