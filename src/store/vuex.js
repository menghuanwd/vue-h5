import pluralize from 'pluralize'
import axios from 'axios'
import _ from 'lodash'

function states (resource) {
  const resources = pluralize(resource)
  return {
    query: { page: 1, per: 10 },
    loading: false,
    finished: false,
    meta: {},
    [resource]: {},
    [resources]: []
  }
}

function getters (resource) {
  const resources = pluralize(resource)
  return {
    [resources]: (state) => state[resources],
    [resource]: (state) => state[resource],
    getById: (state, getters) => (id) => {
      return state[resources].find((record) => record.id === id)
    },
    loading: (state) => state.loading,
    finished: (state) => state.finished,
    meta: (state) => state.meta
  }
}

function actions (resources) {
  return {
    async index ({ commit }, params) {
      commit('loading', true)

      const { query } = this.state[pluralize.singular(resources)]

      const response = await axios.get(resources, { params: query })

      commit('setRecords', response.data)

      if (response.meta) commit('setMeta', response.meta)

      commit('loading', false)
    },
    async show ({ commit }, id) {
      const response = await axios.get(`${resources}/${id}`)

      commit('setRecord', response.data)
    },
    async update ({ commit }, params) {
      const response = await axios.put(`${resources}/${params.id}`, params)

      commit('updateRecordInRecords', response.data)
    },
    async create ({ commit }, params) {
      const response = await axios.post(resources, params)

      commit('addRecordInRecords', response.data)
    },
    async destroy ({ commit }, id) {
      await axios.delete(`${resources}/${id}`)

      commit('removeRecordInRecords', id)
    },
    async clear ({ commit }, params) {
      commit('clearRecord')
    }
  }
}

function mutations (resourceType) {
  const resourceTypes = pluralize(resourceType)
  return {
    finished (state, boolean) {
      state.finished = boolean
    },
    loading (state, boolean) {
      state.loading = boolean
    },
    setRecord (state, record) {
      state[resourceType] = record
    },
    setRecords (state, records) {
      state[resourceTypes] = records
    },
    setMeta (state, meta) {
      state.meta = meta
    },
    clearRecord (state) {
      state[resourceType] = {}
    },
    addRecordInRecords (state, record) {
      state[resourceTypes].splice(0, 0, record)
    },
    removeRecordInRecords (state, id) {
      const index = _.findIndex(state[resourceTypes], (record) => record.id === id)
      if (index >= 0) state[resourceTypes].splice(index, 1)
    },
    updateRecordInRecords (state, record) {
      const index = _.findIndex(state[resourceTypes], (_record) => _record.id === record.id)
      if (index >= 0) state[resourceTypes].splice(index, 1, record)
    },
    changeQuery: (state, query) => {
      state.query = { ...state.query, ...query }
    },
    resetQuery: (state) => {
      state.query = { page: 1, per: 10 }
    }
  }
}

export default {
  states,
  getters,
  actions,
  mutations
}
