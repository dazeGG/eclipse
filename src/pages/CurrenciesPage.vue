<template>
  <h1 style="margin: 25px 0;">Список валют</h1>
  <CurrenciesFilter/>
  <CurrenciesTable/>
</template>

<script setup lang="ts">
import CurrenciesFilter from '@/components/CurrenciesFilter.vue'
import CurrenciesTable from '@/components/CurrenciesTable.vue'
</script>
