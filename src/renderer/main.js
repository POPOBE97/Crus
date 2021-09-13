import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import 'Vuetify/dist/vuetify.min.css' // 引入Vuetify的css文件

Vue.use(Vuetify)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
