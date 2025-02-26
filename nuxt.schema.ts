import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
  appConfig: {
    menu: group({
      title: 'Navigation Menu',
      description: 'Configure the site navigation menu items.',
      icon: 'i-mdi-menu',
      fields: {
        items: field({
          type: 'array',
          title: 'Menu Items',
          description: 'Navigation menu items displayed in the header',
          icon: 'i-mdi-format-list-bulleted',
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
    studio: group({
      title: 'Studio Configuration',
      description: 'Configure Nuxt Content Studio settings',
      icon: 'i-mdi-cog',
      fields: {
        title: field({
          type: 'string',
          title: 'Studio Title',
          description: 'The title displayed in the Studio header',
          default: 'Molki Design',
        }),
        logo: group({
          title: 'Logo Configuration',
          description: 'Configure logo images for different themes',
          icon: 'i-mdi-image',
          fields: {
            light: field({
              type: 'media',
              title: 'Light Mode Logo',
              description: 'Path to the logo image for light mode',
              default: '/img/logo.svg',
            }),
            dark: field({
              type: 'media',
              title: 'Dark Mode Logo',
              description: 'Path to the logo image for dark mode',
              default: '/img/logo-dark.svg',
            }),
          },
        }),
        theme: group({
          title: 'Theme Settings',
          description: 'Customize the Studio theme',
          icon: 'i-mdi-palette',
          fields: {
            colors: group({
              title: 'Color Configuration',
              description: 'Configure colors for the Studio interface',
              icon: 'i-mdi-palette',
              fields: {
                primary: field({
                  type: 'string',
                  title: 'Primary Color',
                  description: 'The primary color in hex format (e.g., #000000)',
                  default: '#000000',
                }),
              },
            }),
          },
        }),
        navigation: group({
          title: 'Navigation Settings',
          description: 'Configure Studio navigation options',
          icon: 'i-mdi-navigation',
          fields: {
            enabled: field({
              type: 'boolean',
              title: 'Enable Navigation',
              description: 'Whether to show the navigation in Studio',
              default: true,
            }),
          },
        }),
        editor: group({
          title: 'Editor Settings',
          description: 'Configure Studio editor options',
          icon: 'i-mdi-pencil',
          fields: {
            actions: group({
              title: 'Editor Actions',
              description: 'Configure editor action buttons',
              icon: 'i-mdi-gesture-tap-button',
              fields: {
                save: group({
                  title: 'Save Action',
                  description: 'Configure save action button',
                  icon: 'i-mdi-content-save',
                  fields: {
                    enabled: field({
                      type: 'boolean',
                      title: 'Enable Save',
                      description: 'Whether the save action is enabled',
                      default: true,
                    }),
                    text: field({
                      type: 'string',
                      title: 'Save Button Text',
                      description: 'Text displayed on the save button',
                      default: 'Save changes',
                    }),
                  },
                }),
                preview: group({
                  title: 'Preview Action',
                  description: 'Configure preview action button',
                  icon: 'i-mdi-eye',
                  fields: {
                    enabled: field({
                      type: 'boolean',
                      title: 'Enable Preview',
                      description: 'Whether the preview action is enabled',
                      default: true,
                    }),
                    text: field({
                      type: 'string',
                      title: 'Preview Button Text',
                      description: 'Text displayed on the preview button',
                      default: 'Preview',
                    }),
                  },
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
