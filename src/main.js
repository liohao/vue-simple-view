import Vue from 'vue'
import App from './App.vue'
import myMixins from '@/mixins'

Vue.config.productionTip = false
Vue.mixin(myMixins)

new Vue({
  render: h => h(App),
}).$mount('#app')
