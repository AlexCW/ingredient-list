export const uploadsModule = {
  namespaced: true,
  state: {
    uploads: []
  },
  mutations: {
    setUploads (state, uploads) {
      state.uploads = uploads
    }
  },
  getters: {
    uploads: state => state.uploads
  },
  actions: {
    setUploads: ({ commit }, payload) => {
      commit('setUploads', payload.uploads)
    }
  }
}
