<template>
<div ref="list">
  <div v-swiper:mySwiper="swiperOption">
    <ul class="catalog__list swiper-wrapper">
      <li class="catalog__item swiper-slide" v-for="(item, index) in items" :key="index">
        <app-item-params :item="item" :brand="brand.brand" :currency="brand.currency"></app-item-params>
      </li>
    </ul>
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev icon catalog__scroll-arrow catalog__scroll-arrow-left" slot="button-prev">
      <font-awesome-icon
        class="catalog__scroll-arrow-icon"
        icon="chevron-left"
      />
    </div>
    <div class="swiper-button-next icon catalog__scroll-arrow catalog__scroll-arrow-right" slot="button-next">
      <font-awesome-icon
        class="catalog__scroll-arrow-icon"
        icon="chevron-right"
      />
    </div>
  </div>



</div>
</template>

<script>
  import AppItemParams from './ItemParams.vue'

  export default {
    props: ['brand'],
    data() {
      return {
        swiperOption: {
          loop: false,
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange() {

            },
            tap() {

            }
          }
        },
      }
    },
    components: {
      AppItemParams,
    },
    methods: {


    },
    computed: {
      items() {
        Object.filter = (obj, predicate) =>
          Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );

        if (this.brand.items) {
          let filteredItems = this.brand.items;
          for (let filter in this.filters) {
            if (this.filters[filter].length) {
              if (filter === 'brands') {
                filteredItems = Object.filter(filteredItems, item => {
                  return this.filters[filter].indexOf(this.brand.brand) != -1;
                });
              }
              if (filter === 'types') {
                filteredItems = Object.filter(filteredItems, item => {
                  return this.filters[filter].indexOf(item.type) != -1;
                });
              }
            }
          }
          filteredItems = Object.filter(filteredItems, item => {
            const isFound = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            this.brand.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
            return isFound;
          });
          return filteredItems;
        }
      },
      filters() {
        return this.$store.getters['filters/filters'];
      },
      searchQuery() {
        return this.$store.getters['filters/searchQuery'];
      }
    },
    watch: {
      items() {
        if (Object.keys(this.items).length < 1) {
          this.$refs.list.parentNode.parentNode.classList.add('hidden');
        } else {
          this.$refs.list.parentNode.parentNode.classList.remove('hidden');
        }
      }
    }
  }
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
  .catalog {
    &__list {
      display: flex;
      position: relative;
    }

    &__item {
      padding: 0 26px;
      flex-shrink: 0;
      width: 100%;
      box-sizing: border-box;
    }
    &__scroll-arrow {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0;
      height: 100%;
      font-size: 34px;
      color: $primary;
      z-index: 2;
      outline: none;
      transition: opacity 0.3s;


      &-left {
        left: 0px;
      }

      &-right {
        right: 0px;
      }
    }
  }
  .swiper-pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 24px;
    box-sizing: border-box;

    &-bullet {
      display: block;
      flex-grow: 1;
      height: 8px;
      margin: 0 2px;
      border-radius: 4px;
      background: $primary-light;
      outline: none;

      &-active {
        background: $primary;
      }
    }
  }
  .swiper-button-disabled {
    opacity: 0;
  }
</style>
