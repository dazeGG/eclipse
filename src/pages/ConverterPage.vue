<template>
  <div class="title">
    <h1>Конвертер</h1>
    <div class="postscript">
      <b>[</b>Работает через RUB<b>]</b>
    </div>
  </div>
  <AppConverter/>
</template>

<script setup lang="ts">
import AppConverter from '@/components/AppConverter.vue'
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 25px 0;
}

.postscript {
  font-size: 26px;
  font-weight: 500;
}
</style>
