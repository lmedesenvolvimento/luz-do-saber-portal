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
            path: '/game/:module_slug/:target_audience',
            name: 'module',
            component: require('@/components/pages/ModulePage.vue').default
        },
        {
            path: '/game/:module_slug/:target_audience/:theme_slug',
            name: 'theme',
            component: require('@/components/pages/ThemePage.vue').default
        },
        {
            path: '/game/:module_slug/:target_audience/:theme_slug/:unit_slug',
            name: 'unit',
            component: require('@/components/pages/UnitPage.vue').default,
            children: [
                {
                    name: 'activity',
                    path: ':position',
                    component: require('@/components/pages/ActivityPage.vue').default
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
