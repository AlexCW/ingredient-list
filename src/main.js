// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import axios from 'axios/index.js'

import App from './App'
import Ingredients from './components/Ingredients.vue'
import Test from './components/Test.vue'
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
      path: '/ingredients',
      component: Ingredients,
      beforeEnter: (to, from, next) => {
        if (!store.state.isLoggedIn) {
          return false
        }
        next()
      }
    },
    { path: '/test', component: Test },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.isLoggedIn) {
          return false
        }
        next()
      }
    },
    { path: '/signup', component: Signup },
    { path: '*', redirect: '/' }  //  Catch all redirect
  ]
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
