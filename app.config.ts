export default defineAppConfig({
  navigation: {
    main: {
      items: [
        {
          label: 'O nas',
          link: '/o-nas',
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
