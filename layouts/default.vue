<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';

const { $gsap, $MorphSVGPlugin } = useNuxtApp();
useHead({
  title: 'Molki Design',
});

const menuStore = useMenuStore();
const loaderStore = useLoaderStore();

// Handle page transitions

// Initialize all required functionality
const initializeApp = () => {
  if (!process.client) return;

  try {
    $MorphSVGPlugin.convertToPath('circle, rect, ellipse, line, polygon, polyline'),
      menuStore.initAnimation($gsap),
      loaderStore.finishLoading();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    loaderStore.finishLoading();
  }
};

onMounted(() => {
  initializeApp();
});

// Watch for route changes
</script>

<template>
  <div>
    <!-- <NuxtLoadingIndicator class="fixed top-0 left-0 w-full h-4 z-[99999999999]" color="red" /> -->
    <GSAPScrollSmoother>
      <HeaderComponent />
      <Loader />

      <div class="">
        <NuxtPage />

        <!-- Pre-Footer Section -->
        <PreFooter>
          <template #title>Nasze oddziały</template>

          <template #backgroundImage>
            <ParallaxImg>
              <nuxt-img
                src="/heroAbout.jpg"
                alt="Full width parallax"
                class="parallax-content"
                format="webp"
              />
            </ParallaxImg>
          </template>

          <template #leftCompanyLogo>
            <Logo class="w-full max-w-[200px]" />
          </template>

          <template #leftCompanyTitle>Warszawa</template>

          <template #leftCompanySubtitle>Centrala</template>

          <template #leftCompanyText>ul. Przykładowa 123<br />00-000 Warszawa</template>

          <template #rightCompanyLogo>
            <Logo class="w-full max-w-[200px]" />
          </template>

          <template #rightCompanyTitle>Kraków</template>

          <template #rightCompanySubtitle>Oddział</template>

          <template #rightCompanyText>ul. Przykładowa 456<br />30-000 Kraków</template>

          <template #contactTitle>Skontaktuj się z nami</template>

          <template #contactInfo>
            Tel: +48 123 456 789<br />
            Email:
            <a href="mailto:kontakt@firma.pl" class="text-primary hover:text-primary-dark"
              >kontakt@firma.pl</a
            ><br />
            Godziny otwarcia<br />
            Pon-Pt: 9:00 - 17:00
          </template>
        </PreFooter>

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
            <a href="tel:+48123456789" class="text-neutral-600 hover:text-primary">
              +48 123 456 789
            </a>
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
      </div>
    </GSAPScrollSmoother>
  </div>
</template>
