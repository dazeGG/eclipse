<template>
  <div class="converter">
    <div class="converter__item">
      <input type="number" class="input converter__input" v-model="baseValue">
      <AppSelect :selected-value="baseCurrency" @select="value => this.baseCurrency = value"/>
    </div>
    <button class="converter__change">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
        <path fill="#D2D2D2"
              d="M9.49 25.31V.51H7.05v24.83l-2.2-2.2-1.73 1.72L8.25 30l5.14-5.14-1.73-1.72-2.17 2.17ZM26.88 5.14 21.75 0 16.6 5.14l1.73 1.72 2.19-2.19V29.5h2.44V4.67l2.19 2.2 1.72-1.73Z"/>
      </svg>
    </button>
    <div class="converter__item">
      <input type="number" class="input converter__input" v-model="computedValue">
      <AppSelect :selected-value="computedCurrency" @select="value => this.computedCurrency = value"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AppSelect from '@/components/AppSelect.vue'

const store = useStore()

const hasCurrencies = computed(() => store.getters.hasCurrencies)

onBeforeMount(async () => {
  if (!hasCurrencies.value) {
    await store.dispatch('getCurrencies')
  }
})

const baseValue = ref(1)
const computedValue = ref(1)

const baseCurrency = ref('USD')
const computedCurrency = ref('EUR')
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  &__item {
    display: grid;
    grid-template-columns: 200px auto;
  }

  &__input {
    border-radius: 10px 0 0 10px;
    font-size: 28px;
    font-weight: 300;
  }

  &__currency {
    border-radius: 0 10px 10px 0;
    border-left: 0;
    font-size: 22px;
    font-weight: 600;
  }

  &__change {
    padding: 10px;
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
