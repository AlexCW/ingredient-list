import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  flash: {
    type: '',
    message: '',
    visible: false
  }
}

const mutations = {
  success (payload, data) {
    state.flash = data
    state.flash.visible = true
  },
  error (payload, data) {
    state.flash = data
    state.flash.visible = true
  }
}

const actions = {
  flash: ({ commit }, payload) => {
    commit(payload.type, payload, payload)
  }
}

const getters = {
  flash: state => state.flash
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
