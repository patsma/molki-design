<script setup lang="ts">
// We'll add props and logic later
</script>

<template>
  <section class="py-24" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Table Container with horizontal scroll for mobile -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <!-- Header -->
            <thead>
              <tr>
                <th class="p-4 bg-neutral-200"></th>
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
                <th class="p-4 bg-neutral-200"></th>
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
              <tr class="border-b border-neutral-400">
                <td class="p-4 bg-neutral-200 font-medium">Inwentaryzacja</td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
              </tr>
              <tr class="border-b border-neutral-400">
                <td class="p-4 bg-neutral-200 font-medium">Wyburzenia/zabudowy ścian</td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
                <td class="p-4 text-center align-middle h-[4.5rem]">
                  <div class="flex items-center justify-center h-full">
                    <Icon name="uil:check" class="w-6 h-6 text-primary" />
                  </div>
                </td>
              </tr>
              <tr class="border-b border-neutral-400">
                <td class="p-4 bg-neutral-200 font-medium">Układ funkcjonalny z opisami</td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
              </tr>
              <tr class="border-b border-neutral-400">
                <td class="p-4 bg-neutral-200 font-medium">
                  Lista zakupów (materiałów, mebli, dodatków)
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:times" class="w-6 h-6 text-neutral-500 mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
                <td class="p-4 text-center">
                  <Icon name="uil:check" class="w-6 h-6 text-primary mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Info Text -->
        <p class="text-sm text-neutral-600 mt-4">
          **powyższe kwoty podane są w wartości netto, do ostatecznej wyceny należy doliczyć podatek
          VAT zgodny z aktualnymi przepisami prawa, minimalna kwota projektu to 2000 zł netto,
          niezależnie od ilości projektowanych pomieszczeń.
        </p>
      </div>
    </div>
  </section>
</template>
