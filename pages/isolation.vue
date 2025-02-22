<template>
  <div>
    <!-- HubSpot Form Section -->
    <section class="content-grid py-24">
      <div class="content">
        <h2 class="text-3xl font-bold mb-8">Skontaktuj się z nami</h2>

        <!-- Debug Info (only in development) -->
        <div v-if="isDev" class="mb-4 p-4 bg-gray-100 rounded-lg text-sm">
          <p class="font-semibold mb-2">HubSpot Form Debug Info:</p>
          <p>Form ID: 451093eb-38a4-4af8-ac3e-b1f50a824b47</p>
          <p>Portal ID: {{ config.public.hubspotPortalId }}</p>
          <p>Script Status: {{ hubspotFormStatus }}</p>
          <button
            @click="checkHubspotStatus"
            class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Check Status
          </button>
        </div>

        <!-- HubSpot Form -->
        <ClientOnly>
          <HubspotForm
            formId="451093eb-38a4-4af8-ac3e-b1f50a824b47"
            region="eu1"
            @load="handleFormLoad"
            @error="handleFormError"
          />
          <template #fallback>
            <div class="animate-pulse">
              <div class="h-12 bg-gray-200 rounded mb-4"></div>
              <div class="h-12 bg-gray-200 rounded mb-4"></div>
              <div class="h-12 bg-gray-200 rounded"></div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

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

const config = useRuntimeConfig();
const isDev = config.public.isDev;
const hubspotFormStatus = ref('Initializing...');

const checkHubspotStatus = () => {
  if (process.client) {
    hubspotFormStatus.value = window.hbspt
      ? 'HubSpot Forms SDK Loaded'
      : 'HubSpot Forms SDK Not Found';
    console.log('HubSpot Form Debug:', {
      hbsptExists: !!window.hbspt,
      portalId: config.public.hubspotPortalId,
      formId: '451093eb-38a4-4af8-ac3e-b1f50a824b47',
      domain: window.location.hostname,
    });
  }
};

const handleFormLoad = () => {
  hubspotFormStatus.value = 'Form Loaded Successfully';
  console.log('HubSpot form loaded successfully');
};

const handleFormError = (error: any) => {
  hubspotFormStatus.value = `Error: ${error}`;
  console.error('HubSpot form error:', error);
};

// Check initial status
onMounted(() => {
  if (isDev) {
    setTimeout(checkHubspotStatus, 2000); // Check after 2 seconds to allow script to load
  }
});
</script>

<style scoped>
/* Add any custom form styles here */
:deep(.hubspot-form-container) {
  @apply max-w-2xl mx-auto;
}

:deep(.hs-form) {
  @apply space-y-4;
}

:deep(.hs-form input[type='text']),
:deep(.hs-form input[type='email']),
:deep(.hs-form textarea) {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent;
}

:deep(.hs-form-required) {
  @apply text-red-500;
}

:deep(.hs-error-msg) {
  @apply text-red-500 text-sm mt-1;
}

:deep(.hs-submit .actions) {
  @apply mt-6;
}

:deep(.hs-button) {
  @apply bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-200;
}
</style>
