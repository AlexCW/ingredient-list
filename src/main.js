// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Ingredients from './components/Ingredients.vue'
import App from './App'
import Modal from './components/Modal.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

window.$ = window.jQuery = require('jquery')

Vue.use(VueResource)

Vue.use(VueRouter)

const Hello = { template: '<div>home</div>' }

const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/', component: Hello },
    { path: '/ingredients', component: Ingredients }
  ]
})

new Vue({
  router,
  components: {'modal': Modal},
  data: {
    modal: {
      data: {
        table: {}
      },
      title: '',
      show: false
    }
  },
  ...App
}).$mount('#app')
