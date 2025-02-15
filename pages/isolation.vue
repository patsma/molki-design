<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>
    <ServicesTable>
      <template #services>
        <ServiceTableRow
          name="Inwentaryzacja"
          :basicFunc="true"
          :premiumFunc="true"
          :basicExec="true"
          :premiumExec="true"
        />
        <ServiceTableRow
          name="Wyburzenia/zabudowy ścian"
          :basicFunc="true"
          :premiumFunc="true"
          :basicExec="true"
          :premiumExec="true"
        />
        <ServiceTableRow
          name="Układ funkcjonalny z opisami"
          :basicFunc="true"
          :premiumFunc="true"
          :basicExec="true"
          :premiumExec="true"
        />
        <ServiceTableRow
          name="Lista zakupów (materiałów, mebli, dodatków)"
          :basicFunc="true"
          :premiumFunc="false"
          :basicExec="true"
          :premiumExec="true"
        />
      </template>
    </ServicesTable>
    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import ServicesTable from '~/components/ServicesTable.vue';
import ServiceTableRow from '~/components/ServiceTableRow.vue';
</script>
