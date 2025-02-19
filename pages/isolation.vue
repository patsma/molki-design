<template>
  <div>
    <PreFooter>
      <template #title>Nasze oddziały</template>
      <template #backgroundImage>
        <ParallaxImg
          src="/preFooterBg.jpg"
          alt="Pre-footer background"
          class="w-full h-full object-cover"
          format="webp"
        />
      </template>

      <!-- Left Company -->
      <template #leftCompanyLogo>
        <Logo class="w-full max-w-[200px]" />
      </template>
      <template #leftCompanyTitle>Warszawa</template>
      <template #leftCompanySubtitle>Centrala</template>
      <template #leftCompanyText>
        ul. Przykładowa 123<br />
        00-000 Warszawa
      </template>

      <!-- Right Company -->
      <template #rightCompanyLogo>
        <Logo class="w-full max-w-[200px]" />
      </template>
      <template #rightCompanyTitle>Kraków</template>
      <template #rightCompanySubtitle>Oddział</template>
      <template #rightCompanyText>
        ul. Przykładowa 456<br />
        30-000 Kraków
      </template>

      <!-- Contact Section -->
      <template #contactTitle>Skontaktuj się z nami</template>
      <template #contactInfo>
        <p>Tel: +48 123 456 789</p>
        <p>Email: kontakt@firma.pl</p>
        <p>Godziny otwarcia:<br />Pon-Pt: 9:00 - 17:00</p>
      </template>
    </PreFooter>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
