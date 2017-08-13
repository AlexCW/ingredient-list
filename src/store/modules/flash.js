export const flashModule = {
  namespaced: true,
  state: {
    type: '',
    message: '',
    active: false,
    visible: false
  },
  mutations: {
    success (state, data) {
      Object.assign(state, data)
    },
    error (state, data) {
      Object.assign(state, data)
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
