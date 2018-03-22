<template>
<div class="pantry">
    <div class="pantry-header-wrapper">
        <h1 class="pantry-header">Your Pantry</h1>
        <div class="pantry-lookup">
              <ul class="list-group list-group-flush">
                  <li v-for="(ingredient, index) in ingredients" class="list-group-ingredient">
                      <Lookahead v-model="ingredient[0]"></Lookahead>
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
              <recipe keep-alive v-bind:recipe="recipe" v-bind:ingredients="myIngredients()"></recipe>
          </template>
        </div>
    </div>
</div>
</template>

<script>
import Lookahead from './Lookahead.vue'
import Recipe from './Recipe.vue'
import vSelect from 'vue-select'
import config from '../config/pantry'
import { cuisines } from '../api/cuisines'
import { ingredients } from '../api/ingredients'
import { recipes } from '../api/recipes'
import { tags } from '../api/tags'

const MIN_INGREDIENTS = 1
const MAX_INGREDIENTS = 20

export default {
  template: '#ingredients',
  components: { Lookahead, Recipe, vSelect },
  data: () => Object.assign(config, {
    ingredients: [{}],
    options: {},
    cookingTime: '',
    prepTime: '',
    difficulty: ''
  }),
  computed: {
    getCuisines () {
      return this.$store.getters['cuisines/cuisinesList']
    },
    getRecipes () {
      return this.$store.getters['recipes/recipes']
    },
    getTags () {
      return this.$store.getters['tags/tagsList']
    }
  },
  created () {
    cuisines.getCuisines()
    tags.getTags()
  },
  methods: {
    addRow (index, e) {
      if (this.ingredients.length >= MAX_INGREDIENTS) {
        this.$store.dispatch('flash/flash', {type: 'danger', message: 'You can have a maximum of ' + MAX_INGREDIENTS + ' ingredients in your list.', visible: true, active: true})
        return false
      }
      this.$store.dispatch('flash/flash', {visible: false})
      this.ingredients.splice(index + 1, 0, {})
    },
    removeRow (index, e) {
      if (this.ingredients.length <= MIN_INGREDIENTS) {
        this.$store.dispatch('flash/flash', {type: 'danger', message: 'You must have at least ' + MIN_INGREDIENTS + ' ingredient in your list.', visible: true, active: true})
        return false
      }
      this.$store.dispatch('flash/flash', {visible: false})
      this.ingredients.splice(index, 1)
    },
    searchRecipes () {
      if (typeof this.options.data !== undefined) {
        this.clearExistingRecipes()
        recipes.getSuggestedRecipes(this.buildRecipeOptions())
      }
    },
    formatOptions (options) {
      return options.data.map(option => option.attributes.name)
    },
    clearExistingRecipes () {
      this.$store.dispatch('recipes/setRecipes', { recipes: {} })
    },
    myIngredients () {
      if (this.ingredients) {
        return this.ingredients.map(selectedIngredient => this.$store.getters['ingredients/ingredientsList'][selectedIngredient[0]])
      }
    },
    buildRecipeOptions () {
      var options = {'ingredients': this.myIngredients()}

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
        return ingredients.getIngredients(callback)
      } else {
        return callback(that.options)
      }
    }
  }
}
</script>