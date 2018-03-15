export const tagsModule = {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    setTags (state, tags) {
      state.tags = tags
    }
  },
  getters: {
    tags: state => state.tags,
    tagsList: state => state.tags.map(tag => ({value: tag.id, label: tag.attributes.name}))
  },
  actions: {
    setTags: ({ commit }, payload) => {
      commit('setTags', payload.tags)
    }
  }
}
