<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger login-errors" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <div class="alert alert-danger" v-if="fields.email.error">
        <p>{{ fields.email.error }}</p>
      </div>
      <input
        id="email"
        type="email"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <div class="alert alert-danger" v-if="fields.password.error">
        <p>{{ fields.password.error }}</p>
      </div>
      <input
        id="password"
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button class="btn btn-primary btn-login" @click="submit()">Access</button>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: '',
      fields: {
        email: {
          error: ''
        },
        password: {
          error: ''
        }
      }
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }

      auth.login(this, credentials)
    }
  }
}
</script>