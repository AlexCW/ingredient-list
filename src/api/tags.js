import { http } from './base'
import store from '../store'

export const tags = {
  getTags () {
    http.get('cuisines?sort=name&direction=asc').then((response) => {
      store.dispatch('cuisines/setCuisines', { cuisines: response.data.data })
    })
    http.get('tags?sort=name&direction=asc').then((response) => {
      store.dispatch('tags/setTags', { tags: response.data.data })
    })
  }
}
