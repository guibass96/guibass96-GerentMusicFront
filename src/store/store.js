import Vue from 'vue'
import Vuex from 'vuex'
import calendario from './modules/calendario'
Vue.use(Vuex)

export default new Vuex.Store({

    modules: {calendario}
})