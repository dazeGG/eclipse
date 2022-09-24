<template>
  <table>
    <tr>
      <th>Name</th>
      <th>CharCode</th>
      <th>Nominal</th>
      <th>Previous</th>
      <th>Value</th>
    </tr>
    <tr v-for="currency in currencies" :key="currency.ID">
      <td>{{ currency.Name }}</td>
      <td class="centered">{{ currency.CharCode }}</td>
      <td class="centered">{{ currency.Nominal }}</td>
      <td class="centered">{{ currency.Previous }}</td>
      <td class="value" :class="currency.deltaClass">
        {{ currency.Value }}
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
          <path fill="#fff"
                d="M4.42.75v9.09l-3.1-3.08a.58.58 0 1 0-.81.82l4.08 4.08a.58.58 0 0 0 .82 0l4.08-4.08a.58.58 0 0 0 0-.82.58.58 0 0 0-.81 0l-3.1 3.08V.75a.58.58 0 0 0-1.16 0Z"/>
        </svg>
      </td>
    </tr>
  </table>
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

<style scoped lang="scss">
@import '@/assets/colors';

table {
  border: 1px solid $grey;
  border-radius: 10px;
}

th,
td {
  padding: 10px;
}

td {
  border-top: 1px solid $grey;
  font-weight: 500;

  &.centered {
    text-align: center;
  }

  &.value {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-weight: 600;

    $up-color: $green;
    $down-color: $red;

    &.up {
      color: $up-color;

      > svg {
        transform: rotate(180deg);
      }

      > svg > path {
        fill: $up-color;
      }
    }

    &.down {
      color: $down-color;

      > svg > path {
        fill: $down-color;
      }
    }

    &.didnt-change {
      > svg {
        display: none;
      }
    }
  }
}
</style>
