<template>
  <div class="app-container">
    <app-header></app-header>
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
  export default {
    components: {
      AppHeader,
    }
  }
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
  .app-container {
    overflow: hidden;
  }
</style>
