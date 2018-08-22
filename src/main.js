// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

export const store = new Vuex.Store({
  state: {
    cmav_addr: 'http://127.0.0.1:8000'
  },
  getters: {
    cmav_addr: state => state.cmav_addr
  },
  mutations: {
    setCmavAddr (state, newAddr) {
      state.cmav_addr = newAddr
    }
  }
})

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
