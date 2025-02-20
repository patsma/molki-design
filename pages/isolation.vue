<template>
  <div>
    <PricingGrid>
      <template #backgroundImage>
        <ParallaxImg class="w-full h-full object-cover">
          <nuxt-img src="/heroHome.jpg" alt="Pricing background" format="webp" loading="lazy" />
        </ParallaxImg>
      </template>

      <template #title> Wybierz Swoje Wymarzone Wykończenie </template>

      <template #subtitle>
        Odkryj Pakiety Remontowe Dostosowane do Twoich Potrzeb i Stylu Życia
      </template>

      <!-- Basic Plan -->
      <template #basicTitle>BASIC</template>
      <template #basicPrice>1190 zł/m²</template>
      <template #basicFeatures>
        <ul>
          <li>Rozbiórki i zabezpieczenia</li>
          <li>Instalacje zgodnie z projektem</li>
          <li>Szpachlowanie</li>
          <!-- Add more features -->
        </ul>
      </template>

      <!-- Comfort Plan -->
      <template #comfortTitle>COMFORT</template>
      <template #comfortPrice>1590 zł/m²</template>
      <template #comfortFeatures>
        <ul>
          <li>Rozbiórki i zabezpieczenia</li>
          <li>Instalacje zgodnie z projektem</li>
          <li>Szpachlowanie</li>
          <!-- Add more features -->
        </ul>
      </template>

      <!-- Premium Plan -->
      <template #premiumTitle>PREMIUM</template>
      <template #premiumPrice>2490 zł/m²</template>
      <template #premiumFeatures>
        <ul>
          <li>Rozbiórki i zabezpieczenia</li>
          <li>Instalacje zgodnie z projektem</li>
          <li>Szpachlowanie</li>
          <!-- Add more features -->
        </ul>
      </template>

      <template #infoText>
        *Powyższe ceny obowiązują w przypadku nieruchomości o powierzchni ≥ 40 m². Dla mniejszych
        metraży, a także większej ilości łazienek, kuchni, ew. schody, tarasy, ponadstandardowego
        stopnia skomplikowania projektu cena przeliczana jest indywidualnie.
      </template>
    </PricingGrid>
    <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
