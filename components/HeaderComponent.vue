<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import MainMenu from '~/components/MainMenu.vue';
import Logo from '~/components/Logo.vue';
import BaseButton from '~/components/BaseButton.vue';
import { useScrollHeader } from '@/composables/useScrollHeader';
import IconBlock from '~/components/IconBlock.vue';
import { useAppConfig } from '#app';

const { $gsap } = useNuxtApp();
const menuStore = useMenuStore();
const { headerRef, headerHeight, initScrollHeader, cleanup, setHeaderHeightCSSVars } =
  useScrollHeader();
const appConfig = useAppConfig();

// Create a reference to the resize handler for proper cleanup
const handleResize = () => {
  if (headerHeight.value > 0) {
    setHeaderHeightCSSVars();
  }
};

// Update CSS variable when header height changes
watch(headerHeight, (newHeight) => {
  if (process.client && newHeight > 0) {
    setHeaderHeightCSSVars();
  }
});

onMounted(() => {
  if (process.client) {
    try {
      menuStore.setupMobileMenu();
      initScrollHeader();

      // Ensure header CSS variables are set
      if (headerHeight.value > 0) {
        setHeaderHeightCSSVars();
      }

      // Listen for window resize to update header height
      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.warn('Error initializing header animations:', error);
    }
  }
});

onUnmounted(() => {
  if (process.client) {
    try {
      window.removeEventListener('resize', handleResize);
      menuStore.cleanup();
      cleanup();
    } catch (error) {
      console.warn('Error cleaning up header animations:', error);
    }
  }
});
</script>

<template>
  <header class="content-grid">
    <nav
      ref="headerRef"
      class="full-width grid absolute nav h-16 md:h-24 z-50 top-0 py-1 md:py-4 w-full bg-white"
    >
      <div class="nav__wrapper content-grid grid grid-flow-col items-center justify-between">
        <div class="breakout1 items-center md:justify-between grid grid-cols-[1fr_auto_1fr]">
          <button
            class="hamburger content-center xl:hidden grid items-center relative z-50"
            :class="{ 'is-active': menuStore.isMobileMenuOpen }"
            @click.prevent="
              () => {
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
          <div class="nav__logo w-32 justify-self-center md:justify-self-start grid relative z-50">
            <NuxtLink to="/" class="inline-block" aria-label="Molki - Home">
              <Logo />
            </NuxtLink>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden xl:grid">
            <MainMenu :is-mobile="false" />
            <div
              class="w-full h-[0.175rem] relative z-50 bg-gradient-to-r from-[#B76246] via-[#D0835F] to-[#A04225]"
            ></div>
          </div>
          <!-- Mobile Menu Button -->

          <!-- CTA Button (Desktop) -->
          <div class="hidden xl:flex items-center justify-end gap-6">
            <!-- Social Media Links -->
            <div class="grid grid-flow-col gap-3 items-center">
              <NuxtLink
                :to="
                  appConfig.contactInfo?.socialLinks?.instagram ||
                  'https://instagram.com/molki.design'
                "
                target="_blank"
                rel="noopener noreferrer"
                class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                aria-label="Instagram"
              >
                <IconBlock name="fig:instagram" customClass="w-6 h-6 text-primary" />
              </NuxtLink>
              <NuxtLink
                :to="
                  appConfig.contactInfo?.socialLinks?.facebook ||
                  'https://facebook.com/molki.design'
                "
                target="_blank"
                rel="noopener noreferrer"
                class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                aria-label="Facebook"
              >
                <IconBlock name="fig:facebook" customClass="w-6 h-6 text-primary" />
              </NuxtLink>
            </div>
            <!-- CTA Button -->
            <BaseButton
              href="https://meetings-eu1.hubspot.com/wioletta-retko?uuid=91bf4e62-5e59-4f9e-9c23-633477ef3271"
              >Umów Konstultacje</BaseButton
            >
          </div>
        </div>
      </div>
      <!-- Mobile Menu Overlay -->
      <div
        class="mobile-menu content-grid top-0 absolute w-full h-screen inset-0 bg-white z-30 opacity-0"
      >
        <div class="h-full pt-24 breakout1 overflow-y-auto">
          <MainMenu :is-mobile="true" />
          <div class="mt-8 pb-8 mobile-menu-button">
            <BaseButton
              href="https://meetings-eu1.hubspot.com/wioletta-retko?uuid=91bf4e62-5e59-4f9e-9c23-633477ef3271"
              full-width
            >
              Umów konsultację
            </BaseButton>

            <!-- Mobile Social Media Links -->
            <div class="grid grid-flow-col gap-6 justify-center mt-8">
              <NuxtLink
                :to="
                  appConfig.contactInfo?.socialLinks?.instagram ||
                  'https://instagram.com/molki.design'
                "
                target="_blank"
                rel="noopener noreferrer"
                class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                aria-label="Instagram"
              >
                <IconBlock name="fig:instagram" customClass="w-8 h-8 text-primary" />
              </NuxtLink>
              <NuxtLink
                :to="
                  appConfig.contactInfo?.socialLinks?.facebook ||
                  'https://facebook.com/molki.design'
                "
                target="_blank"
                rel="noopener noreferrer"
                class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                aria-label="Facebook"
              >
                <IconBlock name="fig:facebook" customClass="w-8 h-8 text-primary" />
              </NuxtLink>
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
    background: linear-gradient(to right, #b76246, #d0835f, #a04225);
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
