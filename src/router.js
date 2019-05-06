import Vue from 'vue'
import Router from 'vue-router'
import Formulas from './views/Formulas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'formulas',
      component: Formulas
    }
  ]
})
