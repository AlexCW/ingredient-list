<template>
<div id="recipe" class="col-sm-6 col-md-4">
    <div class="card">
        <div class="card-content">
            <div class="card-image" v-bind:style="{ backgroundImage: 'url(' + recipe.upload + ')' }" v-on:click="viewImage()" alt="Card image cap"></div>
            <h4>{{recipe.attributes.name}}</h4>

            <div class="card-details">
                <div class="card-details-inner">
                    <div class="view-more">
                        <a v-if="recipe.attributes['external-url']" v-bind:href="recipe.attributes['external-url']" target="_blank" class="button">View Recipe</a>
                    </div>
                    <div class="icons">
                        <div class="time">
                            <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['prep-time']}}</span>
                            <span class="card-link"><i class="glyphicon glyphicon-time"></i>&nbsp;{{recipe.attributes['cooking-time']}}</span>
                        </div>
                        <div class="counts">
                            <span v-if="recipe.relationships.ingredients.data.length" class="card-link" v-on:click="showIngredients()"><i class="glyphicon glyphicon-grain"></i>&nbsp;{{recipe.relationships.ingredients.data.length}}</span>
                        </div>
                    </div>
                </div>
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
      this.$root.showModal = true // vuex?
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