import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    navigation: group({
      title: 'Navigation',
      description: 'Configure website navigation',
      icon: 'i-mdi-menu',
      fields: {
        menu: group({
          title: 'Menu Configuration',
          description: 'Settings for the main menu',
          fields: {
            items: field({
              type: 'array',
              title: 'Menu Items',
              description: 'Main navigation links',
              default: [],
              arrayItems: {
                type: 'object',
                fields: {
                  label: field({
                    type: 'string',
                    title: 'Menu Label',
                    description: 'Display text for the menu item',
                    default: 'New Item',
                  }),
                  link: field({
                    type: 'string',
                    title: 'Menu Link',
                    description: 'URL path for the menu item',
                    default: '/',
                  }),
                  children: field({
                    type: 'array',
                    title: 'Submenu Items',
                    description: 'Dropdown menu items (optional)',
                    default: [],
                    arrayItems: {
                      type: 'object',
                      fields: {
                        label: field({
                          type: 'string',
                          title: 'Submenu Label',
                          description: 'Display text for the submenu item',
                          default: 'New Submenu Item',
                        }),
                        link: field({
                          type: 'string',
                          title: 'Submenu Link',
                          description: 'URL path for the submenu item',
                          default: '/',
                        }),
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
    studio: group({
      title: 'Studio',
      description: 'Studio configuration',
      icon: 'i-mdi-cog',
      fields: {
        title: field({
          type: 'string',
          title: 'Site Title',
          description: 'Title displayed in browser tab and headers',
          default: 'Molki Design',
        }),
      },
    }),
  },
});
