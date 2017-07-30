import {router} from '../main'
import errors from '../errors'

const API_URL = 'http://api.eataway.co.uk/'
const LOGIN_URL = API_URL + 'auth/login'
const SIGNUP_URL = API_URL + 'users/'

export default {
  login (context, creds, redirect) {
    this.clearErrors(context)
    context.$http.post(LOGIN_URL, creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('token', response.headers.token)
      router.push('/ingredients')
      context.$store.dispatch('flash', {type: 'success', message: 'You have successfully logged in'})
    }).catch((error) => {
      errors.handle(context, error)
    })
  },
  signup (context, creds) {
    context.$http.post(SIGNUP_URL, creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('token', response.headers.token)
    }).catch((error) => {
      errors.handle(context, error)
    })
  },
  isUserLoggedIn () {
    return window.localStorage.getItem('token') !== null
  },
  logout () {
    window.localStorage.removeItem('token')
    router.go('/login')
  },
  clearErrors (context) {
    for (var field in context.fields) {
      context.fields[field].error = ''
    }
  },
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    }
  }
}
