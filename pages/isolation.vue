<template>
  <div>
    <FooterComponent>
      <template #logo>
        <Logo class="w-48" />
      </template>

      <template #sponsors>
        <div class="flex gap-4">
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
        </div>
      </template>

      <template #certifications>
        <div class="flex gap-4">
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
        </div>
      </template>

      <template #memberships>
        <div class="flex gap-4">
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
          <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
            <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
          </NuxtLink>
        </div>
      </template>

      <template #contactAddress>
        <p class="text-neutral-600">ul. Example 123,<br />00-000 City</p>
      </template>

      <template #contactEmail>
        <a href="mailto:contact@example.com" class="text-neutral-600 hover:text-primary">
          contact@example.com
        </a>
      </template>

      <template #contactPhone>
        <a href="tel:+48123456789" class="text-neutral-600 hover:text-primary"> +48 123 456 789 </a>
      </template>

      <template #socialLinks>
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
      </template>

      <template #copyrightText>
        <p>Company Name © {{ new Date().getFullYear() }}</p>
        <p>Wszelkie prawa zastrzeżone.</p>
        <p class="space-x-1">
          <NuxtLink
            to="/"
            class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
            >prywatność</NuxtLink
          >
          <span>/</span>
          <NuxtLink
            to="/"
            class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
            >ciasteczka</NuxtLink
          >
          <span>/</span>
          <NuxtLink
            to="/"
            class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
            >klauzula RODO</NuxtLink
          >
        </p>
      </template>

      <template #privacyText>
        <NuxtLink to="/" class="hover:text-primary"> Polityka prywatności </NuxtLink>
      </template>
    </FooterComponent>
    <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
