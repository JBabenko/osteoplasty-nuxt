<template>
  <main class="catalog">
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
        isScrollOnStart: true,
        isScrollOnEnd: true,
      }
    },
    methods: {
      /* onScroll(event) {
        const scrollLeft = event.target.scrollLeft;
        const maxScroll = event.target.scrollWidth - document.body.clientWidth;
        this.isScrollOnStart = scrollLeft <= 20 ? true : false;
        this.isScrollOnEnd = scrollLeft >= (maxScroll - 20) ? true : false;
      } */
    },
    computed: {
      products() {
        return this.$store.getters['products/products']
      },

    },
    components: {
      AppCatalogList,
    },
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';

  .catalog {
    &__title {
      padding: 0 20px;
    }

    &__list-wrap {
      position: relative;
    }


  }

</style>
