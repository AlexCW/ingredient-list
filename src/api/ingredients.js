import { http } from './base'
import store from '../store'

export const ingredients = {
  getIngredients (callback) {
    http.get('ingredients').then((response) => {
      store.dispatch('ingredients/setIngredients', { ingredients: response.data.data })
      if (callback) {
        return callback(response.data)
      }
      return response.data.data
    })
  }
}
