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
      <div class="col-sm-3">

      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>