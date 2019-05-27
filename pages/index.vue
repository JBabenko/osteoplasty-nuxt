<template>
  <div>
    <app-search></app-search>
    <app-catalog></app-catalog>
  </div>
</template>

<script>
import AppSearch from '@/components/Search.vue'
import AppCatalog from '@/components/Catalog.vue'
  export default {
    async fetch({store}) {
      if (store.getters['products/products'].length === 0) {
        await store.dispatch('products/fetch');
      }
    },
    components: {
      AppSearch,
      AppCatalog
    },
  }
</script>

<style lang="scss" scoped>

</style>
