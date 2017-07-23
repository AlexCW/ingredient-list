import {router} from '../main'
import errors from '../errors'

const API_URL = 'http://api.eataway.co.uk/'
const LOGIN_URL = API_URL + 'auth/login'
const SIGNUP_URL = API_URL + 'users/'

export default {
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    this.clearErrors(context)

    context.$http.post(LOGIN_URL, creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('token', response.headers.token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch((error) => {
      console.log(error)
      errors.handle(context, error)
    })
  },
  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('token', response.headers.token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch((error) => {
      errors.handle(context, error)
    })
  },
  logout () {
    window.localStorage.removeItem('token')
    this.user.authenticated = false
  },
  clearErrors (context) {
    for (var field in context.fields) {
      context.fields[field].error = ''
    }
  },
  checkAuth () {
    var jwt = window.localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    }
  }
}
