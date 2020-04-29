import Vue from 'vue/dist/vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  components: {
    HcCovid19Data: App
  }
}).$mount('#app')
