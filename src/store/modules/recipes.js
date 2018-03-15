export const recipesModule = {
  namespaced: true,
  state: {
    recipes: []
  },
  mutations: {
    setRecipes (state, recipes) {
      state.recipes = recipes
    }
  },
  getters: {
    recipes: state => state.recipes
  },
  actions: {
    setRecipes: ({ commit }, payload) => {
      commit('setRecipes', payload.recipes)
    }
  }
}
