<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import { useAppConfig } from '#app';
import IconBlock from '~/components/IconBlock.vue';
import Logo from '~/components/Logo.vue';

const menuStore = useMenuStore();
const appConfig = useAppConfig();

// Type the config to resolve TypeScript errors
type AppConfig = {
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
      pinterest?: string;
    };
  };
  studio?: {
    title?: string;
  };
};

// Use typed config in template
const typedConfig = appConfig as AppConfig;

// Get menu items directly from store and split them
// Create a flat array of all menu items (parents and children)
const tempItems: any[] = [];
menuStore.menuItems.forEach((item) => {
  tempItems.push(item);
  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      tempItems.push(child);
    });
  }
});

// Split the flat array in half
const flatFirstHalf = tempItems.slice(0, Math.ceil(tempItems.length / 2));
const flatSecondHalf = tempItems.slice(Math.ceil(tempItems.length / 2));

// Helper function to check if an item has children
const hasChildren = (item: any) => item.children && item.children.length > 0;

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
        <!-- Mobile Layout (< md screens) -->
        <div class="lg:hidden space-y-12">
          <!-- Centered Logo -->
          <div class="flex justify-center">
            <slot name="logo" mdc-unwrap="p">
              <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                <IconBlock name="fig:molki-logo-design" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
            </slot>
          </div>

          <!-- Menu Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">MENU</h4>
            <nav class="space-y-2">
              <NuxtLink
                v-for="item in tempItems"
                :key="item.label"
                :to="item.link"
                class="block text-neutral-600 hover:text-primary transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Contact Info Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">Kontakt</h4>
            <div class="space-y-2">
              <div class="flex items-start space-x-2">
                <Icon name="fig:house" class="w-10 h-10 text-primary mt-1" />
                <slot name="contactAddress" mdc-unwrap="p">
                  <p class="text-neutral-600">
                    {{ typedConfig.contactInfo?.address || 'ul. Heweliusza 11/811, 80-890 Gdańsk' }}
                  </p>
                </slot>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="fig:envelope" class="w-10 h-10 text-primary" />
                <slot name="contactEmail" mdc-unwrap="p">
                  <a
                    :href="`mailto:${typedConfig.contactInfo?.email || 'kontakt@molki.pl'}`"
                    class="text-neutral-600 hover:text-primary"
                  >
                    {{ typedConfig.contactInfo?.email || 'kontakt@molki.pl' }}
                  </a>
                </slot>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="fig:phone" class="w-10 h-10 text-primary" />
                <slot name="contactPhone" mdc-unwrap="p">
                  <a
                    :href="`tel:${typedConfig.contactInfo?.phone || '+48572323207'}`"
                    class="text-neutral-600 hover:text-primary"
                  >
                    {{ typedConfig.contactInfo?.phone || '+48 572 323 207' }}
                  </a>
                </slot>
              </div>
            </div>
          </div>

          <!-- Social Media Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">Bądź na bieżąco:</h4>
            <slot name="socialLinks" mdc-unwrap="p">
              <div class="flex space-x-4 justify-center">
                <template v-if="typedConfig.contactInfo?.socialLinks?.instagram">
                  <NuxtLink
                    :to="typedConfig.contactInfo.socialLinks.instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <IconBlock name="fig:instagram" customClass="w-6 h-6 text-primary" />
                  </NuxtLink>
                </template>
                <template v-if="typedConfig.contactInfo?.socialLinks?.facebook">
                  <NuxtLink
                    :to="typedConfig.contactInfo.socialLinks.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Facebook"
                  >
                    <IconBlock name="fig:facebook" customClass="w-6 h-6 text-primary" />
                  </NuxtLink>
                </template>
              </div>
            </slot>
          </div>

          <!-- Sponsors Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">Sponsorujemy:</h4>
            <slot name="sponsors" mdc-unwrap="p">
              <div class="flex gap-4 justify-center">
                <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                  <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
                </NuxtLink>
              </div>
            </slot>
          </div>

          <!-- Certifications Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">Nasze certyfikaty:</h4>
            <slot name="certifications" mdc-unwrap="p">
              <div class="flex gap-4 justify-center">
                <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                  <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
                </NuxtLink>
              </div>
            </slot>
          </div>

          <!-- Memberships Section -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase">Należymy do:</h4>
            <slot name="memberships" mdc-unwrap="p">
              <div class="flex gap-4 justify-center">
                <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                  <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
                </NuxtLink>
              </div>
            </slot>
          </div>

          <!-- Copyright Section -->
          <div class="text-xs text-neutral-500 space-y-2 text-center">
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

        <!-- Desktop Layout (≥ md screens) -->
        <div
          class="hidden lg:grid lg:grid-cols-4 gap-x-8 gap-y-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Column 2: First Half of Menu + Sponsors -->
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <h4 class="text-sm font-bold text-primary">MENU</h4>
              <nav class="space-y-2">
                <NuxtLink
                  v-for="item in flatFirstHalf"
                  :key="item.label"
                  :to="item.link"
                  class="block text-neutral-600 hover:text-primary transition-colors"
                >
                  {{ item.label }}
                </NuxtLink>
              </nav>
            </div>
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary uppercase">Sponsorujemy:</h4>
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
                v-for="item in flatSecondHalf"
                :key="item.label"
                :to="item.link"
                class="block text-neutral-600 hover:text-primary transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary uppercase">Nasze Certyfikaty:</h4>
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
              <h4 class="text-sm font-bold text-primary uppercase">Dane kontaktowe:</h4>
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Icon name="fig:house" class="w-10 h-10 text-primary mt-1" />
                  <slot name="contactAddress" mdc-unwrap="p">
                    <p class="text-neutral-600">
                      {{
                        typedConfig.contactInfo?.address || 'ul. Heweliusza 11/811, 80-890 Gdańsk'
                      }}
                    </p>
                  </slot>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="fig:envelope" class="w-10 h-10 text-primary" />
                  <slot name="contactEmail" mdc-unwrap="p">
                    <a
                      :href="`mailto:${typedConfig.contactInfo?.email || 'kontakt@molki.pl'}`"
                      class="text-neutral-600 hover:text-primary"
                    >
                      {{ typedConfig.contactInfo?.email || 'kontakt@molki.pl' }}
                    </a>
                  </slot>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="fig:phone" class="w-10 h-10 text-primary" />
                  <slot name="contactPhone" mdc-unwrap="p">
                    <a
                      :href="`tel:${typedConfig.contactInfo?.phone || '+48572323207'}`"
                      class="text-neutral-600 hover:text-primary"
                    >
                      {{ typedConfig.contactInfo?.phone || '+48 572 323 207' }}
                    </a>
                  </slot>
                </div>
              </div>
            </div>
            <div class="pt-8 border-neutral-200 flex items-center">
              <h4 class="text-sm font-bold text-primary uppercase">Należymy do:</h4>
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
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-bold text-primary uppercase">Bądź na bieżąco:</h4>
                <slot name="socialLinks" mdc-unwrap="p">
                  <div class="flex space-x-4">
                    <template v-if="typedConfig.contactInfo?.socialLinks?.instagram">
                      <NuxtLink
                        :to="typedConfig.contactInfo.socialLinks.instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                        aria-label="Instagram"
                      >
                        <IconBlock name="fig:instagram" customClass="w-6 h-6 text-primary" />
                      </NuxtLink>
                    </template>
                    <template v-if="typedConfig.contactInfo?.socialLinks?.facebook">
                      <NuxtLink
                        :to="typedConfig.contactInfo.socialLinks.facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                        aria-label="Facebook"
                      >
                        <IconBlock name="fig:facebook" customClass="w-6 h-6 text-primary" />
                      </NuxtLink>
                    </template>
                    <template v-if="typedConfig.contactInfo?.socialLinks?.linkedin">
                      <NuxtLink
                        :to="typedConfig.contactInfo.socialLinks.linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
                        aria-label="LinkedIn"
                      >
                        <IconBlock name="fig:linkedin" customClass="w-6 h-6 text-primary" />
                      </NuxtLink>
                    </template>
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
            <!-- Logo Section -->
            <div class="pt-8 border-neutral-200 flex items-center">
              <slot name="logo" mdc-unwrap="p">
                <NuxtLink to="/" class="inline-block ml-4" aria-label="Molki - Home">
                  <Logo class="w-60 h-full text-primary" />
                </NuxtLink>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
