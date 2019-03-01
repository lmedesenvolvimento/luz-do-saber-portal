import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/pages/HomePage.vue').default
    },
    {
      path: '/componentes',
      name: 'components',
      component: require('@/components/pages/ComponentPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
