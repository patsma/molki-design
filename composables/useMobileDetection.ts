import { ref } from 'vue';

export const useMobileDetection = () => {
  const isMobile = ref(false);

  if (process.client) {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup (will be handled by Nuxt's module system)
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        window.removeEventListener('resize', checkMobile);
      });
    }
  }

  return { isMobile };
};
