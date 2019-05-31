export const state = () => ({
  isFiltersOpen: true
})

export const mutations = {
  filtersToggle(state, payload) {
    state.isFiltersOpen = payload
  },
}

export const getters = {
  isFiltersOpen: state => state.isFiltersOpen,
}
