import { http } from './base'
import store from '../store'

export const recipes = {
  getSuggestedRecipes (options) {
    http.post('recipes/ingredients/suggest', options).then((response) => {
      if (response.data.data.length === 0) {
        store.dispatch('flash/flash', { type: 'danger', message: 'There are currently no recipes', active: true, visible: true })
        return false
      }

      store.dispatch('recipes/setRecipes', { recipes: response.data.data })
      store.dispatch('recipes/setIngredients', { ingredients: response.data.included.filter(include => include.type === 'ingredient') })
      store.dispatch('uploads/setUploads', { uploads: response.data.included.filter(include => include.type === 'upload') })
    }, (response) => {
    })
  }
}
