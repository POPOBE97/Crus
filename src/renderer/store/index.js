import Vue from 'vue'
import Vuex from 'vuex'

import ui from './modules/ui/ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    ui
  },
  strict: debug,
  plugins: debug ? [Vuex.createLogger()] : []
})
