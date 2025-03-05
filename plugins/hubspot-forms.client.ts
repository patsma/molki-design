export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (process.client) {
    // Debug portal ID configuration
    // console.log('HubSpot Configuration:', {
    //   portalId: config.public.hubspotPortalId,
    //   environment: process.dev ? 'development' : 'production',
    // });

    // Add HubSpot Forms script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    script.onload = () => {
      // console.log('HubSpot Forms script loaded');
    };
    document.body.appendChild(script);
  }

  return {
    provide: {
      hubspotForm: {
        create: (options: {
          target: string | HTMLElement;
          formId: string;
          region?: string;
          portalId?: string;
        }) => {
          if (!process.client || !window.hbspt) {
            console.error('HubSpot Forms not initialized');
            return;
          }

          const portalId = options.portalId || config.public.hubspotPortalId;

          // Validate portal ID
          if (!portalId) {
            console.error('HubSpot portal ID is missing');
            return;
          }

          // console.log('Creating HubSpot form with config:', {
          //   portalId,
          //   formId: options.formId,
          //   region: options.region || 'eu1',
          // });

          return window.hbspt.forms.create({
            portalId,
            formId: options.formId,
            region: options.region || 'eu1',
            target: options.target,
          });
        },
      },
    },
  };
});
