<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';

const menuStore = useMenuStore();
const currentYear = new Date().getFullYear();

// Reference the menu items from MainMenu
const menuItems = [
  { label: 'O NAS', link: '/buttons' },
  { label: 'PROJEKT', link: '/#spacer1' },
  { label: 'REMONT+', link: '/homepage' },
  { label: 'BIZNES', link: '/isolation' },
  { label: 'BLOG', link: '#blog' },
  { label: 'KONTAKT', link: '#blog' },
];

// Split menu items into two columns
const firstHalf = menuItems.slice(0, Math.ceil(menuItems.length / 2));
const secondHalf = menuItems.slice(Math.ceil(menuItems.length / 2));

defineSlots<{
  logo?: () => any;
  sponsors?: () => any;
  certifications?: () => any;
  memberships?: () => any;
}>();
</script>

<template>
  <footer class="bg-neutral-100" data-scroll-section>
    <div class="content-grid py-16">
      <div class="breakout1">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <!-- Column 1: Logo -->
          <div>
            <slot name="logo">
              <Logo class="w-48" />
            </slot>
          </div>

          <!-- Column 2: First Half of Menu + Sponsors -->
          <div class="space-y-8">
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
          <div class="space-y-8">
            <div class="space-y-4">
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
            </div>
            <div class="pt-8 border-t border-neutral-200">
              <h4 class="text-sm font-bold text-primary mb-4">Nasze Certyfikaty:</h4>
              <slot name="certifications" />
            </div>
          </div>

          <!-- Column 4: Company Info + Memberships -->
          <div class="space-y-8">
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
          <div class="space-y-8">
            <div>
              <h4 class="text-sm font-bold text-primary mb-4">Bądź na bieżąco:</h4>
              <div class="flex space-x-4 mb-8">
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
