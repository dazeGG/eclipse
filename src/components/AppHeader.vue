<template>
  <header class="header">
    <router-link :to="Routes.currencies" class="header__logo">dazeGG</router-link>
    <nav class="header__links">
      <router-link :to="Routes.currencies" class="header__link">Currencies</router-link>
      <router-link :to="Routes.converter" class="header__link">Converter</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  &__logo {
    font-weight: 500;
    font-size: 32px;
  }

  &__links {
    display: flex;
    gap: 20px;
    font-weight: 500;
    font-size: 20px;
  }

  &__link {
    position: relative;
    overflow: hidden;
    transition: 200ms;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -100%;
      height: 1px;
      width: 100%;
      background-color: $black;
      transition: 200ms;
    }

    &:hover,
    &.active {
      color: $blue;

      &:before {
        background-color: $blue;
      }
    }

    &:hover:before {
      left: 0;
    }
  }
}
</style>
