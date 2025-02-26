import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    navigation: group({
      title: 'Navigation',
      description: 'Configure website navigation',
      fields: {
        menu: field({
          type: 'object',
          title: 'Menu',
          description: 'Main navigation menu',
          properties: {
            items: {
              type: 'array',
              title: 'Menu Items',
              items: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    title: 'Label',
                  },
                  link: {
                    type: 'string',
                    title: 'Link',
                  },
                  children: {
                    type: 'array',
                    title: 'Submenu Items',
                    items: {
                      type: 'object',
                      properties: {
                        label: {
                          type: 'string',
                          title: 'Label',
                        },
                        link: {
                          type: 'string',
                          title: 'Link',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      },
    }),
    studio: group({
      title: 'Studio',
      description: 'Studio configuration',
      fields: {
        title: field({
          type: 'string',
          title: 'Site Title',
          default: 'Molki Design',
        }),
      },
    }),
  },
});
