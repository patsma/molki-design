import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    menu: group({
      title: 'Menu',
      description: 'Configure the site navigation',
      fields: {
        items: field({
          type: 'array',
          title: 'Menu Items',
          description: 'Navigation menu items displayed in the header',
          default: [
            {
              label: 'Strona główna',
              link: '/',
            },
            {
              label: 'O nas',
              link: '/o-nas',
            },
            {
              label: 'Usługi',
              link: '/uslugi',
              children: [
                {
                  label: 'Projektowanie wnętrz',
                  link: '/uslugi/projektowanie-wnetrz',
                },
                {
                  label: 'Wizualizacje 3D',
                  link: '/uslugi/wizualizacje-3d',
                },
                {
                  label: 'Nadzór projektowy',
                  link: '/uslugi/nadzor-projektowy',
                },
              ],
            },
            {
              label: 'Realizacje',
              link: '/realizacje',
            },
            {
              label: 'Kontakt',
              link: '/kontakt',
            },
          ],
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
    studio: group({
      title: 'Global',
      description: 'Configure Nuxt Content Studio settings',
      fields: {
        title: field({
          type: 'string',
          title: 'Studio Title',
          description: 'The title displayed in the Studio header',
          default: 'Molki Design',
        }),
      },
    }),
  },
});
