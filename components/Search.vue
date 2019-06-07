<template>
  <div :class="{'focused': focused}" class="search">
    <input
      @focus="focused = true"
      @blur="focused = false"
      class="search__input"
      type="search"
      placeholder="Search..."
      v-model="searchQuery"
    >
    <font-awesome-icon class="icon" icon="search" />
    <font-awesome-icon class="icon icon-filter" icon="sliders-h" @click="toggleFilters()" />

    <app-filters></app-filters>
  </div>
</template>

<script>
  import AppFilters from './Filters.vue'

  export default {
    data () {
      return {
        focused: false,
        searchQuery: ''
      }
    },
    watch: {
      searchQuery() {
        this.$store.commit('filters/setSearchQuery', this.searchQuery);
      }
    },
    methods: {
      toggleFilters() {
        this.$store.commit('filters/filtersToggle', !this.$store.getters['filters/isFiltersOpen']);
        document.body.classList.toggle('overflow-hidden');
      }
    },
    components: {
      AppFilters
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';

  .search {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #b8b8b8;
    z-index: 5;
    transition: box-shadow 0.3s;
    &.focused {
      box-shadow: 0 0px 4px 1px #7ae2dd;
    }
    &__input {
      width: 100%;
      box-sizing: border-box;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: none;
      padding: 10px 20px;
      font-size: 18px;
      transition: box-shadow 0.2s;
    }
  }
  .icon {
    padding: 10px;
    font-size: 20px;
    color: #b8b8b8;
    &-filter {
      padding-right: 20px;
    }
  }

</style>
