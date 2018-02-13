<template>
  <div id="app">
    <div class="header-wrapper">
        <a class="logo" href="#">
          <i class="glyphicon glyphicon-time"></i>
          <strong>Pantry Picker</strong>
        </a>
    </div>
    <nav class="navbar navbar-default">
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/' }">Home</router-link></li>
          <li v-if="!isLoggedIn"><router-link :to="{ path: '/login' }">Login</router-link></li>
          <li v-if="isLoggedIn"><router-link :to="{ path: 'pantry' }">Pantry</router-link></li>
          <li v-if="isLoggedIn"><router-link :to="{ path: 'favourites' }">Favourites</router-link></li>
          <li v-if="isLoggedIn"><router-link :to="{ path: 'logout' }">Logout</router-link></li>
        </ul>
    </nav>
    <div class="container">
      <div id="flash-message" v-bind:class="flashTypeClass" v-if="$store.state.flash.visible">
          {{$store.state.flash.message}}
      </div>
      <router-view></router-view>
      <modal :show.sync="showModal" @close="showModal = false"></modal>
    </div>
  </div>
</template>

<script>
  import Modal from './components/Modal.vue'
  export default {
    components: {'modal': Modal},
    computed: {
      flashTypeClass () {
        return 'alert alert-' + this.$store.state.flash.type
      },
      isLoggedIn () {
        return this.$store.state.auth.isLoggedIn
      }
    },
    data: function () {
      return {
        showModal: false
      }
    }
  }
</script>