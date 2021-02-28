import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import store from './store'
import './plugins/element.js'
import axios from 'axios'


Vue.prototype.$http = axios 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
