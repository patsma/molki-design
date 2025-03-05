/**
 * Cookie management composable
 * Provides easy access to cookie control functions
 */
export function useCookieManagement() {
  // Get Nuxt app instance
  const nuxtApp = useNuxtApp();

  /**
   * Check if cookies are accepted
   * @returns {boolean} True if cookies are accepted
   */
  const areCookiesAccepted = () => {
    if (!process.client) return false;

    // Check the cookie_control_consent cookie
    const consentCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_control_consent='));

    return consentCookie?.split('=')[1] === 'true';
  };

  /**
   * Check if a specific cookie type is enabled
   * @param {string} cookieId - The ID of the cookie to check
   * @returns {boolean} True if the cookie is enabled
   */
  const isCookieEnabled = (cookieId) => {
    if (!process.client) return false;

    // Check the cookie_control_enabled_cookies cookie
    const enabledCookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_control_enabled_cookies='));

    if (!enabledCookies) return false;

    try {
      const cookieIds = JSON.parse(decodeURIComponent(enabledCookies.split('=')[1]));
      return cookieIds.includes(cookieId);
    } catch (e) {
      console.error('Error parsing enabled cookies:', e);
      return false;
    }
  };

  /**
   * Log current cookie status
   */
  const logCookieStatus = () => {
    if (!process.client) return;

    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
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

  return {
    areCookiesAccepted,
    isCookieEnabled,
    logCookieStatus,
  };
}
