<template>
  <div class="converter">
    <div class="converter__title">
      <h1>Конвертер</h1>
      <div class="converter__postscript">
        <b>[</b>Работает через RUB<b>]</b>
      </div>
    </div>
    <div class="converter__item">
      <input type="number" class="input converter__input" v-model="baseValue" @input="convert">
      <AppSelect :selected-value="baseCurrency" @select="selectBaseCurrency"/>
    </div>
    <button class="converter__change" @click="change">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
        <path fill="#D2D2D2"
              d="M9.49 25.31V.51H7.05v24.83l-2.2-2.2-1.73 1.72L8.25 30l5.14-5.14-1.73-1.72-2.17 2.17ZM26.88 5.14 21.75 0 16.6 5.14l1.73 1.72 2.19-2.19V29.5h2.44V4.67l2.19 2.2 1.72-1.73Z"/>
      </svg>
    </button>
    <div class="converter__item">
      <input type="number" class="input converter__input" v-model="computedValue" disabled>
      <AppSelect :selected-value="computedCurrency" @select="selectComputedCurrency"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AppSelect from '@/components/AppSelect.vue'

const store = useStore()

const baseValue = ref(1)
const computedValue = computed(() => store.getters.getComputedValue)

const baseCurrency = ref('USD')
const computedCurrency = ref('EUR')

const convert = async (): Promise<void> => await store.dispatch('convert', {
  baseValue: baseValue.value,
  baseCurrency: baseCurrency.value,
  computedCurrency: computedCurrency.value
})

const hasCurrencies = computed(() => store.getters.hasCurrencies)

onBeforeMount(async () => {
  if (!hasCurrencies.value) {
    await store.dispatch('getCurrencies')
  }
  await convert()
})

const selectBaseCurrency = async (value: string): Promise<void> => {
  baseCurrency.value = value
  await convert()
}

const selectComputedCurrency = async (value: string): Promise<void> => {
  computedCurrency.value = value
  await convert()
}

const change = async (): Promise<void> => {
  baseValue.value = computedValue.value;
  [baseCurrency.value, computedCurrency.value] = [computedCurrency.value, baseCurrency.value]
  await convert()
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 54px * 2);
  gap: 25px;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 25px 0;
  }

  &__postscript {
    font-size: 26px;
    font-weight: 500;
  }

  &__item {
    display: grid;
    grid-template-columns: auto auto;
  }

  &__input {
    border-radius: 10px 0 0 10px;
    font-size: 28px;
    font-weight: 300;
    border-right: 0;
  }

  &__currency {
    border-radius: 0 10px 10px 0;
    font-size: 22px;
    font-weight: 600;
  }

  &__change {
    padding: 10px 12px;
    background-color: #FAFAFA;
    width: fit-content;
    border: 1px solid $grey-border;
    border-radius: 10px;

    > svg > path {
      transition: 200ms;
    }

    &:hover {
      > svg > path {
        fill: $black;
      }
    }
  }
}
</style>
