<script setup>
import { ref, onMounted, nextTick } from 'vue';

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
const { $gsap, $scrollAnimations } = nuxtApp;

// Function to show loader
const showLoader = () => {
  isLoading.value = true;
  loaderProgress.value = 0;
  // Reset opacity and position
  $gsap.set('.app-loader', { autoAlpha: 1, y: 0 });
};

// Function to prepare animations while loader is visible
const prepareAnimations = () => {
  return new Promise((resolve) => {
    // Find all elements with v-scroll-anim directive
    const animElements = document.querySelectorAll('[data-scroll-anim]');

    // If there are no elements to animate, resolve immediately
    if (animElements.length === 0) {
      return resolve();
    }

    if ($scrollAnimations) {
      // Clear any existing animations first
      $scrollAnimations.clear();

      // Initialize scroll animations for the current page
      animElements.forEach((el) => {
        // Get animation type and options from data attributes
        const type = el.getAttribute('data-scroll-anim');
        let options = {};

        try {
          const optionsAttr = el.getAttribute('data-scroll-options');
          if (optionsAttr) {
            options = JSON.parse(optionsAttr);
          }
        } catch (e) {
          console.warn('Invalid scroll animation options', e);
        }

        // Create animation for this element (this sets initial states)
        if ($scrollAnimations && type) {
          $scrollAnimations.create(el, type, options);
        }
      });

      // Give a small delay for GSAP to apply initial states
      setTimeout(resolve, 200);
    } else {
      resolve();
    }
  });
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

// Complete loading sequence
const completeLoading = async () => {
  // Update progress to 80% to indicate we're preparing animations
  loaderProgress.value = 80;

  // Wait for next tick to ensure DOM is updated
  await nextTick();

  // Prepare animations while loader is still visible
  await prepareAnimations();

  // Now it's safe to hide the loader
  hideLoader();
};

// Initial load handler
onMounted(() => {
  // For initial page load, wait for everything to load
  window.addEventListener('load', () => {
    completeLoading();
  });

  // If load event already fired (cached page), hide loader
  if (document.readyState === 'complete') {
    completeLoading();
  }
});

// Handle page transitions
nuxtApp.hook('page:start', () => {
  // Show loader when navigation starts
  showLoader();

  // Clear existing scroll animations when page changes
  if ($scrollAnimations) {
    $scrollAnimations.clear();
  }
});

nuxtApp.hook('page:finish', () => {
  // Check if we need to wait for images
  const pageImages = document.querySelectorAll('.page-content img');

  if (pageImages.length > 0) {
    // Count loaded images
    let loadedImages = 0;
    const totalImages = pageImages.length;

    // Update progress as images load (up to 75% max)
    const imageLoaded = () => {
      loadedImages++;
      // Scale progress up to 75% max for image loading
      // Save the remaining 25% for preparing animations
      loaderProgress.value = Math.floor((loadedImages / totalImages) * 75);

      if (loadedImages === totalImages) {
        // All images loaded, now prepare animations while loader still visible
        completeLoading();
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
    // No images to wait for, still need to prepare animations
    completeLoading();
  }
});
</script>

<template>
  <div>
    <!-- App Loader -->
    <div v-show="isLoading" class="app-loader">
      <div class="loader-content">
        <div class="loader-icon">
          <!-- You can use your logo here like in error.vue -->
          <div class="loader-spinner"></div>
        </div>
        <div class="loader-progress-container">
          <div class="loader-progress-bar">
            <div class="loader-progress-fill" :style="`width: ${loaderProgress}%`"></div>
          </div>
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
  background-color: #ffffff; // neutral-200 from your tailwind config
  z-index: 50; // Lower than header but higher than content
  // Keep header visible
  padding-top: 80px; // Adjust based on your header height

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 300px;
  }

  .loader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(183, 98, 70, 0.2); // primary with opacity
    border-radius: 50%;
    border-top-color: #b76246; // primary color
    animation: spin 1s ease-in-out infinite;
  }

  .loader-progress-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .loader-progress-bar {
    width: 100%;
    height: 6px;
    background-color: rgba(183, 98, 70, 0.2); // primary with opacity
    border-radius: 3px;
    overflow: hidden;
  }

  .loader-progress-fill {
    height: 100%;
    background-color: #b76246; // primary color
    transition: width 0.2s ease;
  }

  .loader-percentage {
    font-size: 14px;
    font-weight: 600;
    color: #503d32; // text-primary color
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Optional path animation from error.vue
.path-animate {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

.animate-path {
  animation: path-animation 8s ease-in-out infinite;
}

@keyframes path-animation {
  0% {
    stroke-dashoffset: 1000;
  }
  40% {
    stroke-dashoffset: 0;
  }
  60% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -1000;
  }
}
</style>
