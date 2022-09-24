<style lang="scss">
@import 'style';
</style>

<template>
  <div class="container">
    <AppHeader/>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>
