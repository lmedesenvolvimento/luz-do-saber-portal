import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/pages/FrontPage.vue').default
    },
    {
      path: '/game/:module_slug',
      name: 'module',
      component: require('@/components/pages/ModulePage.vue').default
    },
    {
      path: '/game/:module_slug/:theme_slug',
      name: 'theme',
      component: require('@/components/pages/ThemePage.vue').default
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
