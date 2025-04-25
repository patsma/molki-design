<script setup>
import { useAppConfig } from '#app';
import { computed } from 'vue';

const appConfig = useAppConfig();

// Fallback data
const fallbackData = {
  companyInfo: 'Molki Sp. z o.o.\nNIP: 957-112-91-57\nul. Heweliusza 11/811\n80-890 Gdańsk',
  officeInfo: 'ul. Mostowa 1/4 pokój 2\n80-778 Gdańsk',
  phone: '+48 572 323 207',
  email: 'kontakt@molki.pl',
  wlasciwyKurs: {
    url: 'https://wlasciwykurs.com/',
    title: 'WŁAŚCIWY KURS',
    subtitle: 'Kursy, szkolenia, poradniki, wzory dokumentów.',
    description:
      'Zapraszamy po więcej wiedzy, przydatnych informacji oraz gotowych rozwiązań dla wszystkich zainteresowanych inwestycjami w nieruchomości, obsługą wynajmu oraz projektowaniem wnętrz, a także wymianą doświadczenia i budowaniem sieci kontaktów wśród ludzi z branży.',
  },
  molkiInvest: {
    url: 'https://molkiinvest.pl/',
    title: 'MOLKI INVEST',
    subtitle: 'Nieruchomości inwestycyjne przygotowane do efektywnego wynajmu.',
    description:
      'Inwestycje w nieruchomości dla Inwestorów Pasywnych. Pomagamy chronić i pomnażać kapitał oraz uzyskiwać dochód pasywny poprzez gotowce inwestycyjne przygotowane do efektywnego wynajmu. Zarządzamy najmem długoterminowym, krótkoterminowym oraz kwaterami pracowniczymi.',
  },
};

// Computed properties for content with fallbacks
const companyInfo = computed(() => appConfig.contactInfo?.companyInfo || fallbackData.companyInfo);
const officeInfo = computed(() => appConfig.contactInfo?.officeInfo || fallbackData.officeInfo);
const phone = computed(() => appConfig.contactInfo?.phone || fallbackData.phone);
const email = computed(() => appConfig.contactInfo?.email || fallbackData.email);

const wlasciwyKurs = computed(() => ({
  url: appConfig.companies?.wlasciwyKurs?.url || fallbackData.wlasciwyKurs.url,
  title: appConfig.companies?.wlasciwyKurs?.title || fallbackData.wlasciwyKurs.title,
  subtitle: appConfig.companies?.wlasciwyKurs?.subtitle || fallbackData.wlasciwyKurs.subtitle,
  description:
    appConfig.companies?.wlasciwyKurs?.description || fallbackData.wlasciwyKurs.description,
}));

const molkiInvest = computed(() => ({
  url: appConfig.companies?.molkiInvest?.url || fallbackData.molkiInvest.url,
  title: appConfig.companies?.molkiInvest?.title || fallbackData.molkiInvest.title,
  subtitle: appConfig.companies?.molkiInvest?.subtitle || fallbackData.molkiInvest.subtitle,
  description:
    appConfig.companies?.molkiInvest?.description || fallbackData.molkiInvest.description,
}));
</script>

<template>
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
      <NuxtLink
        :to="wlasciwyKurs.url"
        target="_blank"
        class="text-primary hover:text-primary-dark transition-colors"
      >
        <IconBlock name="fig:wlasciwy-kurs" customClass="h-60 w-60 text-primary" />
      </NuxtLink>
    </template>

    <template #leftCompanyTitle>{{ wlasciwyKurs.title }}</template>

    <template #leftCompanySubtitle>
      <b>{{ wlasciwyKurs.subtitle }}</b>
    </template>

    <template #leftCompanyText>
      {{ wlasciwyKurs.description }}
    </template>

    <template #rightCompanyLogo>
      <NuxtLink
        :to="molkiInvest.url"
        target="_blank"
        class="text-primary hover:text-primary-dark transition-colors"
      >
        <IconBlock name="fig:molki-logo-invest" customClass="h-60 w-60 text-primary" />
      </NuxtLink>
    </template>

    <template #rightCompanyTitle>{{ molkiInvest.title }}</template>

    <template #rightCompanySubtitle>
      <b>{{ molkiInvest.subtitle }}</b>
    </template>

    <template #rightCompanyText>
      {{ molkiInvest.description }}
    </template>

    <template #contactTitle>Kontakt</template>

    <template #contactInfo>
      <div v-html="companyInfo.replace(/\n/g, '<br />')" />

      Tel:
      <a :href="`tel:${phone}`" class="text-primary hover:text-primary-dark">{{ phone }}</a
      ><br />
      Email:
      <a :href="`mailto:${email}`" class="text-primary hover:text-primary-dark">{{ email }}</a
      ><br />

      <br />
      <span class="text-xl text-primary font-title font-semibold pb-4 border-gradient">Biuro:</span>
      <br />
      <div v-html="officeInfo.replace(/\n/g, '<br />')" />
    </template>
  </PreFooter>
</template>
