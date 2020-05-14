import Vue from 'vue'
import Router from 'vue-router'

import db from '@/services/Session'

import store from '../store'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: require('@/components/pages/FrontPage.vue').default
        },
        {
            path: '/game/escrever/geral',
            name: 'write',
            component: require('@/components/pages/ModulesEscreverPage.vue').default
        },
        {
            path: '/game/biblioteca/geral',
            name: 'books',
            component: require('@/components/pages/ModuleBibliotecaPage.vue').default
        },
        {
            path: '/game/biblioteca/geral/:livro_id',
            name: 'book',
            component: require('@/components/pages/ModuleBibliotecaLivroPage.vue').default
        },
        {
            path: '/game/escrever/geral/:escrever_id',
            name: 'write-module',
            component: require('@/components/pages/ModuleEscreverPage.vue').default
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

router.beforeEach((to, from, next) => {    
    const snapshot = db.value()
    
    if (!isAuthorized() && snapshot.data && snapshot.data.name){
        store.dispatch('User/destroyUserDatabase')
    }

    if (to.path !== '/' && !isAuthorized()){
        store.dispatch('User/destroyUserDatabase')

        setRedirectPath(to.path)

        return next({
            path: '/'
        })
    }

    next()
})

function setRedirectPath(path) {
    Vue.$cookies.set('redirectPath', path)
}

function isAuthorized() {
    return !!Vue.$cookies.get('userName')
}

export default router