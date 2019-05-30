import * as firebase from 'firebase'

export const state = () => ({
  products: [],
  query: ''
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
  setQuery(state, payload) {
    state.query = payload;
  }
}

export const actions = {
  async fetch({commit}) {
    const products = await firebase.database().ref("products").orderByKey().once("value")
      .then(snapshot => snapshot.val());
    commit('setProducts', products);
  }
}

export const getters = {
  products: state => state.products,
  query: state => state.query,
}
