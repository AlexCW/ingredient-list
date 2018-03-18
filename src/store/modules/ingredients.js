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
    ingredients: state => state.ingredients,
    ingredientsList (state) {
      if (state.ingredients.length > 0) {
        return state.ingredients.reduce((reduceObject, ingredient) => {
          var obj = reduceObject.hasOwnProperty('attributes') ? {} : reduceObject
          obj[ingredient.attributes.name] = ingredient.id
          return obj
        })
      }
    }
  },
  actions: {
    setIngredients: ({ commit }, payload) => {
      commit('setIngredients', payload.ingredients)
    }
  }
}
