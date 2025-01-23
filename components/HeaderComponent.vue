<script setup>
import { onMounted, onUnmounted } from "vue";
import { useMenuStore } from "@/stores/menuStore";
import { useAnimationStore } from "@/stores/animationStore";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// import useHeadroom from "~/composables/useHeadroom";
import MainMenu from "~/components/MainMenu.vue";
import Logo from "~/components/Logo.vue";

const { $gsap, $MorphSVGPlugin } = useNuxtApp();
const menuStore = useMenuStore();
// const { initHeadroom } = useHeadroom(".nav");

onMounted(() => {
  if (process.client) {
    $MorphSVGPlugin.convertToPath(
      "circle, rect, ellipse, line, polygon, polyline"
    );
    // initHeadroom();
    menuStore.initAnimation($gsap);
  }
});

onUnmounted(() => {
  menuStore.cleanup();
});
</script>

<template>
  <header class="content-grid">
    <nav class="full-width grid absolute nav z-40 py-4 w-full bg-white">
      <div
        class="nav__wrapper content-grid grid grid-flow-col items-center justify-between"
      >
        <div
          class="breakout1 items-center md:justify-between grid grid-cols-[1fr_2fr_1fr]"
        >
          <button
            class="hamburger content-center md:hidden grid items-center relative z-50"
            :class="{ 'is-active': menuStore.isMobileMenuOpen }"
            @click.prevent="
              () => {
                console.log('Hamburger clicked');
                menuStore.toggleMenu();
              }
            "
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <!-- Logo -->
          <div class="nav__logo w-32 justify-self-center grid relative z-50">
            <NuxtLink to="/" class="inline-block" aria-label="Molki - Home">
              <Logo />
            </NuxtLink>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <MainMenu :is-mobile="false" />
          </div>
          <!-- Mobile Menu Button -->

          <!-- CTA Button (Desktop) -->
          <div class="hidden md:grid justify-end">
            <button
              class="rounded-md uppercase bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Umów konsultację
            </button>
          </div>
        </div>
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu inset-0 bg-white z-30">
          <div class="content-grid h-full pt-24 px-6 overflow-y-auto">
            <MainMenu :is-mobile="true" />
            <div class="mt-8 pb-8">
              <button
                class="w-full rounded-md uppercase bg-primary px-4 py-2 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Umów konsultację
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
.hamburger {
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--color-secondary);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }

  &.is-active {
    span {
      &:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        bottom: 50%;
        transform: translateY(50%) rotate(-45deg);
      }
    }
  }
}

.mobile-menu {
  will-change: transform, opacity;
}
</style>
