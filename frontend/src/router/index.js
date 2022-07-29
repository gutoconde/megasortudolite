import Vue from 'vue'
import Router from 'vue-router'
import Palpites from '@/components/Palpites'
import EstatisticaList from '@/components/EstatisticaList'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Palpites',
      component: Palpites
    },
    {
      path: '/estatisticaList',
      name: 'EstatisticaList',
      component: EstatisticaList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
  ]
})
