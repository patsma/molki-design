import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    menu: group({
      title: 'Navigation',
      description: 'Configure the site navigation menu items.',
      fields: {
        items: field({
          type: 'array',
          title: 'Menu Items',
          description: 'Navigation menu items displayed in the header',
          default: [],
          schema: {
            type: 'object',
            required: ['label', 'link'],
            properties: {
              label: {
                type: 'string',
                title: 'Label',
                description: 'Display text for the menu item',
              },
              link: {
                type: 'string',
                title: 'Link',
                description: 'URL or anchor link (#) for the menu item',
              },
              children: {
                type: 'array',
                title: 'Submenu Items',
                description: 'Dropdown menu items (optional)',
                items: {
                  type: 'object',
                  required: ['label', 'link'],
                  properties: {
                    label: {
                      type: 'string',
                      title: 'Label',
                      description: 'Display text for the submenu item',
                    },
                    link: {
                      type: 'string',
                      title: 'Link',
                      description: 'URL or anchor link (#) for the submenu item',
                    },
                  },
                },
              },
            },
          },
        }),
      },
    }),
  },
});
