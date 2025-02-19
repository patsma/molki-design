<script setup lang="ts">
import { ref } from 'vue';

const formState = ref<'idle' | 'success' | 'error'>('idle');
const isSubmitting = ref(false);

const props = defineProps<{
  class?: string;
}>();

defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  description?: (props: { mdcUnwrap: string }) => any;
  submitText?: (props: {}) => any;
}>();

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
  <div :class="['bg-white/95 p-8 md:p-12 rounded-lg shadow-lg', props.class]">
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
      class="space-y-6"
      data-scroll-item
      data-scroll-animation="fadeUp"
      data-scroll-duration="1"
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
        <div v-if="formState === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-md">
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
        <label for="message" class="block text-sm font-medium text-neutral-700">Wiadomość</label>
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
        <slot v-else name="submitText" mdc-unwrap="p">Wyślij wiadomość</slot>
      </button>
    </form>
  </div>
</template>
