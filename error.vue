<script setup>
const { $gsap } = useNuxtApp();
const errorContainer = ref(null);
const pathRef = ref(null);
const errorCodeRef = ref(null);
const errorMessageRef = ref(null);
const buttonRef = ref(null);
const logoRef = ref(null);
const isReady = ref(false);

const props = defineProps({
  error: Object,
});

// Get error code and message
const errorCode = computed(() => props.error?.statusCode || 404);
const errorMessage = computed(() => {
  if (props.error?.statusMessage) return props.error.statusMessage;

  switch (errorCode.value) {
    case 404:
      return 'Strona nie została odnaleziona';
    case 500:
      return 'Błąd serwera';
    default:
      return 'Wystąpił błąd';
  }
});

// Handle back to home navigation
const handleError = () => clearError({ redirect: '/' });

// Add a loading timeout to ensure content becomes visible even if animations fail
let loadingTimeout = null;
onMounted(() => {
  // Set a fallback timer to ensure content becomes visible even if animations fail
  loadingTimeout = setTimeout(() => {
    if (!isReady.value) {
      isReady.value = true;
    }
  }, 1000);

  if (!process.client || !$gsap) {
    // If GSAP isn't available, at least make the content visible
    isReady.value = true;
    return;
  }

  // Make sure all refs are available
  nextTick(() => {
    // Create animation timeline
    const tl = $gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.8,
      },
      onStart: () => {
        // Make container visible at the start of animations
        isReady.value = true;
      },
    });

    // Fade in main container first
    tl.fromTo(errorContainer.value, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Animate logo
    tl.fromTo(logoRef.value, { y: -20, opacity: 0 }, { y: 0, opacity: 1 });

    // Animate error code
    tl.fromTo(errorCodeRef.value, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, '-=0.5');

    // Path animation is handled by CSS due to its continuous nature
    // But we can trigger it by adding a special animation class
    tl.add(() => {
      // Make sure pathRef exists
      if (pathRef.value) {
        pathRef.value.classList.add('animate-path');
      }
    }, '-=0.3');

    // Animate error message
    tl.fromTo(errorMessageRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.3');

    // Animate button
    tl.fromTo(buttonRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5');
  });
});

// Clean up timeout when component is unmounted
onBeforeUnmount(() => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }
});
</script>

<template>
  <!-- Loading indicator that shows if content is not ready after a short delay -->
  <div v-if="!isReady" class="fixed inset-0 bg-neutral-200 flex items-center justify-center z-50">
    <div class="text-primary">
      <IconBlock
        name="fig:molki-logo-design"
        customClass="w-60 h-60 animate-pulse text-primary mx-auto"
      />
    </div>
  </div>

  <main
    ref="errorContainer"
    class="min-h-screen flex items-center justify-center px-4 bg-neutral-200"
    style="opacity: 0"
  >
    <div class="text-center max-w-3xl mx-auto py-16">
      <!-- Error icon -->
      <div ref="logoRef" class="mb-4">
        <IconBlock name="fig:molki-logo-design" customClass="w-40 h-40 text-primary mx-auto" />
      </div>

      <!-- Error code -->
      <h1 ref="errorCodeRef" class="text-8xl font-bold text-primary mb-4">{{ errorCode }}</h1>

      <!-- Error SVG Path for visual interest - inspired by HeroPath -->
      <div class="w-full h-32 relative my-8">
        <svg
          viewBox="0 0 500 100"
          class="w-full h-full absolute inset-0"
          preserveAspectRatio="none"
        >
          <path
            ref="pathRef"
            d="M0,50 C100,80 200,20 300,50 C400,80 500,20 500,50"
            fill="none"
            stroke-width="3"
            :class="['path-animate', { 'animate-path': isReady }]"
            stroke="url(#path-gradient)"
          />
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#A04225" />
              <stop offset="50%" stop-color="#D0835F" />
              <stop offset="100%" stop-color="#B76246" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Error message in Polish -->
      <div ref="errorMessageRef">
        <h2 class="text-3xl md:text-4xl font-semibold text-secondary-dark mb-4">
          {{ errorMessage }}
        </h2>
        <p class="text-text-primary text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona. Sprawdź
          poprawność adresu URL lub wróć na stronę główną.
        </p>
      </div>

      <!-- Back to home button using the primary color from the theme -->
      <a
        href="/"
        ref="buttonRef"
        @click="handleError"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
      >
        Wróć do strony głównej
      </a>
    </div>
  </main>
</template>

<style scoped>
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
