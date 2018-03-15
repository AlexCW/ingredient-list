// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import axios from 'axios'

import App from './App'
import Favourites from './components/Favourites.vue'
import Login from './components/Login.vue'
import Pantry from './components/Pantry.vue'
import Signup from './components/Signup.vue'
import auth from './auth'

import './styles/app.scss'

window.$ = window.jQuery = require('jquery')

Vue.use(VueRouter)

Vue.prototype.$http = axios

const Hello = { template: '<div>home</div>' }

export const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    {
      path: '/',
      component: Hello
    },
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
      path: '/favourites',
      component: Favourites,
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
    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          auth.logout(router.app)
          router.app.$store.dispatch('flash/flash', {type: 'success', message: 'You have successfully logged out', active: true})
        }
        next('/')
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

router.afterEach((to, from) => {
  console.log(store.getters['flash/flash'])
  if (store.getters['flash/flash'].active && !store.getters['flash/flash'].visible) {
    store.dispatch('flash/flash', Object.assign(store.getters['flash/flash'], {visible: true, active: false}))
  } else {
    store.dispatch('flash/flash', Object.assign(store.getters['flash/flash'], {visible: false}))
  }
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
