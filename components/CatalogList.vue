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
        }
      }
    },
    components: {
      AppItemParams,
    },
    computed: {
      items() {
        return this.brand.items.filter(item => {
          return item.name.toLowerCase().includes(this.$store.getters['products/query'].toLowerCase());
        });
      }
    },
    watch: {
      items() {
        if (this.items.length < 1) {
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

      &-icon {

      }
    }
  }
  .swiper-pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2px 24px;
    box-sizing: border-box;

    &-bullet {
      display: block;
      flex-grow: 1;
      height: 2px;
      margin: 0 2px;
      background: $light-grey;
      outline: none;

      &-active {
        background: $black;
      }
    }
  }
  .swiper-button-disabled {
    opacity: 0;
  }
</style>
