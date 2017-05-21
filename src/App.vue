<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Ingredients
        </a>
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/' }">Home</router-link></li>
          <li><router-link :to="{ path: 'ingredients' }">Ingredients</router-link></li>
        </ul>
      </div>
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
  import Modal from './components/Modal.vue'
  export default {
    components: {'modal': Modal},
    data: {
      showModal: false
    }
  }
</script>