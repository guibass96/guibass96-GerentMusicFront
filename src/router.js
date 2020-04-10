import Vue from 'vue'
import Router from 'vue-router'
import calendario from './components/calendario/Calendar'
import timer from './components/Timer'
import home from './components/Home'
import treino from './components/Treino'
import metasEstrategias from './components/MetasEstrategias'


Vue.use(Router)

export default new Router({
routes:[{
    path:'/',
    component:home
},
{
    path:'/calendario',
    component:calendario
},
{
    path:'/praticar',
    component:timer
},
{
    path:'/treino',
    component:treino
}
,
{
    path:'/metas',
    component:metasEstrategias
}

]

})