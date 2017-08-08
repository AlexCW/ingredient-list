// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import axios from 'axios/index.js'

import App from './App'
import Pantry from './components/Pantry.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

import './styles/app.scss'

window.$ = window.jQuery = require('jquery')

Vue.use(VueRouter)

Vue.prototype.$http = axios

const Hello = { template: '<div>home</div>' }

export const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/', component: Hello },
    {
      path: '/pantry',
      component: Pantry,
      beforeEnter: (to, from, next) => {
        if (!store.state.auth.isLoggedIn) {
          return false
        }
        next()
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          return false
        }
        next()
      }
    },
    { path: '/signup', component: Signup },
    { path: '*', redirect: '/' }  //  Catch all redirect
  ]
})

router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('token')) {
    store.dispatch('auth/isLoggedIn', window.localStorage.getItem('token'))
  } else {
    store.dispatch('auth/isLoggedIn', false)
  }
  next()
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
