import restful from '../vuex'

const state = {
  ...restful.states('user')
}

const getters = {
  ...restful.getters('user')
}

const actions = {
  ...restful.actions('users'),
  async test ({ commit, state }, params) {
    console.log('test')
    commit('loading', true)
    // setTimeout(() => {
    let aa = []
    for (let i = 0; i < 30; i++) {
      aa.push(state.users.length + 1)
    }
    commit('increment', aa)
    if (state.users.length > 300) {
      console.log(state.users.length)
      commit('finished', true)
    }
    // }, 100)
    commit('loading', false)
  }
}

const mutations = {
  ...restful.mutations('user'),
  increment (state, arr) {
    state.users = state.users.concat(arr)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
