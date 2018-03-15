export const cuisinesModule = {
  namespaced: true,
  state: {
    cuisines: []
  },
  mutations: {
    setCuisines (state, cuisines) {
      state.cuisines = cuisines
    }
  },
  getters: {
    cuisines: state => state.cuisines,
    cuisinesList: state => state.cuisines.map(cuisine => ({value: cuisine.id, label: cuisine.attributes.name}))
  },
  actions: {
    setCuisines: ({ commit }, payload) => {
      commit('setCuisines', payload.cuisines)
    }
  }
}
