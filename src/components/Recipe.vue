<template>
  <div id="recipes" class="col-sm-3">
    <div class="card">
      <img class="card-img-top img-thumbnail rounded" src="http://cdn.jamieoliver.com/recipe-database/430_575/0x0zIFPCqlsBq04WOaAyic.jpg" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">{{recipe.attributes.name}}</h4>
        <p class="card-text">{{recipe.attributes.summary}}</p>
        <span class="card-link">{{recipe.attributes['prep-time']}}</span>
        <a href="#" class="btn btn-primary">View Recipe</a>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  props: ['recipe'],
  template: '#recipes'
}
</script>