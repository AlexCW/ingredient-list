<template>
  <div id="recipe" class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <img class="card-img-top img-thumbnail rounded" v-bind:src="recipe.upload" alt="Card image cap" v-on:click="viewImage()">
        <div class="card-block">
          <h4 class="card-title">{{recipe.attributes.name}}</h4>
          <div class="card-block">
            <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['prep-time']}}</span>
            <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['cooking-time']}}</span>
            <span v-if="recipe.relationships.ingredients.data.length" class="card-link" v-on:click="showIngredients()"><i class="glyphicon glyphicon-grain">{{recipe.relationships.ingredients.data.length}}</i>&nbsp;</span>
          </div>
          <a v-if="recipe.attributes['external-url']" v-bind:href="recipe.attributes['external-url']" target="_blank" class="btn btn-primary">View Recipe</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../helpers/api'
export default {
  created: function () {
    this.recipe.upload = this.getUploads('large')
  },
  mounted: function () {
    this.recipe.upload = this.getUploads('large')
  },
  computed: {
    modal: function () {
      return this.$root.$children.filter(child => child.type === 'modal').pop()
    }
  },
  methods: {
    getUploads: function (size) {
      var ids = api.getRelationshipIdentifiers(this.recipe, 'uploads')

      var uploads = api.getIncludedData(this, ids)

      if (uploads.length > 0) {
        return uploads[0]['attributes']['url'] + '/' + size + '.jpg'
      } else {
        return ''
      }
    },
    getIngredients: function () {
      var ids = api.getRelationshipIdentifiers(this.recipe, 'ingredients')

      var ingredients = api.getIncludedData(this, ids)

      if (ingredients.length > 0) {
        this.recipe.ingredients = ingredients
      }
    },
    showIngredients: function () {
      this.getIngredients()
      this.modal.resetProperties()
      this.modal.table.headers = ['Name', 'Amount']
      this.modal.table.rows = this.buildIngredientsTable()
      this.$root.showModal = true
      this.modal.title = 'Ingredients'
    },
    buildIngredientsTable: function () {
      var ingredients = {}
      var userIngredients = this.ingredients
      this.recipe.ingredients.forEach(ingredient => {
        var background = userIngredients.indexOf(ingredient.id) > -1 ? 'user-has-ingredient' : ''

        ingredients[ingredient.attributes.name] = {
          style: background,
          value: ingredient.attributes.amount + (ingredient.attributes.measurement !== 'total' ? ingredient.attributes.measurement : '')
        }
      })
      return ingredients
    },
    viewImage: function () {
      this.modal.resetProperties()
      this.$root.showModal = true
      this.modal.title = this.recipe.attributes.name
      this.modal.image = {
        'src': this.getUploads('largest')
      }
      this.modal.containerStyle = {width: '40%'}
    }
  },
  props: ['recipe', 'included', 'ingredients'],
  template: '#recipes'
}
</script>