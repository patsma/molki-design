<template>
  <div>
    <div class="content-grid py-24">
      <div class="breakout1">Lorem ipsum dolor, sit amet consectetur adipisicing elit...</div>
    </div>

    <FooterComponent>
      <!-- Logo -->
      <template #logo>
        <Logo class="w-64" />
      </template>

      <!-- Sponsors -->
      <template #sponsors>
        <div class="grid grid-cols-2 gap-4">
          <Logo class="w-32" />
          <Logo class="w-32" />
        </div>
      </template>

      <!-- Certifications -->
      <template #certifications>
        <div class="grid grid-cols-2 gap-4">
          <Logo class="w-32" />
          <Logo class="w-32" />
        </div>
      </template>

      <!-- Contact Info -->
      <template #contactAddress>
        ul. Custom 123,<br />
        00-000 Warsaw
      </template>

      <template #contactEmail> custom@email.com </template>

      <template #contactPhone> +48 123 456 789 </template>

      <!-- Memberships -->
      <template #memberships>
        <div class="grid grid-cols-2 gap-4">
          <Logo class="w-32" />
          <Logo class="w-32" />
        </div>
      </template>

      <!-- Social Links -->
      <template #socialLinks>
        <div class="flex space-x-4">
          <a href="https://custom-linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://custom-instagram.com" target="_blank">Instagram</a>
          <a href="https://custom-facebook.com" target="_blank">Facebook</a>
        </div>
      </template>

      <!-- Copyright -->
      <template #copyrightText>
        Custom Company © 2024<br />
        All rights reserved.
      </template>

      <!-- Privacy -->
      <template #privacyText>
        / privacy / cookies /<br />
        GDPR notice
      </template>
    </FooterComponent>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
