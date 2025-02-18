<template>
  <div class="content-grid py-20">
    <InfoPricing>
      <template #title>Dodatkowe usługi projektowe</template>

      <template #image>
        <ParallaxImg>
          <nuxt-img
            src="/heroInterior.jpg"
            alt="Interior Design Services"
            class="w-full h-full object-cover"
            format="webp"
          />
        </ParallaxImg>
      </template>

      <template #content>
        <h3>Konsultacja przedprojektowa - 190 zł/h</h3>

        <h4>Dodatkowe Usługi - wyceny indywidualne</h4>
        <ul>
          <li>Projekty niestandardowe, konsultacje z zakresu sztuki</li>
          <li>Doradztwo w zakresie wyboru materiałów i mebli</li>
          <li>Realizacja i Nadzór Autorski</li>
          <li>Inwentaryzacja bez projektu</li>
        </ul>
      </template>
    </InfoPricing>
  </div>
</template>

<script setup></script>
