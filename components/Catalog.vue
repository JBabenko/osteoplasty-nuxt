<template>
  <main class="catalog" :class="{'catalog_onback': isFiltersOpen}">
    <div class="catalog__section" v-for="brand in products" :key="brand.id">
      <h2 class="catalog__title">{{ brand.brand }}</h2>
      <div class="catalog__list-wrap">
        <app-catalog-list :brand="brand"></app-catalog-list>
      </div>
    </div>
  </main>
</template>

<script>
  import AppCatalogList from './CatalogList.vue'
  export default {
    data() {
      return {

      }
    },
    computed: {
      products() {
        return this.$store.getters['products/products'];
      },
      isFiltersOpen() {
        return this.$store.getters['filters/isFiltersOpen']
      }
    },
    components: {
      AppCatalogList,
    },
    mounted() {
      console.log(this.products);
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';

  .catalog {
    transition: opacity 0.6s;

    &__title {
      padding: 0 20px;
    }

    &__list-wrap {
      position: relative;
    }

    &_onback {
      opacity: 0.2;
    }
  }

</style>
