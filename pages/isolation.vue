<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>
    <ServicesTable :services="services" />
    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import ServicesTable from '~/components/ServicesTable.vue';

const services = [
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
