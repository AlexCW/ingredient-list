import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const flashModule = {
  namespaced: true,
  state: {
    type: '',
    message: '',
    visible: false
  },
  mutations: {
    success (state, data) {
      Object.assign(state, data)
    },
    error (state, data) {
      state = data
    }
  },
  getters: {
    flash: state => state
  },
  actions: {
    flash: ({ commit }, payload) => {
      commit(payload.type, payload, payload)
    }
  }
}

const authModule = {
  namespaced: true,
  state: {
    isLoggedIn: false
  },
  mutations: {
    isLoggedIn (state, data) {
      state.isLoggedIn = data !== false
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  },
  actions: {
    isLoggedIn: ({ commit }, payload) => {
      commit('isLoggedIn', payload)
    }
  }
}

export default new Vuex.Store({
  modules: {
    flash: flashModule,
    auth: authModule
  }
})
