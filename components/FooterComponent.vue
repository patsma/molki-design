<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';

const menuStore = useMenuStore();
const currentYear = new Date().getFullYear();

// Get menu items directly from store and split them
const firstHalf = menuStore.menuItems.slice(0, Math.ceil(menuStore.menuItems.length / 2));
const secondHalf = menuStore.menuItems.slice(Math.ceil(menuStore.menuItems.length / 2));

// Define slots with proper TypeScript types (removed menuItems related slots)
defineSlots<{
  logo?: (props: { mdcUnwrap?: string }) => any;
  sponsors?: (props: { mdcUnwrap?: string }) => any;
  certifications?: (props: { mdcUnwrap?: string }) => any;
  contactAddress?: (props: { mdcUnwrap?: string }) => any;
  contactEmail?: (props: { mdcUnwrap?: string }) => any;
  contactPhone?: (props: { mdcUnwrap?: string }) => any;
  memberships?: (props: { mdcUnwrap?: string }) => any;
  socialLinks?: (props: { mdcUnwrap?: string }) => any;
  copyrightText?: (props: { mdcUnwrap?: string }) => any;
  privacyText?: (props: { mdcUnwrap?: string }) => any;
}>();
</script>

<template>
  <footer class="bg-neutral-100" data-scroll-section>
    <div class="content-grid py-16">
      <div class="breakout1">
        <div
          class="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Column 1: Logo -->
          <div>
            <div
              class="h-full flex flex-col"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
            >
              <slot name="logo">
                <Logo class="w-48" />
              </slot>
            </div>
          </div>

          <!-- Column 2: First Half of Menu + Sponsors -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <h4 class="text-sm font-bold text-primary">MENU</h4>
              <nav class="space-y-2">
                <NuxtLink
                  v-for="item in firstHalf"
                  :key="item.label"
                  :to="item.link"
                  class="block text-neutral-600 hover:text-primary transition-colors"
                >
                  {{ item.label }}
                </NuxtLink>
              </nav>
            </div>
            <div class="pt-8 border-t border-neutral-200">
              <h4 class="text-sm font-bold text-primary mb-4">Sponsorujemy:</h4>
              <slot name="sponsors" />
            </div>
          </div>

          <!-- Column 3: Second Half of Menu + Certifications -->
          <div class="h-full flex flex-col justify-between">
            <nav class="space-y-2">
              <NuxtLink
                v-for="item in secondHalf"
                :key="item.label"
                :to="item.link"
                class="block text-neutral-600 hover:text-primary transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
            <div class="pt-8 border-t border-neutral-200">
              <h4 class="text-sm font-bold text-primary mb-4">Nasze Certyfikaty:</h4>
              <slot name="certifications" />
            </div>
          </div>

          <!-- Column 4: Company Info + Memberships -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <h4 class="text-sm font-bold text-primary">Dane kontaktowe:</h4>
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Icon name="uil:map-marker" class="w-5 h-5 text-primary mt-1" />
                  <p class="text-neutral-600">ul. Heweliusza 11/811,<br />80-890 Gdańsk</p>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="uil:envelope" class="w-5 h-5 text-primary" />
                  <a href="mailto:kontakt@molki.pl" class="text-neutral-600 hover:text-primary">
                    kontakt@molki.pl
                  </a>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="uil:phone" class="w-5 h-5 text-primary" />
                  <a href="tel:+48572323207" class="text-neutral-600 hover:text-primary">
                    +48 572 323 207
                  </a>
                </div>
              </div>
            </div>
            <div class="pt-8 border-t border-neutral-200">
              <h4 class="text-sm font-bold text-primary mb-4">Należymy do:</h4>
              <slot name="memberships" />
            </div>
          </div>

          <!-- Column 5: Social Media + Copyright -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-8">
              <div>
                <h4 class="text-sm font-bold text-primary mb-4">Bądź na bieżąco:</h4>
                <div class="flex space-x-4">
                  <a
                    v-for="social in ['linkedin', 'instagram', 'facebook']"
                    :key="social"
                    :href="`https://${social}.com`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:text-primary-dark transition-colors"
                  >
                    <Icon :name="`uil:${social}`" class="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div class="text-xs text-neutral-500 space-y-2">
                <p>molki.design.pl © {{ currentYear }}</p>
                <p>Wszelkie prawa zastrzeżone.</p>
                <p>/ prywatność / ciasteczka /</p>
                <p>klauzula RODO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
