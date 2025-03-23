<script setup>
import { useAppConfig } from '#app';
const appConfig = useAppConfig();
</script>

<template>
  <FooterComponent>
    <template #sponsors>
      <div class="flex gap-4">
        <NuxtLink
          to="https://www.wybrzezegdansk.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-primary-dark transition-colors"
        >
          <IconBlock name="fig:club01" customClass="w-16 h-16 text-primary" />
        </NuxtLink>
      </div>
    </template>

    <template #certifications>
      <div class="flex gap-4">
        <NuxtLink
          to="https://kapitalnafirma.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-primary-dark transition-colors"
        >
          <IconBlock name="fig:cert01" customClass="w-16 h-16 text-primary" />
        </NuxtLink>
        <NuxtLink
          to="https://rzetelnafirma.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-primary-dark transition-colors"
        >
          <IconBlock name="fig:cert02" customClass="w-16 h-16 text-primary" />
        </NuxtLink>
      </div>
    </template>

    <template #memberships>
      <div class="flex gap-4">
        <NuxtLink
          to="https://www.wybrzezegdansk.pl/klub-200"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-primary-dark transition-colors"
        >
          <IconBlock name="fig:cert03" customClass="w-16 h-16 text-primary" />
        </NuxtLink>
      </div>
    </template>

    <template #socialLinks>
      <div class="flex space-x-4">
        <template v-if="appConfig.contactInfo?.socialLinks?.instagram">
          <NuxtLink
            :to="appConfig.contactInfo.socialLinks.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
            aria-label="Instagram"
          >
            <IconBlock name="fig:instagram" customClass="w-6 h-6 text-primary" />
          </NuxtLink>
        </template>
        <template v-if="appConfig.contactInfo?.socialLinks?.facebook">
          <NuxtLink
            :to="appConfig.contactInfo.socialLinks.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
            aria-label="Facebook"
          >
            <IconBlock name="fig:facebook" customClass="w-6 h-6 text-primary" />
          </NuxtLink>
        </template>
        <template v-if="appConfig.contactInfo?.socialLinks?.linkedin">
          <NuxtLink
            :to="appConfig.contactInfo.socialLinks.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="grid place-items-center text-primary hover:text-primary-dark transition-colors"
            aria-label="LinkedIn"
          >
            <IconBlock name="fig:linkedin" customClass="w-6 h-6 text-primary" />
          </NuxtLink>
        </template>
      </div>
    </template>

    <template #copyrightText>
      <span class="text-neutral-500">
        {{ appConfig.studio.title || 'Molki Design' }} © {{ new Date().getFullYear() }}
      </span>
      <p class="text-neutral-500">Wszelkie prawa zastrzeżone.</p>
      <p class="space-x-1">
        <NuxtLink
          to="/polityka-prywatnosci"
          class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
          >prywatność</NuxtLink
        >
        <span>/</span>
        <NuxtLink
          to="/polityka-prywatnosci"
          class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
          >ciasteczka</NuxtLink
        >
        <span>/</span>
        <NuxtLink
          to="/polityka-prywatnosci"
          class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
          >klauzula RODO</NuxtLink
        >
      </p>
    </template>

    <template #privacyText>
      <NuxtLink to="/polityka-prywatnosci" class="hover:text-primary">
        Polityka prywatności
      </NuxtLink>
    </template>

    <template #logo>
      <NuxtLink to="/" class="inline-block" aria-label="Molki - Home">
        <Logo class="w-40 h-full" />
      </NuxtLink>
    </template>
  </FooterComponent>
</template>
