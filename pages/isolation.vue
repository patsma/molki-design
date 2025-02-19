<template>
  <div>
    <PreFooter>
      <template #title>Nasze oddziały</template>
      <template #backgroundImage>
        <ParallaxImg src="/heroHome.jpg" alt="Pre-footer background" />
      </template>

      <!-- Left Company -->
      <template #leftCompanyTitle>Warszawa</template>
      <template #leftCompanySubtitle>Centrala</template>
      <template #leftCompanyText>
        ul. Przykładowa 123<br />
        00-000 Warszawa
      </template>

      <!-- Right Company -->
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

<script setup></script>
