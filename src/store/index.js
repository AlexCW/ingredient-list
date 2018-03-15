import Vue from 'vue'
import Vuex from 'vuex'
import { authModule } from './modules/auth'
import { cuisinesModule } from './modules/cuisines'
import { flashModule } from './modules/flash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    cuisines: cuisinesModule,
    flash: flashModule
  }
})
