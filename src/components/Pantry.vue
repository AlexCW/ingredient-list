<template>
<div class="pantry">
    <div class="pantry-header-wrapper">
        <h1 class="pantry-header">Your Pantry</h1>
        <div class="pantry-lookup">
              <ul class="list-group list-group-flush">
                  <li v-for="(ingredient, index) in ingredients" class="list-group-ingredient">
                      <lookahead v-model="ingredient.text.id" src="http://api.eataway.co.uk/ingredients"></lookahead>
                      <a class="btn btn-success" v-on:click="addRow(index, $event)">+</a>
                      <a class="btn btn-danger" v-on:click="removeRow(index, $event)">-</a>
                  </li>
              </ul>
        </div>
    </div>
    <div class="pantry-description">
        <p class="card-text">Add ingredients to your ingredients list and we will do our best to suggets you the best recipes for your pantry of ingredients.</p>
    </div>
    <div class="pantry-filters">
        <div class="pantry-filters-row">
            <div class="col-lg-3">
                <input type="text" class="form-control" v-model="prepTime" placeholder="Prep Time"/>
            </div>
            <div class="col-lg-3">
                <input type="text" class="form-control" v-model="cookingTime" placeholder="Cooking Time"/>
            </div>
            <div class="col-lg-3">
                <v-select v-model="difficulty" placeholder="Select Difficulty" :options="difficulties"></v-select>
            </div>
            <div class="col-lg-3">
                <v-select v-model="cuisine" placeholder="Select Cuisine" :options="cuisines"></v-select>
            </div>
        </div>
        <div class="pantry-filters-row">
            <div class="col-lg-3">
                <v-select v-model="tag" placeholder="Select Tags" multiple :options="tags"></v-select>
            </div>
        </div>
    </div>
    <div class="pantry-search">
        <button class="btn btn-primary search" v-on:click="searchRecipes()">Search</button>
    </div>
  
    <div class="pantry-recipes">
        <div class="recipes" v-if="recipes.length">
          <template v-for="(recipe, index) in recipes">
              <recipe keep-alive v-bind:recipe="recipe" v-bind:included="included" v-bind:ingredients="myIngredients"></recipe>
          </template>
        </div>
        <p v-if="alert" class="alert alert-danger">{{alert}}</p>
    </div>
</div>
</template>

<script>
import Lookahead from './Lookahead.vue'
import Recipe from './Recipe.vue'
import vSelect from 'vue-select'
import auth from '../auth'
import config from '../config/pantry'

const API_URL = 'http://api.eataway.co.uk/'

export default {
  template: '#ingredients',
  components: { 'lookahead': Lookahead, 'recipe': Recipe, 'vSelect': vSelect },
  data: function () {
    return Object.assign(config, {
      alert: '',
      ingredients: [{
        text: {
          id: '',
          name: ''
        }
      }],
      src: API_URL + 'recipes/ingredients/suggest',
      options: {},
      recipes: {},
      included: {},
      myIngredients: [],
      cookingTime: '',
      prepTime: '',
      difficulty: ''
    })
  },
  created: function () {
    var that = this
    this.$http.get(API_URL + 'cuisines?sort=name&direction=asc').then((response) => {
      that.cuisines = response.data.data.map(cuisine => ({value: cuisine.id, label: cuisine.attributes.name}))
    })

    this.$http.get(API_URL + 'tags?sort=name&direction=asc').then((response) => {
      that.tags = response.data.data.map(tag => ({value: tag.id, label: tag.attributes.name}))
    })
  },
  methods: {
    addRow: function (index, e) {
      if (this.ingredients.length >= 20) {
        this.alert = 'You can have a maximum of twenty ingredients in your list.'
      }
      this.ingredients.splice(index + 1, 0, { text: { id: '', name: '' } })
    },
    removeRow: function (index, e) {
      if (this.ingredients.length > 1) {
        this.ingredients.splice(index, 1)
      } else {
        this.alert = 'You must have at least one ingredient in your list.'
      }
    },
    formatOptions: function (options) {
      return options.data.map(option => option.attributes.name)
    },
    searchRecipes: function () {
      var that = this
      if (typeof this.options.data !== undefined) {
        this.prepareSearch()
        this.$http.post(this.src, this.buildRecipeOptions()).then((response) => {
          if (response.data.data.length === 0) {
            that.alert = 'There are currently no recipes'
          }
          that.recipes = response.data.data
          that.included = response.data.included
        }, (response) => {
        })
      }
    },
    prepareSearch: function () {
      var options = this.options.data.reduce((reduceObject, ingredient) => {
        var obj = reduceObject.hasOwnProperty('attributes') ? {} : reduceObject
        obj[ingredient.attributes.name] = ingredient.id
        return obj
      })

      this.myIngredients = this.ingredients.map(ingredient => options[ingredient.text.id])
                                           .filter(ingredient => ingredient !== undefined)
      this.recipes = {}
    },
    buildRecipeOptions: function () {
      var options = {'ingredients': this.myIngredients}

      if (this.difficulty) {
        options['difficulty'] = this.difficulty.value
      }

      if (this.prepTime) {
        options['prep-time-max'] = this.prepTime
      }

      if (this.cookingTime) {
        options['cooking-time-max'] = this.cookingTime
      }

      if (this.cuisine) {
        options['cuisine'] = this.cuisine.value
      }

      if (this.tag) {
        options['tags'] = this.tag.map(tag => tag.value)
      }

      return options
    },
    getOptions: function (callback) {
      var that = this
      if (!this.options.hasOwnProperty('data')) {
        this.$http.get(API_URL + 'ingredients', {}, {
          headers: auth.getAuthHeader()
        }).then((response) => {
          that.options = response.data
          return callback(response.data)
        }, (response) => {
        })
      } else {
        return callback(that.options)
      }
    }
  },
  watch: {
    ingredients: {
      deep: true,
      handler: function (ingredients) {
        if (ingredients.length > 1) {
          this.alert = ''
        }
      }
    }
  }
}
</script>