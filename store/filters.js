export const state = () => ({
  isFiltersOpen: false,
  checkedTypes: [],
  checkedBrands: [],
  filters: {
    types: [],
    brands: []
  },
  searchQuery: ''
})

export const mutations = {
  filtersToggle(state, payload) {
    state.isFiltersOpen = payload
  },
  setTypes(state, payload) {
    state.filters.types = payload
  },
  setBrands(state, payload) {
    state.filters.brands = payload
  },
  setSearchQuery(state, payload) {
    state.searchQuery = payload;
  }
}

export const getters = {
  isFiltersOpen: state => state.isFiltersOpen,
  checkedTypes: state => state.checkedTypes,
  checkedBrands: state => state.checkedBrands,
  filters: state => state.filters,
  searchQuery: state => state.searchQuery,
}
