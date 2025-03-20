export default defineAppConfig({
  navigation: {
    main: {
      items: [
        {
          label: 'Nasze Usługi',
          link: '/projekt-wnetrza',
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
              label: 'Wewnętrzne Inwestycje',
              link: '/wewnetrzne-inwestycje',
            },

            {
              label: 'Todo',
              link: '/todo',
            },
          ],
        },
        {
          label: 'O nas',
          link: '/o-nas',
        },
        {
          label: 'Realizacje',
          link: '/realizacje',
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
      instagram: 'https://www.instagram.com/molki_design/',
      facebook: 'https://www.facebook.com/molkidesign',
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
});
