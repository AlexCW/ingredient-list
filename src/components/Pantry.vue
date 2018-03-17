<template>
<div class="pantry">
    <div class="pantry-header-wrapper">
        <h1 class="pantry-header">Your Pantry</h1>
        <div class="pantry-lookup">
              <ul class="list-group list-group-flush">
                  <li v-for="(ingredient, index) in ingredients" class="list-group-ingredient">
                      <Lookahead v-model="ingredient.text.id" src="http://api.eataway.co.uk/ingredients"></Lookahead>
                      <a class="btn btn-success" v-on:click="addRow(index, $event)">+</a>
                      <a class="btn btn-danger" v-on:click="removeRow(index, $event)">-</a>
                  </li>
              </ul>
        </div>
    </div>
    <div class="pantry-description">
        <p class="card-text">
            Add ingredients to your ingredients list and we will do our best to suggets you the best recipes for your pantry of ingredients.
        </p>
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
                <v-select v-model="cuisine" placeholder="Select Cuisine" :options="getCuisines"></v-select>
            </div>
            <div class="col-lg-12">
                <v-select v-model="tag" placeholder="Select Tags" multiple :options="getTags"></v-select>
            </div>
        </div>
    </div>
    <div class="pantry-search">
        <button class="btn btn-primary search" v-on:click="searchRecipes()">Search</button>
    </div>
  
    <div class="pantry-recipes">
        <div class="recipes" v-if="getRecipes">
          <template v-for="(recipe, index) in getRecipes">
              <recipe keep-alive v-bind:recipe="recipe" v-bind:ingredients="myIngredients"></recipe>
          </template>
        </div>
    </div>
</div>
</template>

<script>
import Lookahead from './Lookahead.vue'
import Recipe from './Recipe.vue'
import vSelect from 'vue-select'
import auth from '../auth'
import config from '../config/pantry'
import { cuisines } from '../api/cuisines'
import { recipes } from '../api/recipes'
import { tags } from '../api/tags'

//  chanhge to environment variable
const API_URL = 'http://api.eataway.co.uk/'

export default {
  template: '#ingredients',
  components: { Lookahead, Recipe, vSelect },
  data: () => Object.assign(config, {
    ingredients: [{
      text: {
        id: '',
        name: ''
      }
    }],
    options: {},
    myIngredients: [],
    cookingTime: '',
    prepTime: '',
    difficulty: ''
  }),
  computed: {
    getCuisines () {
      return this.$store.getters['cuisines/cuisinesList']
    },
    getTags () {
      return this.$store.getters['tags/tagsList']
    },
    getRecipes () {
      return this.$store.getters['recipes/recipes']
    }
  },
  created () {
    cuisines.getCuisines()
    tags.getTags()
  },
  methods: {
    addRow (index, e) {
      if (this.ingredients.length >= 20) {
        this.$store.dispatch('flash/flash', {type: 'danger', message: 'You can have a maximum of twenty ingredients in your list.', visible: true, active: true})
        return false
      }
      this.$store.dispatch('flash/flash', {visible: false})
      this.ingredients.splice(index + 1, 0, { text: { id: '', name: '' } })
    },
    removeRow (index, e) {
      if (this.ingredients.length <= 1) {
        this.$store.dispatch('flash/flash', {type: 'danger', message: 'You must have at least one ingredient in your list.', visible: true, active: true})
        return false
      }
      this.$store.dispatch('flash/flash', {visible: false})
      this.ingredients.splice(index, 1)
    },
    searchRecipes () {
      if (typeof this.options.data !== undefined) {
        this.prepareSearch()
        recipes.getSuggestedRecipes(this.buildRecipeOptions())
      }
    },
    formatOptions (options) {
      return options.data.map(option => option.attributes.name)
    },
    prepareSearch () {
      var options = this.options.data.reduce((reduceObject, ingredient) => {
        var obj = reduceObject.hasOwnProperty('attributes') ? {} : reduceObject
        obj[ingredient.attributes.name] = ingredient.id
        return obj
      })

      this.myIngredients = this.ingredients.map(ingredient => options[ingredient.text.id])
                                           .filter(ingredient => ingredient !== undefined)
      this.recipes = {}
    },
    buildRecipeOptions () {
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
    getOptions (callback) {
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
  }
}
</script>