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
      <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
        <IconBlock name="fig:wlasciwy-kurs" customClass="h-60 w-60 text-primary" />
      </NuxtLink>
    </template>

    <template #leftCompanyTitle>WŁAŚCIWY KURS</template>

    <template #leftCompanySubtitle>
      <b>Kursy, szkolenia, poradniki, wzory dokumentów.</b>
    </template>

    <template #leftCompanyText>
      Zapraszamy po więcej wiedzy, przydatnych informacji oraz gotowych rozwiązań dla wszystkich
      zainteresowanych inwestycjami w nieruchomości, obsługą wynajmu oraz projektowaniem wnętrz, a
      także wymianą doświadczenia i budowaniem sieci kontaktów wśród ludzi z branży.
    </template>

    <template #rightCompanyLogo>
      <NuxtLink to="/" class="text-primary hover:text-primary-dark transition-colors">
        <IconBlock name="fig:molki-logo-invest" customClass="h-60 w-60 text-primary" />
      </NuxtLink>
    </template>

    <template #rightCompanyTitle>MOLKI INVEST</template>

    <template #rightCompanySubtitle>
      <b>Nieruchomości inwestycyjne przygotowane do efektywnego wynajmu.</b>
    </template>

    <template #rightCompanyText>
      Inwestycje w nieruchomości dla Inwestorów Pasywnych. Pomagamy chronić i pomnażać kapitał oraz
      uzyskiwać dochód pasywny poprzez gotowce inwestycyjne przygotowane do efektywnego wynajmu.
      Zarządzamy najmem długoterminowym, krótkoterminowym oraz kwaterami pracowniczymi.
    </template>

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
</template>
