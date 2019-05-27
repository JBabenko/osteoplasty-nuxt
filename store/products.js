import * as firebase from 'firebase'

export const state = () => ({
  products: []
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
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
  products: state => state.products
}

/* import Vuex from 'vuex'
import products from './products'

const store = () => {
  return new Vuex.Store({
    modules: {
      products
    }
  })
}

export default store;
 */
