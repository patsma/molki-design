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
          default: 'contact@example.com',
        }),
        phone: field({
          type: 'string',
          title: 'Phone Number',
          description: 'Main phone number',
          icon: 'i-mdi-phone',
          default: '+48 123 456 789',
        }),
        address: field({
          type: 'string',
          title: 'Company Address',
          description: 'Physical location',
          icon: 'i-mdi-map-marker',
          default: 'Warsaw, Poland',
          multiline: true,
        }),
        // Testing array of simple items
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
            pinterest: field({
              type: 'string',
              title: 'Pinterest',
              description: 'Pinterest profile URL',
              icon: 'i-mdi-pinterest',
            }),
          },
        }),
        // Testing array of objects with nested arrays (like menu items with children)
        locations: field({
          type: 'object',
          title: 'Main Office',
          description: 'Main office location details',
          icon: 'i-mdi-office-building',
          fields: {
            city: field({
              type: 'string',
              title: 'City',
              description: 'City name',
            }),
            fullAddress: field({
              type: 'string',
              title: 'Full Address',
              description: 'Complete address of the office',
              multiline: true,
            }),
            phone: field({
              type: 'string',
              title: 'Office Phone',
              description: 'Office phone number',
            }),
            email: field({
              type: 'string',
              title: 'Office Email',
              description: 'Office email address',
            }),
            openingHours: field({
              type: 'string',
              title: 'Opening Hours',
              description: 'Office opening hours',
              multiline: true,
            }),
          },
        }),
        // Testing boolean fields
        showMap: field({
          type: 'boolean',
          title: 'Show Map',
          description: 'Display a map on the contact page',
          icon: 'i-mdi-map',
          default: true,
        }),
        // Testing select field with options
        preferredContact: field({
          type: 'string',
          title: 'Preferred Contact Method',
          description: 'How clients should contact you primarily',
          icon: 'i-mdi-contact-mail',
          options: ['Email', 'Phone', 'Form', 'In Person'],
          default: 'Email',
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
