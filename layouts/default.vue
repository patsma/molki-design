<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';
import { useAppConfig } from '#app';
import IconBlock from '~/components/IconBlock.vue';

const { $gsap, $MorphSVGPlugin } = useNuxtApp();
useHead({
  title: 'Molki Design',
});

const menuStore = useMenuStore();
const loaderStore = useLoaderStore();
const cookieControl = ref(null);
const appConfig = useAppConfig();

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

// Show cookie control with animation after page load
const showCookieControl = () => {
  if (!process.client || !cookieControl.value) return;

  // Wait for the page to be fully loaded and loader to finish
  const waitForLoader = () => {
    if (loaderStore.isLoading) {
      // If still loading, check again in 100ms
      setTimeout(waitForLoader, 100);
      return;
    }

    // Loader is finished, now animate the cookie control
    $gsap.fromTo(
      cookieControl.value,
      {
        opacity: 0,
        y: 20, // Start slightly below final position
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 2, // Add delay after loader finishes
      }
    );
  };

  // Start checking if loader is finished
  waitForLoader();
};

onMounted(() => {
  initializeApp();
  showCookieControl();
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
                src="/heroFooter.jpg"
                alt="Full width parallax"
                class="parallax-content"
                format="webp"
              />
            </ParallaxImg>
          </template>

          <template #leftCompanyLogo>
            <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
              <IconBlock name="fig:molki-logo-akademia" customClass="h-60 w-60 text-primary" />
            </NuxtLink>
          </template>

          <template #leftCompanyTitle>AKADEMIA MOLKI</template>

          <template #leftCompanySubtitle
            ><b>Kursy, szkolenia, poradniki, wzory dokumentów.</b>
          </template>

          <template #leftCompanyText
            >Zapraszamy po więcej wiedzy, przydatnych informacji oraz gotowych rozwiązań dla
            wszystkich zainteresowanych inwestycjami w nieruchomości, obsługą wynajmu oraz
            projektowaniem wnętrz, a także wymianą doświadczenia i budowaniem sieci kontaktów wśród
            ludzi z branży.</template
          >

          <template #rightCompanyLogo>
            <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
              <IconBlock name="fig:molki-logo-invest" customClass="h-60 w-60 text-primary" />
            </NuxtLink>
          </template>

          <template #rightCompanyTitle>MOLKI INVEST</template>

          <template #rightCompanySubtitle
            ><b>Nieruchomości inwestycyjne przygotowane do efektywnego wynajmu.</b></template
          >

          <template #rightCompanyText
            >Inwestycje w nieruchomości dla Inwestorów Pasywnych. Pomagamy chronić i pomnażać
            kapitał oraz uzyskiwać dochód pasywny poprzez gotowce inwestycyjne przygotowane do
            efektywnego wynajmu. Zarządzamy najmem długoterminowym, krótkoterminowym oraz kwaterami
            pracowniczymi.</template
          >

          <template #contactTitle>Kontakt</template>

          <template #contactInfo>
            Molki Sp. z o.o.<br />
            NIP: 957-112-91-57<br />
            ul. Heweliusza 11/811<br />
            80-890 Gdańsk<br />
            Tel:
            <a href="tel:+48572323207" class="text-primary hover:text-primary-dark"
              >+48 572 323 207</a
            ><br />
            Email:
            <a href="mailto:kontakt@molki.pl" class="text-primary hover:text-primary-dark"
              >kontakt@molki.pl</a
            ><br />
            Godziny otwarcia:<br />
            Pon-Pt: 9:00 - 17:00
          </template>
        </PreFooter>

        <FooterComponent>
          <template #logo>
            <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
              <IconBlock name="fig:molki-logo-design" customClass="w-60 h-60 text-primary" />
            </NuxtLink>
          </template>

          <template #sponsors>
            <div class="flex gap-4">
              <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                <IconBlock name="fig:club01" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
            </div>
          </template>

          <template #certifications>
            <div class="flex gap-4">
              <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                <IconBlock name="fig:cert01" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
              <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                <IconBlock name="fig:cert02" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
            </div>
          </template>

          <template #memberships>
            <div class="flex gap-4">
              <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
                <IconBlock name="fig:cert03" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
            </div>
          </template>

          <!-- Provide socialLinks for when it's needed in the slots -->
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
            <p>{{ appConfig.studio.title || 'Molki Design' }} © {{ new Date().getFullYear() }}</p>
            <p>Wszelkie prawa zastrzeżone.</p>
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
        </FooterComponent>
      </div>

      <!-- Cookie Control Banner -->
    </GSAPScrollSmoother>
    <!-- Place cookie control outside ScrollSmoother to prevent interference -->
    <div ref="cookieControl" class="grid opacity-0 fixed bottom-0 left-0 right-0 z-[100]">
      <CookieControl locale="pl" />
    </div>
  </div>
</template>
