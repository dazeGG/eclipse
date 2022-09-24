<template>
  <h1>Список валют</h1>
  {{ currencies }}
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currencies = computed(() => store.getters.getCurrencies)

onBeforeMount(async () => {
  await store.dispatch('getCurrencies')
})
</script>
