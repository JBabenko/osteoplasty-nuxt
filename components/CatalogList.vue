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
    @click="onScrollPrev()"
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
  export default {
    props: ['brand'],
    data() {
      return {
        items: this.brand.items
      }
    },
    components: {
      AppItemParams,
    },
    methods: {
      onScrollNext(list, items) {
        const listWidth = list.scrollWidth;
        const itemWidth = listWidth / (items.length + 2);
        console.log(itemWidth);
      },
      prepareCarousel(list, items) {
        const firstEl = items[0].cloneNode(true);
        const lastEl = items[items.length-1].cloneNode(true);
        list.appendChild(firstEl);
        list.insertBefore(lastEl, items[0]);
      }
    },
    computed: {
      listWidth() {
        return document.querySelector('.catalog__list').offsetWidth;
      },
    },
    mounted() {
      this.prepareCarousel(this.$refs.list, this.$refs.items);
      /* const itemWidth = document.querySelector('.catalog__item').offsetWidth;
      const list = document.querySelector('.catalog__list');
      list.style.transform = `translateX(-${itemWidth}px)`; */
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
  .catalog {
    &__list {
      display: flex;
      padding: 0;
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
