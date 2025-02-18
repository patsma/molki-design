<template>
  <div>
    <HeroForm>
      <template #title> Skontaktuj się z nami </template>

      <template #description>
        Wypełnij formularz, a my skontaktujemy się z Tobą jak najszybciej.
      </template>

      <template #heroImage>
        <ParallaxImg>
          <nuxt-img src="/heroHome.jpg" alt="Contact us" class="parallax-content" format="webp" />
        </ParallaxImg>
      </template>

      <template #infoText>
        Wszystkie przesłane dane są chronione zgodnie z naszą polityką prywatności. Odpowiemy na
        Twoją wiadomość w ciągu 24 godzin.
      </template>
    </HeroForm>
  </div>
</template>

<script setup></script>
