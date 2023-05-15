import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as PIXI from 'pixi.js'
Vue.prototype.PIXI = PIXI;

Vue.config.productionTip = false
// Vue.use(pixi, pixi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')