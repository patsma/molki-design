<script setup>
import { useMenuStore } from '@/stores/menuStore';
import { useAppConfig } from '#app';

const { $gsap } = useNuxtApp();
const menuStore = useMenuStore();
const appConfig = useAppConfig();

// Initialize animations
onMounted(() => {
  if (!process.client) return;

  // Initialize menu animations
  try {
    menuStore.setupMobileMenu();
  } catch (error) {
    console.error('Failed to initialize menu:', error);
  }

  // Simple cookie banner animation
  setTimeout(() => {
    $gsap.to('.cookie-banner', { autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
  }, 2000);
});

// Clean up animations when component is unmounted
onUnmounted(() => {
  if (!process.client) return;

  // Cleanup any global animations if needed
  menuStore.cleanup();
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#b76246" />
    <HeaderComponent />

    <main>
      <NuxtPage />
      <!-- Pre-Footer Section -->
      <PreFooter>
        <template #title>Zobacz Również</template>

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
            <IconBlock name="fig:wlasciwy-kurs" customClass="h-60 w-60 text-primary" />
          </NuxtLink>
        </template>

        <template #leftCompanyTitle>WŁAŚCIWY KURS</template>

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
          >Inwestycje w nieruchomości dla Inwestorów Pasywnych. Pomagamy chronić i pomnażać kapitał
          oraz uzyskiwać dochód pasywny poprzez gotowce inwestycyjne przygotowane do efektywnego
          wynajmu. Zarządzamy najmem długoterminowym, krótkoterminowym oraz kwaterami
          pracowniczymi.</template
        >

        <template #contactTitle>Kontakt</template>

        <template #contactInfo>
          Molki Sp. z o.o.<br />
          NIP: 957-112-91-57<br />
          ul. Heweliusza 11/811<br />
          80-890 Gdańsk<br />
          Tel:
          <a href="tel:+48572323207" class="text-primary hover:text-primary-dark">+48 572 323 207</a
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
    </main>

    <div class="cookie-banner fixed opacity-0 invisible bottom-0 left-0 right-0 z-[100]">
      <CookieControl locale="pl" />
    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Cookie banner */
.cookie-banner {
  visibility: hidden;
}
</style>
