import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import vuetify from '../plugins/vuetify'

import VueVirtualScroller from 'vue-virtual-scroller'
Vue.use(VueVirtualScroller)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  router,
  vuetify,
  template: '<App/>'
}).$mount('#app')
