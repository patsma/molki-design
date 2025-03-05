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

          <template #contactAddress>
            <p class="text-neutral-600">ul. Heweliusza 11/811,<br />80-890 Gdańsk</p>
          </template>

          <template #contactEmail>
            <a href="mailto:kontakt@molki.pl" class="text-neutral-600 hover:text-primary">
              kontakt@molki.pl
            </a>
          </template>

          <template #contactPhone>
            <a href="tel:+48572323207" class="text-neutral-600 hover:text-primary">
              +48 572 323 207
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
                <IconBlock :name="`fig:${social}`" customClass="w-16 h-16 text-primary" />
              </NuxtLink>
            </div>
          </template>

          <template #copyrightText>
            <p>Company Name © {{ new Date().getFullYear() }}</p>
            <p>Wszelkie prawa zastrzeżone.</p>
            <p class="space-x-1">
              <NuxtLink
                to="/polityka-prywatnosci"
                class="text-neutral-500 hover:text-primary transition-colors duration-200 ease-in-out"
                >prywatność</NuxtLink
              >
              <span>/</span>
              <NuxtLink
                to="/polityka-prywatnosci#pliki-cookie"
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
    <CookieControl locale="pl" />
  </div>
</template>
