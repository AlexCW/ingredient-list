export const recipesModule = {
  namespaced: true,
  state: {
    ingredients: [],
    recipes: []
  },
  mutations: {
    setRecipes (state, recipes) {
      state.recipes = recipes
    },
    setIngredients (state, ingredients) {
      state.ingredients = ingredients
    }
  },
  getters: {
    ingredients: state => state.ingredients,
    recipes: state => state.recipes
  },
  actions: {
    setRecipes: ({ commit }, payload) => {
      commit('setRecipes', payload.recipes)
    },
    setIngredients: ({ commit }, payload) => {
      commit('setIngredients', payload.ingredients)
    }
  }
}
