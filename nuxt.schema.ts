import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    navigation: group({
      title: 'Navigation',
      description: 'Website navigation configuration',
      icon: 'i-mdi-menu',
      fields: {
        main: group({
          title: 'Main Navigation',
          description: 'Primary website menu structure',
          icon: 'i-mdi-menu',
          fields: {
            items: field({
              type: 'array',
              title: 'Menu Items',
              description: 'Navigation hierarchy',
              icon: 'i-mdi-link-variant',
              default: [],
              arrayItems: {
                type: 'object',
                fields: {
                  label: field({ type: 'string', title: 'Label' }),
                  link: field({ type: 'string', title: 'Link' }),
                  children: field({
                    type: 'array',
                    title: 'Submenu Items',
                    arrayItems: {
                      type: 'object',
                      fields: {
                        label: field({ type: 'string', title: 'Label' }),
                        link: field({ type: 'string', title: 'Link' }),
                      },
                    },
                  }),
                },
              },
            }),
          },
        }),
      },
    }),
    contactInfo: group({
      title: 'Contact Information',
      description: 'Company contact details',
      icon: 'i-mdi-phone',
      fields: {
        email: field({
          type: 'string',
          title: 'Email Address',
          description: 'Primary contact email',
          icon: 'i-mdi-email',
          default: 'kontakt@molki.pl',
        }),
        phone: field({
          type: 'string',
          title: 'Phone Number',
          description: 'Main phone number',
          icon: 'i-mdi-phone',
          default: '+48 572 323 207',
        }),
        companyInfo: field({
          type: 'string',
          title: 'Company Information',
          description: 'Company details like name, NIP, and registered address',
          icon: 'i-mdi-office-building-marker',
          multiline: true,
          default: 'Molki Sp. z o.o.\nNIP: 957-112-91-57\nul. Heweliusza 11/811\n80-890 Gdańsk',
        }),
        officeInfo: field({
          type: 'string',
          title: 'Office Address',
          description: 'Physical office location details',
          icon: 'i-mdi-office-building',
          multiline: true,
          default: 'ul. Mostowa 1/4 pokój 2\n80-778 Gdańsk',
        }),
        socialLinks: field({
          type: 'object',
          title: 'Social Media Links',
          description: 'Links to company social media profiles',
          icon: 'i-mdi-link-variant',
          fields: {
            instagram: field({
              type: 'string',
              title: 'Instagram',
              description: 'Instagram profile URL',
              icon: 'i-mdi-instagram',
            }),
            facebook: field({
              type: 'string',
              title: 'Facebook',
              description: 'Facebook page URL',
              icon: 'i-mdi-facebook',
            }),
            linkedin: field({
              type: 'string',
              title: 'LinkedIn',
              description: 'LinkedIn profile URL',
              icon: 'i-mdi-linkedin',
            }),
          },
        }),
      },
    }),
    companies: group({
      title: 'Company Links',
      description: 'Related company information and links',
      icon: 'i-mdi-domain',
      fields: {
        wlasciwyKurs: field({
          type: 'object',
          title: 'Właściwy Kurs',
          description: 'Właściwy Kurs company details',
          icon: 'i-mdi-school',
          fields: {
            url: field({
              type: 'string',
              title: 'Website URL',
              description: 'Company website link',
              default: 'https://wlasciwykurs.com/',
            }),
            title: field({
              type: 'string',
              title: 'Company Name',
              description: 'Display name of the company',
              default: 'WŁAŚCIWY KURS',
            }),
            subtitle: field({
              type: 'string',
              title: 'Company Subtitle',
              description: 'Brief description of company services',
              default: 'Kursy, szkolenia, poradniki, wzory dokumentów.',
            }),
            description: field({
              type: 'string',
              title: 'Company Description',
              description: 'Detailed company description',
              multiline: true,
              default:
                'Zapraszamy po więcej wiedzy, przydatnych informacji oraz gotowych rozwiązań dla wszystkich zainteresowanych inwestycjami w nieruchomości, obsługą wynajmu oraz projektowaniem wnętrz, a także wymianą doświadczenia i budowaniem sieci kontaktów wśród ludzi z branży.',
            }),
          },
        }),
        molkiInvest: field({
          type: 'object',
          title: 'Molki Invest',
          description: 'Molki Invest company details',
          icon: 'i-mdi-office-building',
          fields: {
            url: field({
              type: 'string',
              title: 'Website URL',
              description: 'Company website link',
              default: 'https://molkiinvest.pl/',
            }),
            title: field({
              type: 'string',
              title: 'Company Name',
              description: 'Display name of the company',
              default: 'MOLKI INVEST',
            }),
            subtitle: field({
              type: 'string',
              title: 'Company Subtitle',
              description: 'Brief description of company services',
              default: 'Nieruchomości inwestycyjne przygotowane do efektywnego wynajmu.',
            }),
            description: field({
              type: 'string',
              title: 'Company Description',
              description: 'Detailed company description',
              multiline: true,
              default:
                'Inwestycje w nieruchomości dla Inwestorów Pasywnych. Pomagamy chronić i pomnażać kapitał oraz uzyskiwać dochód pasywny poprzez gotowce inwestycyjne przygotowane do efektywnego wynajmu. Zarządzamy najmem długoterminowym, krótkoterminowym oraz kwaterami pracowniczymi.',
            }),
          },
        }),
      },
    }),
    studio: group({
      title: 'Studio',
      description: 'Studio configuration',
      icon: 'i-mdi-cog',
      fields: {
        title: field({
          type: 'string',
          title: 'Site Title',
          description: 'Title displayed in browser tab and headers',
          icon: 'i-mdi-format-title',
          default: 'Molki Design',
        }),
      },
    }),
  },
});
