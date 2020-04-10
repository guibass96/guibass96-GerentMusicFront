import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueFilterDateFormat from 'vue-filter-date-format';
import  store from './store/store'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.use(VueFilterDateFormat);

Vue.config.productionTip = false


Vue.use(VueTextareaAutosize)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
