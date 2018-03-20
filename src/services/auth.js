import errors from '../errors'
import auth from '../api/auth'

export var auths = {
  login (context, creds, redirect) {
    this.clearErrors(context)
    auth.login(creds, () => {
      context.$router.push('/pantry')
    }, (error) => { errors.handle(context, error) })
  },
  signup (context, creds) {
    // context.$http.post(SIGNUP_URL, creds, {
    //   'eataway-token': 'test'
    // }).then((response) => {
    //   window.localStorage.setItem('token', response.headers.token)
    // }).catch((error) => {
    //   errors.handle(context, error)
    // })
  },
  logout (context) {
    window.localStorage.removeItem('token')
  },
  clearErrors (context) {
    for (var field in context.fields) {
      context.fields[field].error = ''
    }
  }
}
