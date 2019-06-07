<template>
  <div class="filters" :class="{'filters_active': isFiltersOpen}">
    <div class="filters__close" @click="toggleFilters()">
      <div class="filters__close-icon-wrap">
        <font-awesome-icon class="icon filters__close-icon" icon="times" />
      </div>
    </div>
    <div class="filters__main">
      <div class="filters__section">
        <h3>Тип</h3>
        <div>
          <input v-model="checkedTypes" value="bone" type="checkbox" id="bone">
          <label for="bone">Кость</label>
        </div>
        <div>
          <input v-model="checkedTypes" value="membrane" type="checkbox" id="membrane">
          <label for="membrane">Мембрана</label>
        </div>
        <div>
          <input v-model="checkedTypes" value="block" type="checkbox" id="block">
          <label for="block">Блок</label>
        </div>
      </div>
      <div class="filters__section">
        <h3>Бренд</h3>
        <div>
          <input v-model="checkedBrands" value="Botiss" type="checkbox" id="botiss">
          <label for="botiss">Botiss</label>
        </div>
        <div>
          <input v-model="checkedBrands" value="Geistlich" type="checkbox" id="geistlich">
          <label for="geistlich">Geistlich</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      toggleFilters() {
        this.$store.commit('filters/filtersToggle', !this.$store.getters['filters/isFiltersOpen']);
        document.body.classList.toggle('overflow-hidden');
      },
    },
    computed: {
      isFiltersOpen() {
        return this.$store.getters['filters/isFiltersOpen']
      },
      checkedTypes: {
        set(val) {
          this.$store.commit('filters/setTypes', val);
        },
        get() {
          return this.$store.getters['filters/filters'].types;
        }
      },
      checkedBrands: {
        set(val) {
          this.$store.commit('filters/setBrands', val);
        },
        get() {
          return this.$store.getters['filters/filters'].brands;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';
  .filters {
    display: flex;
    position: absolute;
    right: 0;
    top: -61px;
    width: 100vw;
    min-height: 100%;
    z-index: 5;
    transform: translateX(100%);
    transition: transform 0.6s cubic-bezier(0.13, 0.77, 0.49, 1);

    &_active {
      transform: translateX(0);

      & .filters__close {
        transform: translateX(0);
      }
    }

    &__close {
      position: relative;
      background: transparent;
      height: 100vh;
      width: 60px;
      transform: translateX(100%);
      transition: transform 0.6s;

      &-icon-wrap {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
      }

      &-icon {
        font-size: 30px;
      }
    }

    &__main {
      background: #fff;
      height: 100vh;
      flex-grow: 1;
      overflow: scroll;
    }

    &__subsection {
      max-height: 0;
      overflow: hidden;
      transition: max-height 1s;
      &_active {
        max-height: 1000px;
      }
    }
  }
</style>
