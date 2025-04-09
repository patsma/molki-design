<script setup>
const showButton = ref(false);

// Only run on client side
onMounted(() => {
  if (!process.client) return;

  const handleScroll = () => {
    // Calculate total scrollable height (total page height minus viewport height)
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Show button when user has scrolled 90% of the scrollable height
    showButton.value = window.scrollY > scrollableHeight * 0.5;
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Initial check
  handleScroll();

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <!-- Hide on mobile screens (< 768px) -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-10"
  >
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 z-50 left-8 hidden md:flex items-center justify-center w-12 h-12 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <Icon name="uil:arrow-up" class="w-6 h-6" />
    </button>
  </Transition>
</template>
