import Vue from 'vue'
import Vuex from 'vuex'
import { authModule } from './modules/auth'
import { cuisinesModule } from './modules/cuisines'
import { flashModule } from './modules/flash'
import { globalModule } from './modules/global'

import { ingredientsModule } from './modules/ingredients'
import { recipesModule } from './modules/recipes'
import { tagsModule } from './modules/tags'
import { uploadsModule } from './modules/uploads'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    cuisines: cuisinesModule,
    flash: flashModule,
    global: globalModule,
    ingredients: ingredientsModule,
    recipes: recipesModule,
    tags: tagsModule,
    uploads: uploadsModule
  }
})
