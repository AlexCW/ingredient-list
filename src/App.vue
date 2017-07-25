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
    data: {
      showModal: false,
      isLoggedIn: auth.isUserLoggedIn()
    },
    methods: {
      logoutUser () {
        auth.logout()
      }
    }
  }
</script>