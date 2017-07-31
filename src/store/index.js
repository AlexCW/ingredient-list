import Vue from 'vue'
import Vuex from 'vuex'
import { flashModule } from './modules/flash'
import { authModule } from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flash: flashModule,
    auth: authModule
  }
})
