<style>

.search {
  margin-bottom: 5px;
  width:100%;
}

.row.filters {
  margin-bottom: 5px;
}

.tt-menu {
  cursor: pointer;
  width: 100%;
  text-align: center;
  background: white;
}

.tt-menu h2 {
  font-size: 100%;
  margin: 5px;
}

.tt-suggestion.tt-selectable{
  border: 1px solid lightgray;
  border-radius: 2px;
}

.row .v-select {
  background-color: white;
}

.row .v-select .selected-tag {
  background-color: none !important;
  border: none;
}

#ingredients {
  text-align: center;
}
</style>

<template>
<div>
  <div class="col-sm-10 col-sm-offset-1">
    <div id="ingredients">
      <div class="alert alert-danger" v-if="alert">{{alert}}</div>
          <h1>Your Pantry</h1>
          <div class="card-block">
              <p class="card-text">Add ingredients to your ingredients list and we will do our best to suggets you the best recipes for your pantry of ingredients.</p>
          </div>
          <div class="row filters">
              <div class="col-lg-3">
                <v-select v-model="difficulty" placeholder="Select Difficulty" :options="difficulties"></v-select>
              </div>
              <div class="col-lg-3">
                <input type="text" class="form-control" v-model="prepTime" placeholder="Prep Time"/>
              </div>
              <div class="col-lg-3">
                <input type="text" class="form-control" v-model="cookingTime" placeholder="Cooking Time"/>
              </div>
              <div class="col-lg-3">
                <v-select v-model="cuisine" placeholder="Select Cuisine" :options="cuisines"></v-select>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <ul class="list-group list-group-flush">
                  <li v-for="(ingredient, index) in ingredients" class="list-group-ingredient">
                      <lookahead v-model="ingredient.text.id" src="http://api.eataway.co.uk/ingredients"></lookahead>
                      <a class="btn btn-success" v-on:click="addRow(index, $event)">+</a>
                      <a class="btn btn-danger" v-on:click="removeRow(index, $event)">-</a>
                  </li>
              </ul>
              <button class="btn btn-primary search" v-on:click="searchRecipes()">Search</button>
            </div>
          </div>
        </div>
    </div>
    <div class="row">
      <div class="recipes" v-if="recipes.length">
          <template v-for="(recipe, index) in recipes">
              <recipe keep-alive v-bind:recipe="recipe" v-bind:included="included" v-bind:ingredients="myIngredients"></recipe>
          </template>
      </div>
      <div class="col-sm-8 col-sm-offset-2" v-else>
        <p class="alert alert-danger">There are currently no recipes</p>
      </div>
    </div>
  </div>
</template>

<script>
import Lookahead from './Lookahead.vue'
import Recipe from './Recipe.vue'
import vSelect from 'vue-select'

export default {
  template: '#ingredients',
  components: { 'lookahead': Lookahead, 'recipe': Recipe, 'vSelect': vSelect },
  data: function () {
    return {
      alert: '',
      images: [],
      ingredients: [
        {
          text: {
            id: '',
            name: ''
          }
        }
      ],
      src: 'http://api.eataway.co.uk/recipes/ingredients/suggest',
      options: {},
      recipes: {},
      included: {},
      myIngredients: [],
      cookingTime: '',
      prepTime: '',
      difficulty: '',
      difficulties: [{value: 'easy', label: 'Easy'}, {value: 'medium', label: 'Medium'}, {value: 'hard', label: 'Hard'}],
      cuisines: []
    }
  },
  created: function () {
    this.$http.get('http://api.eataway.co.uk/cuisines').then((response) => {
      this.cuisines = response.data.data.map(function (cuisine) {
        return {value: cuisine.id, label: cuisine.attributes.name}
      })
    }, (response) => {
    }).bind(this)
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
      return options.data.map(function (data) {
        return data.attributes.name
      })
    },
    searchRecipes: function () {
      if (typeof this.options.data !== undefined) {
        var options = this.options.data.reduce(function (reduceObject, ingredient) {
          var obj = reduceObject.hasOwnProperty('attributes') ? {} : reduceObject
          obj[ingredient.attributes.name] = ingredient.id
          return obj
        })
        var ingredients = this.ingredients.map(function (a) { return options[a.text.id] }).filter(function (a) {
          return a !== undefined
        })
        this.myIngredients = ingredients
        this.recipes = {}
        this.$http.post(this.src, this.buildRecipeOptions()).then((response) => {
          this.recipes = response.data.data
          this.included = response.data.included
        }, (response) => {
        }).bind(this)
      }
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

      return options
    },
    getOptions: function (callback) {
      var that = this
      if (!this.options.hasOwnProperty('data')) {
        this.$http.get('http://api.eataway.co.uk/ingredients', {}, {}).then((response) => {
          that.options = response.data
          return callback(response.data)
        }, (response) => {
        }).bind(this)
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