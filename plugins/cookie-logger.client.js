/**
 * Cookie logger plugin
 *
 * This plugin enhances cookie tracking with detailed console logs
 * for development purposes until real analytics are implemented.
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Subscribe to cookie events from nuxt-cookie-control
  nuxtApp.hook('cookie-control:accepted', (cookieId) => {
    console.log(`🍪 Cookie accepted: ${cookieId}`);
    logCookieStatus();
  });

  nuxtApp.hook('cookie-control:declined', (cookieId) => {
    console.log(`🍪 Cookie declined: ${cookieId}`);
    logCookieStatus();
  });

  nuxtApp.hook('cookie-control:initialized', () => {
    console.log('🍪 Cookie control initialized');
    logCookieStatus();
  });

  // Helper to log the current cookie status
  const logCookieStatus = () => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key) acc[key] = value;
      return acc;
    }, {});

    console.log('📊 Current Cookie Status:', {
      timestamp: new Date().toISOString(),
      cookieCount: Object.keys(cookies).length,
      cookies,
    });
  };

  // Return public functions if needed
  return {
    provide: {
      cookieLogger: {
        logStatus: logCookieStatus,
      },
    },
  };
});
