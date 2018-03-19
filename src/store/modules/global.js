export const globalModule = {
  namespaced: true,
  state: {
    modal: { show: false }
  },
  mutations: {
    setModal (state, modal) {
      state.modal = modal
    }
  },
  getters: {
    modal: state => state.modal
  },
  actions: {
    setModal: ({ commit }, payload) => {
      commit('setModal', payload.modal)
    }
  }
}
