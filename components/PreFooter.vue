<script setup lang="ts">
// Define slots
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  backgroundImage?: (props: {}) => any;
  // Left column slots
  leftCompanyLogo?: (props: {}) => any;
  leftCompanyTitle?: (props: { mdcUnwrap: string }) => any;
  leftCompanySubtitle?: (props: { mdcUnwrap: string }) => any;
  leftCompanyText?: (props: { mdcUnwrap: string }) => any;
  // Right column slots
  rightCompanyLogo?: (props: {}) => any;
  rightCompanyTitle?: (props: { mdcUnwrap: string }) => any;
  rightCompanySubtitle?: (props: { mdcUnwrap: string }) => any;
  rightCompanyText?: (props: { mdcUnwrap: string }) => any;
  // Contact section slots
  contactTitle?: (props: { mdcUnwrap: string }) => any;
  contactInfo?: (props: { mdcUnwrap: string }) => any;
}>();

// Form state (reused from HeroForm)
const formState = ref<'idle' | 'success' | 'error'>('idle');
const isSubmitting = ref(false);

// Handle form submission
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  formState.value = 'idle';

  try {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
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
  <section class="full-width data-scroll-section relative w-full py-24" data-scroll-section>
    <!-- Background with overlay -->
    <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-white/80 z-10"></div>
      <slot name="backgroundImage">
        <!-- Default background image -->
        <ParallaxImg
          src="/preFooterBg.jpg"
          alt="Pre-footer background"
          class="h-full w-full object-cover"
          format="webp"
        />
      </slot>
    </div>

    <div class="content-grid relative z-10">
      <!-- Main Title -->
      <h2
        v-if="$slots.title"
        class="h2-style text-center font-semibold text-primary mb-16"
        data-scroll-item
        data-scroll-animation="fadeUp"
        data-scroll-duration="1"
      >
        <slot name="title" mdc-unwrap="p" />
      </h2>

      <div class="breakout1">
        <!-- Company Information Grid -->
        <div
          class="grid md:grid-cols-2 gap-12 mb-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Left Company -->
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="flex justify-center items-center">
              <slot name="leftCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <h3 v-if="$slots.leftCompanyTitle" class="text-xl font-semibold text-primary">
                <slot name="leftCompanyTitle" mdc-unwrap="p" />
              </h3>
              <h4 v-if="$slots.leftCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="leftCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.leftCompanyText" class="text-neutral-700">
                <slot name="leftCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>

          <!-- Right Company -->
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="flex justify-center items-center">
              <slot name="rightCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <h3 v-if="$slots.rightCompanyTitle" class="text-xl font-semibold text-primary">
                <slot name="rightCompanyTitle" mdc-unwrap="p" />
              </h3>
              <h4 v-if="$slots.rightCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="rightCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.rightCompanyText" class="text-neutral-700">
                <slot name="rightCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>
        </div>

        <!-- Contact and Form Section -->
        <div
          class="grid md:grid-cols-2 gap-12"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Contact Information -->
          <div class="space-y-6">
            <h3 v-if="$slots.contactTitle" class="text-xl font-semibold pb-4 border-gradient">
              <slot name="contactTitle" mdc-unwrap="p" />
            </h3>
            <div v-if="$slots.contactInfo" class="prose prose-lg max-w-none">
              <slot name="contactInfo" mdc-unwrap="p" />
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white/95 p-8 rounded-lg shadow-lg">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              class="space-y-6"
              @submit="handleSubmit"
            >
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
                  <p class="text-red-800">Przepraszamy, wystąpił błąd. Spróbuj ponownie później.</p>
                </div>
              </div>

              <!-- Form Fields -->
              <div>
                <label for="name" class="block text-sm font-medium text-neutral-700">Imię</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  class="mt-2 w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Twoje imię"
                  :disabled="isSubmitting"
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
                  :disabled="isSubmitting"
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
                  :disabled="isSubmitting"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full rounded-md bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Wysyłanie...</span>
                <span v-else>Wyślij wiadomość</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.border-gradient {
  border-bottom: 0.1rem solid;
  border-image: linear-gradient(to right, #b76246, #d0835f, #a04225) 1;
}
</style>
