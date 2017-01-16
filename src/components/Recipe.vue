<template>
  <div id="recipe" class="col-sm-3">
    <div class="card">
      <img class="card-img-top img-thumbnail rounded" v-bind:src="recipe.upload" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">{{recipe.attributes.name}}</h4>
        <p class="card-text">{{recipe.attributes.summary}}</p>
        <div class="card-block">
          <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['prep-time']}}</span>
          <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['cooking-time']}}</span>
        </div>
        <a href="#" class="btn btn-primary">View Recipe</a>
      </div>
    </div>
  </div>
</template>

<style>
  #recipe {
    padding-bottom: 5px;
  }
  #recipe:nth-child(4n+1){
      clear:left
  }
</style>

<script>
export default {
  created: function () {
    this.getUploads()
  },
  mounted: function () {
    this.getUploads()
  },
  methods: {
    getUploads: function () {
      var ids = this.recipe.relationships.uploads.data.map(function (u) {
        return u.id
      })

      var uploads = this.uploads.filter(function (u) {
        return ids.indexOf(u.id) > -1
      })

      if (uploads.length > 0) {
        this.recipe.upload = uploads[0]['attributes']['url'] + '/large.jpg'
      } else {
        this.recipe.upload = 'http://cdn.jamieoliver.com/recipe-database/430_575/0x0zIFPCqlsBq04WOaAyic.jpg'
      }
    }
  },
  props: ['recipe', 'uploads'],
  template: '#recipes'
}
</script>