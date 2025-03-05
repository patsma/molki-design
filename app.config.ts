export default defineAppConfig({
  navigation: {
    main: {
      items: [
        {
          label: 'Usługi',
          link: '#',
          children: [
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
              label: 'Isolation',
              link: '/isolation',
            },
            {
              label: 'Todo',
              link: '/todo',
            },
          ],
        },
        {
          label: 'Cenniki',
          link: '/cenniki',
          children: [
            {
              label: 'Projektowanie Wnętrz',
              link: '/cenniki/projektowanie-wnetrz',
            },
          ],
        },
        {
          label: 'Realizacje',
          link: '/nasze-realizacje',
        },
        {
          label: 'O nas',
          link: '/o-nas',
        },
        {
          label: 'Blog',
          link: '/blog',
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
