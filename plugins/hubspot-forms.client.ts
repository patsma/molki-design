export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (process.client) {
    // Add HubSpot Forms script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    script.onload = () => {
      console.log('HubSpot Forms script loaded');
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

          return window.hbspt.forms.create({
            portalId: options.portalId || config.public.hubspotPortalId,
            formId: options.formId,
            region: options.region || 'eu1',
            target: options.target,
          });
        },
      },
    },
  };
});
