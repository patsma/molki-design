<template>
  <div>
    <FooterComponent>
      <template #logo>
        <Logo class="w-48" />
      </template>

      <template #sponsors>
        <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
        <IconBlock name="uil:building" customClass="w-16 h-16 text-primary" />
      </template>

      <template #certifications>
        <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
        <IconBlock name="uil:check-circle" customClass="w-16 h-16 text-primary" />
      </template>

      <template #memberships>
        <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
        <IconBlock name="uil:users-alt" customClass="w-16 h-16 text-primary" />
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
          <IconBlock name="uil:linkedin" customClass="w-6 h-6 text-primary" />
          <IconBlock name="uil:instagram" customClass="w-6 h-6 text-primary" />
          <IconBlock name="uil:facebook" customClass="w-6 h-6 text-primary" />
        </div>
      </template>

      <template #copyrightText>
        <p>Company Name © {{ new Date().getFullYear() }}</p>
        <p>Wszelkie prawa zastrzeżone.</p>
        <p>
          <NuxtLink to="/" class="hover:text-primary">prywatność</NuxtLink> /
          <NuxtLink to="/" class="hover:text-primary">ciasteczka</NuxtLink> /
          <NuxtLink to="/" class="hover:text-primary">klauzula RODO</NuxtLink>
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
