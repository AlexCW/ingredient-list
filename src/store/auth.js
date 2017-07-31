export const authModule = {
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
