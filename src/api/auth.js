import { http } from './base'
import store from '../store'

export default {
  login (creds, success, fail) {
    http.post('auth/login', creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('token', response.headers.token)
      store.dispatch('flash/flash', {type: 'success', message: 'You have successfully logged in', active: true}).then(() => {
        success()
      })
    }).catch((error) => {
      fail(error)
    })
  }
}
