<template>
  <div id="app">
    <nav class="navbar navbar-default">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Ingredients
        </a>
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/' }">Home</router-link></li>
          <li v-if="!isLoggedIn"><router-link :to="{ path: '/login' }">Login</router-link></li>
          <li v-if="isLoggedIn"><router-link :to="{ path: 'ingredients' }">Ingredients</router-link></li>
          <li v-if="isLoggedIn"><router-link :to="{ path: 'test' }">Test</router-link></li>
          <li v-if="isLoggedIn"><a href="#" @click="logoutUser">Logout</a></li>
        </ul>
    </nav>
    <div class="container">
      <div class="col-sm-12">
        <div v-bind:class="flashTypeClass" v-if="$store.state.flash.visible">{{$store.state.flash.message}}</div>
        <router-view></router-view>
        <modal :show.sync="showModal" @close="showModal = false"></modal>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from './auth'
  import Modal from './components/Modal.vue'
  export default {
    components: {'modal': Modal},
    computed: {
      flashTypeClass () {
        return 'alert alert-' + this.$store.state.flash.type
      },
      isLoggedIn () {
        return this.$store.state.isLoggedIn
      }
    },
    updated () {
      if (window.localStorage.getItem('token')) {
        this.$store.dispatch('isLoggedIn', window.localStorage.getItem('token'))
      } else {
        this.$store.dispatch('isLoggedIn', false)
      }
    },
    data: {
      showModal: false
    },
    methods: {
      logoutUser () {
        auth.logout(this)
      }
    }
  }
</script>