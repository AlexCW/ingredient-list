import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  flash: {
    type: '',
    message: '',
    visible: false
  },
  isLoggedIn: false
}

const mutations = {
  success (state, data) {
    state.flash = data
    state.flash.visible = true
  },
  error (state, data) {
    state.flash = data
    state.flash.visible = true
  },
  isLoggedIn (state, data) {
    state.isLoggedIn = data !== false
  }
}

const actions = {
  flash: ({ commit }, payload) => {
    commit(payload.type, payload, payload)
  },
  isLoggedIn: ({ commit }, payload) => {
    commit('isLoggedIn', payload)
  }
}

const getters = {
  flash: state => state.flash,
  isLoggedIn: state => state.isLoggedIn
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
