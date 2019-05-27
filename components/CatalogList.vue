<template>
<div>
  <ul ref="list" class="catalog__list">
    <li ref="items" class="catalog__item" v-for="item in items" :key="item.name">
      <app-item-params :item="item" :brand="brand.brand" :currency="brand.currency"></app-item-params>
    </li>
  </ul>

  <font-awesome-icon
    class="icon catalog__scroll-arrow catalog__scroll-arrow-left"
    icon="chevron-left"
    @click="onScrollPrev($refs.list, $refs.items)"
  />
  <font-awesome-icon
    class="icon catalog__scroll-arrow catalog__scroll-arrow-right"
    icon="chevron-right"
    @click="onScrollNext($refs.list, $refs.items)"
  />
</div>
</template>

<script>
  import AppItemParams from './ItemParams.vue'
import { setTimeout } from 'timers';
  export default {
    props: ['brand'],
    data() {
      return {
        items: this.brand.items,
        screenWidth: null
      }
    },
    components: {
      AppItemParams,
    },
    methods: {
      onScrollNext(list, items) {
        const shift = this.getCarouselShift(list);
        this.changeCarouselShift(list, shift);
        setTimeout(() => {
          list.insertBefore(list.firstChild, null);
          list.style.transition = 'none';
          this.changeCarouselShift(list, 0);
        }, 250);
        list.style.transition = 'left 0.25s';

      },
      onScrollPrev(list, items) {
        const shift = this.getCarouselShift(list);
        this.changeCarouselShift(list, shift*-1);
        setTimeout(() => {
          list.insertBefore(list.lastChild, list.firstChild);
          list.style.transition = 'none';
          this.changeCarouselShift(list, 0);
        }, 250);
        list.style.transition = 'left 0.25s';

      },
      prepareCarousel(list, items) {
        const lastEl = list.removeChild(items[items.length-1]);
        list.insertBefore(lastEl, list.children[0]);
      },
      changeCarouselShift(list, shift) {
        const newShift = shift*-1 + this.screenWidth;
        list.style.left = `${newShift * -1 + 50}px`;
      },
      getCarouselShift(list) {
        return +list.style.left.split('px')[0];
      },
      onResize() {
        this.screenWidth = window.innerWidth;
        this.changeCarouselShift(this.$refs.list, 0);
      },
    },
    computed: {
      listWidth() {
        return document.querySelector('.catalog__list').offsetWidth;
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize);
      this.screenWidth = window.innerWidth;

      this.prepareCarousel(this.$refs.list, this.$refs.items);
      for (let i = 0; i < this.$refs.items.length; i++) {
        this.$refs.items[i].dataset.id = this.$refs.items.indexOf(this.$refs.items[i]);
      }
      this.changeCarouselShift(this.$refs.list, 0);

    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
  .no-transition {
    transition: none;
  }
  .catalog {
    &__list {
      display: flex;
      position: relative;
      padding: 0 25px;
      transition: left 0.25s;
    }

    &__item {
      padding: 0 10px;
      flex-shrink: 0;
      width: 100%;
      box-sizing: border-box;
    }
    &__scroll-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 40px;
      color: $primary;
      z-index: 2;

      &-left {
        left: 10px;
      }

      &-right {
        right: 10px;
      }
    }
  }
  .list-move {
    transition: 1s;
  }
</style>
