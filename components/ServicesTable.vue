<script setup lang="ts">
interface ServiceItem {
  name: string;
  basicFunc: boolean;
  premiumFunc: boolean;
  basicExec: boolean;
  premiumExec: boolean;
}

defineProps<{
  services?: ServiceItem[];
  infoText?: string;
  className?: string;
}>();

// Default services if none provided
const defaultServices = [
  {
    name: 'Inwentaryzacja',
    basicFunc: true,
    premiumFunc: true,
    basicExec: true,
    premiumExec: true,
  },
  {
    name: 'Wyburzenia/zabudowy ścian',
    basicFunc: true,
    premiumFunc: true,
    basicExec: true,
    premiumExec: true,
  },
  {
    name: 'Układ funkcjonalny z opisami',
    basicFunc: true,
    premiumFunc: true,
    basicExec: true,
    premiumExec: true,
  },
  {
    name: 'Lista zakupów (materiałów, mebli, dodatków)',
    basicFunc: true,
    premiumFunc: false,
    basicExec: true,
    premiumExec: true,
  },
];
</script>

<template>
  <section :class="className" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Table Container with horizontal scroll for mobile -->
        <div class="overflow-x-auto" data-scroll-item data-scroll-animation="fadeUp">
          <table class="w-full border-collapse">
            <!-- Header -->
            <thead>
              <tr>
                <th class="p-4"></th>
                <th
                  colspan="2"
                  class="p-4 text-center bg-primary-light text-neutral-100 rounded-tl-2xl rounded-tr-2xl"
                >
                  <div class="text-2xl font-semibold mb-2">Projekt Funkcjonalny</div>
                </th>
                <th
                  colspan="2"
                  class="p-4 text-center bg-primary text-neutral-100 rounded-tl-2xl rounded-tr-2xl"
                >
                  <div class="text-2xl font-semibold mb-2">Projekt Wykonawczy</div>
                </th>
              </tr>
              <tr class="border-b border-neutral-400">
                <th class="p-4"></th>
                <th class="p-4 text-center bg-primary-light text-neutral-100">
                  <div class="font-semibold">Podstawowy</div>
                  <div class="text-sm mt-1">od 60 zł/m²</div>
                </th>
                <th class="p-4 text-center bg-primary-light text-neutral-100">
                  <div class="font-semibold">Premium</div>
                  <div class="text-sm mt-1">od 120 zł/m²</div>
                </th>
                <th class="p-4 text-center bg-primary text-neutral-100">
                  <div class="font-semibold">Podstawowy</div>
                  <div class="text-sm mt-1">od 180 zł/m²</div>
                </th>
                <th class="p-4 text-center bg-primary text-neutral-100">
                  <div class="font-semibold">Premium</div>
                  <div class="text-sm mt-1">od 240 zł/m²</div>
                </th>
              </tr>
            </thead>
            <!-- Body -->
            <tbody>
              <slot name="services" />
            </tbody>
          </table>
        </div>

        <!-- Info Text -->
        <p v-if="infoText" class="text-sm text-neutral-600 mt-4">
          {{ infoText }}
        </p>
        <p v-else class="text-sm text-neutral-600 mt-4">
          **powyższe kwoty podane są w wartości netto, do ostatecznej wyceny należy doliczyć podatek
          VAT zgodny z aktualnymi przepisami prawa, minimalna kwota projektu to 2000 zł netto,
          niezależnie od ilości projektowanych pomieszczeń.
        </p>
      </div>
    </div>
  </section>
</template>
