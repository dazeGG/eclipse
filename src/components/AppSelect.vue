<template>
  <select v-model="value" class="input converter__currency" @change="emit('select', value)"
          style="text-align: center">
    <option v-for="currency in currencies" :key="currency.ID">
      {{ currency.CharCode }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  selectedValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select'])

const store = useStore()

const currencies = computed(() => store.getters.getCurrencies)

const value = ref(props.selectedValue)

watch(
  () => props.selectedValue,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      value.value = newValue
    }
  }
)
</script>
