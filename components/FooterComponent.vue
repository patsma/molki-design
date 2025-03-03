<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';

const menuStore = useMenuStore();

// Get menu items directly from store and split them
const firstHalf = menuStore.menuItems.slice(0, Math.ceil(menuStore.menuItems.length / 2));
const secondHalf = menuStore.menuItems.slice(Math.ceil(menuStore.menuItems.length / 2));

// Expose year as a prop with a default computed value
const props = withDefaults(
  defineProps<{
    year?: number;
  }>(),
  {
    year: () => new Date().getFullYear(),
  }
);

// Define slots with proper MDC unwrap for markdown compatibility
defineSlots<{
  logo?: (props: { mdcUnwrap: 'p' }) => any;
  sponsors?: (props: { mdcUnwrap: 'p' }) => any;
  certifications?: (props: { mdcUnwrap: 'p' }) => any;
  memberships?: (props: { mdcUnwrap: 'p' }) => any;
  contactAddress?: (props: { mdcUnwrap: 'p' }) => any;
  contactEmail?: (props: { mdcUnwrap: 'p' }) => any;
  contactPhone?: (props: { mdcUnwrap: 'p' }) => any;
  socialLinks?: (props: { mdcUnwrap: 'p' }) => any;
  copyrightText?: (props: { mdcUnwrap: 'p' }) => any;
  privacyText?: (props: { mdcUnwrap: 'p' }) => any;
}>();
</script>

<template>
  <footer class="bg-neutral-100">
    <div class="content-grid py-16" data-scroll-section>
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
              <slot name="logo" mdc-unwrap="p">
                <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                  <IconBlock name="fig:molki-logo-design" customClass="w-16 h-16 text-primary" />
                </NuxtLink>
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
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary mb-4">Sponsorujemy:</h4>
              <slot name="sponsors" mdc-unwrap="p">
                <div class="flex gap-4">
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                </div>
              </slot>
            </div>
          </div>

          <!-- Column 3: Second Half of Menu + Certifications -->
          <div class="h-full flex flex-col justify-between">
            <h4 class="text-sm font-bold text-primary"></h4>
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
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary mb-4">Nasze Certyfikaty:</h4>
              <slot name="certifications" mdc-unwrap="p">
                <div class="flex gap-4">
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                </div>
              </slot>
            </div>
          </div>

          <!-- Column 4: Company Info + Memberships -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <h4 class="text-sm font-bold text-primary">Dane kontaktowe:</h4>
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Icon name="fig:house" class="w-10 h-10 text-primary mt-1" />
                  <slot name="contactAddress" mdc-unwrap="p">
                    <p class="text-neutral-600">ul. Heweliusza 11/811,<br />80-890 Gdańsk</p>
                  </slot>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="fig:envelope" class="w-10 h-10 text-primary" />
                  <slot name="contactEmail" mdc-unwrap="p">
                    <a href="mailto:kontakt@molki.pl" class="text-neutral-600 hover:text-primary">
                      kontakt@molki.pl
                    </a>
                  </slot>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="fig:phone" class="w-10 h-10 text-primary" />
                  <slot name="contactPhone" mdc-unwrap="p">
                    <a href="tel:+48572323207" class="text-neutral-600 hover:text-primary">
                      +48 572 323 207
                    </a>
                  </slot>
                </div>
              </div>
            </div>
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary mb-4">Należymy do:</h4>
              <slot name="memberships" mdc-unwrap="p">
                <div class="flex gap-4">
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                  <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                    <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
                  </NuxtLink>
                </div>
              </slot>
            </div>
          </div>

          <!-- Column 5: Social Media + Copyright -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-8">
              <div>
                <h4 class="text-sm font-bold text-primary mb-4">Bądź na bieżąco:</h4>
                <slot name="socialLinks" mdc-unwrap="p">
                  <div class="flex space-x-4">
                    <NuxtLink
                      v-for="social in ['linkedin', 'instagram', 'facebook']"
                      :key="social"
                      :to="`https://${social}.com`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary hover:text-primary-dark transition-colors"
                    >
                      <IconBlock :name="`uil:${social}`" customClass="w-6 h-6 text-primary" />
                    </NuxtLink>
                  </div>
                </slot>
              </div>
              <div class="text-xs text-neutral-500 space-y-2">
                <p class="text-neutral-500">molki.design.pl © {{ props.year }}</p>
                <slot name="copyrightText" mdc-unwrap="p">
                  <p class="text-neutral-500">
                    Wszelkie prawa zastrzeżone /
                    <NuxtLink to="/privacy" class="hover:text-primary transition-colors">
                      prywatność i ciasteczka
                    </NuxtLink>
                    /
                    <NuxtLink to="/rodo" class="hover:text-primary transition-colors">
                      klauzula RODO
                    </NuxtLink>
                  </p>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
