export const ingredientsModule = {
  namespaced: true,
  state: {
    ingredients: []
  },
  mutations: {
    setIngredients (state, ingredients) {
      state.ingredients = ingredients
    }
  },
  getters: {
    ingredients: state => state.ingredients
  },
  actions: {
    setIngredients: ({ commit }, payload) => {
      commit('setIngredients', payload.ingredients)
    },
    setIncludedData: ({ commit }, payload) => {
      commit('setIngredients', payload.ingredients)
    }
  }
}
