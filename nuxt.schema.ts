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
          description: 'Primary website menu structureeeeeee',
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
