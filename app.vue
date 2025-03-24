<script setup>
import { ref, onMounted } from 'vue';

// Add meta tags for OG Image
useHead({
  meta: [
    {
      property: 'og:site_name',
      content: 'Molki Design',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
});

// Loader state
const isLoading = ref(true);
const loaderProgress = ref(0);
const nuxtApp = useNuxtApp();
const { $gsap } = nuxtApp;

// Function to show loader
const showLoader = () => {
  isLoading.value = true;
  loaderProgress.value = 0;
  // Reset opacity and position
  $gsap.set('.app-loader', { autoAlpha: 1, y: 0 });
};

// Function to hide loader
const hideLoader = () => {
  const loadingTl = $gsap.timeline();

  // Animate the progress to 100%
  loadingTl.to(loaderProgress, {
    value: 100,
    duration: 0.8,
    ease: 'power2.inOut',
  });

  // Once loaded, animate the loader out
  loadingTl.to('.app-loader', {
    autoAlpha: 0,
    y: -10,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      isLoading.value = false;
    },
  });
};

// Initial load handler
onMounted(() => {
  // For initial page load, wait for everything to load
  window.addEventListener('load', () => {
    hideLoader();
  });

  // If load event already fired (cached page), hide loader
  if (document.readyState === 'complete') {
    hideLoader();
  }
});

// Handle page transitions
nuxtApp.hook('page:start', () => {
  // Show loader when navigation starts
  showLoader();
});

nuxtApp.hook('page:finish', () => {
  // Check if we need to wait for images
  const pageImages = document.querySelectorAll('.page-content img');

  if (pageImages.length > 0) {
    // Count loaded images
    let loadedImages = 0;
    const totalImages = pageImages.length;

    // Update progress as images load
    const imageLoaded = () => {
      loadedImages++;
      loaderProgress.value = Math.floor((loadedImages / totalImages) * 100);

      if (loadedImages === totalImages) {
        // All images loaded
        setTimeout(hideLoader, 200); // Small delay for smooth transition
      }
    };

    // Listen for image load events
    pageImages.forEach((img) => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.onload = imageLoaded;
        img.onerror = imageLoaded; // Count error as loaded to prevent hanging
      }
    });
  } else {
    // No images to wait for, hide after a short delay to show transition
    setTimeout(() => {
      hideLoader();
    }, 100);
  }
});
</script>

<template>
  <div>
    <!-- App Loader -->
    <div v-show="isLoading" class="app-loader">
      <div class="loader-content">
        <div class="loader-icon">
          <!-- You can add your logo or custom loader icon here -->
          <div class="loader-spinner"></div>
        </div>
        <div class="loader-progress-bar">
          <div class="loader-progress-fill" :style="`width: ${loaderProgress}%`"></div>
        </div>
      </div>
    </div>

    <!-- Main App Content -->
    <NuxtLayout>
      <NuxtPage class="page-content" />
    </NuxtLayout>
  </div>
</template>

<!--suppress CssUnknownTarget -->
<style lang="scss">
@use '~/assets/scss/main.scss';

// Loader Styles
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 9999;

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .loader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #000;
    animation: spin 1s ease-in-out infinite;
  }

  .loader-progress-bar {
    width: 200px;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .loader-progress-fill {
    height: 100%;
    background-color: #000;
    transition: width 0.2s ease;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
