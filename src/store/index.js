import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {

  },
  modules: modules
})
