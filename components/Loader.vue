<template>
  <div
    class="loader-group bg-secondary grid justify-center absolute z-50 h-screen w-full"
  >
    <div class="loader grid">
      <LoaderLogo class="w-80" />
    </div>
  </div>
</template>
<style>
.loader-group {
  transition: 0.3s all ease-out;
}

.loader-group--hidden {
  opacity: 0;
}

@keyframes fade-in-out {
  0% {
    transform: scale(1.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.8);
  }
}
</style>
