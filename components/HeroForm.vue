<script setup lang="ts">
// Define props for the component
defineProps<{
  ctaLink?: string;
}>();

defineSlots<{
  heroImage?: (props: {}) => any;
  title?: (props: { mdcUnwrap: string }) => any;
  description?: (props: { mdcUnwrap: string }) => any;
  submitText?: (props: {}) => any;
  infoText?: (props: {}) => any;
}>();

// Form state
const formState = ref<'idle' | 'success' | 'error'>('idle');
const isSubmitting = ref(false);

// Handle form submission
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  formState.value = 'idle';

  try {
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as any).toString(),
    });

    if (response.ok) {
      formState.value = 'success';
      form.reset();
    } else {
      formState.value = 'error';
    }
  } catch (error) {
    formState.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    class="full-width data-scroll-section relative min-h-[100vh] w-full overflow-hidden"
    data-scroll-section
  >
    <div class="relative">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-black/30 z-10"></div>
        <slot name="heroImage">
          <!-- Default image -->
          <ParallaxImg
            src="/heroInterior.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </slot>
      </div>

      <!-- SVG Accent Shape -->
      <div class="absolute top-1/2 -left-10 overflow-hidden">
        <HeroPath class="h-screen" />
      </div>

      <!-- Content Container -->
      <div class="content-grid w-full relative z-10 grid min-h-screen content-end gap-y-8">
        <div class="breakout1 grid md:grid-cols-2 items-center gap-8 py-16">
          <!-- Left Column: Form Section -->
          <div
            class="bg-white/95 p-8 md:p-12 rounded-lg shadow-lg"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <h2
              v-if="$slots.title"
              class="h2-style font-semibold text-primary mb-6"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
            >
              <slot name="title" mdc-unwrap="p" />
            </h2>

            <div
              v-if="$slots.description"
              class="text-lg text-neutral-700 mb-8"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
            >
              <slot name="description" mdc-unwrap="p" />
            </div>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              action="/buttons"
              class="space-y-6"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
            >
              <!-- This hidden input is required for Netlify Forms -->
              <input type="hidden" name="form-name" value="contact" />

              <!-- Form Status Messages -->
              <div v-if="formState !== 'idle'" class="mb-6">
                <div
                  v-if="formState === 'success'"
                  class="p-4 bg-green-50 border border-green-200 rounded-md"
                >
                  <p class="text-green-800">
                    Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.
                  </p>
                </div>
                <div
                  v-if="formState === 'error'"
                  class="p-4 bg-red-50 border border-red-200 rounded-md"
                >
                  <p class="text-red-800">
                    Przepraszamy, wystąpił błąd. Spróbuj ponownie później lub skontaktuj się z nami
                    bezpośrednio.
                  </p>
                </div>
              </div>

              <div>
                <label for="name" class="block text-sm font-medium text-neutral-700">Imię</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  class="mt-2 w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Twoje imię"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-neutral-700">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  class="mt-2 w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="twoj@email.com"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-neutral-700"
                  >Wiadomość</label
                >
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="4"
                  class="mt-2 w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Twoja wiadomość..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <slot name="submitText" mdc-unwrap="p">Wyślij wiadomość</slot>
              </button>
            </form>
          </div>

          <!-- Right Column: Empty for background visibility -->
          <div></div>
        </div>

        <!-- Info Text Section -->
        <div
          v-if="$slots.infoText"
          class="breakout1 mb-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
          data-scroll-independent="true"
          data-scroll-start="top bottom"
        >
          <div class="py-8 md:py-12">
            <div class="text-xl md:text-2xl leading-relaxed text-white">
              <slot name="infoText" mdc-unwrap="p" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
