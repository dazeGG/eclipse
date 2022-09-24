<template>
  <div class="filter input">
    <span class="filter__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
        <path fill="#D2D2D2"
              d="M8.4.4a8 8 0 1 0 5 14.2l4.8 4.8a.8.8 0 1 0 1.2-1.2l-4.8-4.8A8 8 0 0 0 8.4.4Zm0 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8.4 2Z"/>
      </svg>
    </span>
    <input type="text" class="filter__input" v-model="filterValue"
           placeholder="Начни вводить название или код валюты" @input="filter">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const filterValue = ref('')

const store = useStore()

const filter = (): Promise<void> => store.dispatch('filterCurrencies', filterValue.value)
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 0;

  &__icon {
    padding: 0 9px;
  }

  &__input {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    padding: 11px 14px;
    width: 100%;
    border-left: 1px solid $grey-border;

    &:focus {
      outline: none;
    }
  }
}
</style>
