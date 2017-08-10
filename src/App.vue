<template>
  <div id="app">
    <nav class="navbar navbar-default">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Pantry Picker
        </a>
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/' }">Home</router-link></li>
          <li v-if="!isLoggedIn()"><router-link :to="{ path: '/login' }">Login</router-link></li>
          <li v-if="isLoggedIn()"><router-link :to="{ path: 'pantry' }">Pantry</router-link></li>
          <li v-if="isLoggedIn()"><a href="#" @click="logoutUser">Logout</a></li>
        </ul>
    </nav>
    <div class="container nopadding">
      <div class="col-sm-12 nopadding">
        <div id="flash-message" v-bind:class="flashTypeClass" v-if="$store.state.flash.visible">{{$store.state.flash.message}}</div>
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
      }
    },
    data: {
      showModal: false
    },
    methods: {
      logoutUser () {
        auth.logout(this)
      },
      isLoggedIn () {
        return this.$store.state.auth.isLoggedIn
      }
    }
  }
</script>