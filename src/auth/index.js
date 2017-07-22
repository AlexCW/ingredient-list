import {router} from '../main'

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
      window.localStorage.setItem('id_token', response.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch((error) => {
      if (error.response && error.response.status === 422) {
        error.response.data.errors.forEach(function (error) {
          var field = error.source.pointer.split('/').pop()
          if (context.fields.hasOwnProperty(field)) {
            context.fields[field].error = error.detail
          }
        })
      } else {
        context.error = error.response.data.errors[0].detail
      }
    })
  },
  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, {
      'eataway-token': 'test'
    }).then((response) => {
      window.localStorage.setItem('id_token', response.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch((error) => {
      if (error.response && error.response.status === 422) {
        error.response.data.errors.forEach(function (error) {
          var field = error.source.pointer.split('/').pop()
          if (context.fields.hasOwnProperty(field)) {
            context.fields[field].error = error.detail
          }
        })
      } else {
        context.error = error.response.data.errors[0].detail
      }
    })
  },
  logout () {
    window.localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  clearErrors (context) {
    for (var field in context.fields) {
      context.fields[field].error = ''
    }
  },
  checkAuth () {
    var jwt = window.localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
    }
  }
}
