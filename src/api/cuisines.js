import { http } from './base'
import store from '../store'

export const cuisines = {
  getCuisines () {
    http.get('cuisines?sort=name&direction=asc').then((response) => {
      store.dispatch('cuisines/setCuisines', { cuisines: response.data.data })
    })
  }
}
