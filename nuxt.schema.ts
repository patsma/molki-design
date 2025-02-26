export default defineNuxtSchema({
  appConfig: {
    menu: {
      $default: {},
      items: {
        $default: [],
        $schema: {
          type: 'array',
          title: 'Menu Items',
          description: 'Navigation menu items',
          items: {
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
        },
      },
    },
    studio: {
      $default: {
        title: 'Molki Design',
        logo: {
          light: '/img/logo.svg',
          dark: '/img/logo-dark.svg',
        },
        theme: {
          colors: {
            primary: '#000000',
          },
        },
        navigation: {
          enabled: true,
        },
        editor: {
          actions: {
            save: {
              enabled: true,
              text: 'Save changes',
            },
            preview: {
              enabled: true,
              text: 'Preview',
            },
          },
        },
      },
      $schema: {
        type: 'object',
        title: 'Studio Configuration',
        description: 'Configuration options for Nuxt Content Studio',
        properties: {
          title: {
            type: 'string',
            title: 'Studio Title',
            description: 'The title displayed in the Studio header',
          },
          logo: {
            type: 'object',
            title: 'Logo',
            description: 'Logo images for light and dark modes',
            properties: {
              light: {
                type: 'string',
                title: 'Light Mode Logo',
                description: 'Path to the logo image for light mode',
              },
              dark: {
                type: 'string',
                title: 'Dark Mode Logo',
                description: 'Path to the logo image for dark mode',
              },
            },
          },
          theme: {
            type: 'object',
            title: 'Theme',
            description: 'Theme customization options',
            properties: {
              colors: {
                type: 'object',
                title: 'Colors',
                description: 'Color scheme for the Studio interface',
                properties: {
                  primary: {
                    type: 'string',
                    title: 'Primary Color',
                    description: 'The primary color in hex format (e.g., #000000)',
                  },
                },
              },
            },
          },
          navigation: {
            type: 'object',
            title: 'Navigation',
            description: 'Navigation settings',
            properties: {
              enabled: {
                type: 'boolean',
                title: 'Enable Navigation',
                description: 'Whether to show the navigation in Studio',
              },
            },
          },
          editor: {
            type: 'object',
            title: 'Editor',
            description: 'Editor settings',
            properties: {
              actions: {
                type: 'object',
                title: 'Editor Actions',
                description: 'Configuration for editor actions',
                properties: {
                  save: {
                    type: 'object',
                    title: 'Save Action',
                    description: 'Configuration for save action',
                    properties: {
                      enabled: {
                        type: 'boolean',
                        title: 'Enable Save',
                        description: 'Whether the save action is enabled',
                      },
                      text: {
                        type: 'string',
                        title: 'Save Button Text',
                        description: 'Text displayed on the save button',
                      },
                    },
                  },
                  preview: {
                    type: 'object',
                    title: 'Preview Action',
                    description: 'Configuration for preview action',
                    properties: {
                      enabled: {
                        type: 'boolean',
                        title: 'Enable Preview',
                        description: 'Whether the preview action is enabled',
                      },
                      text: {
                        type: 'string',
                        title: 'Preview Button Text',
                        description: 'Text displayed on the preview button',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
