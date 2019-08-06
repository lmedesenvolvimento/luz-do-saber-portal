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
            path: '/game/escrever/geral',
            name: 'write',
            component: require('@/components/pages/ModuleEscreverPage.vue').default
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
            path: '/game/escrever/geral/carta',
            name: 'letter',
            component: require('@/components/pages/LetterPage.vue').default
        },
        {
            path: '/game/escrever/geral/lista',
            name: 'list',
            component: require('@/components/pages/ListPage.vue').default
        },
        {
            path: '/game/escrever/geral/cartao-de-aniversario',
            name: 'birthday-card',
            component: require('@/components/pages/BirthdayCardPage.vue').default
        },
        {
            path: '/game/escrever/geral/editor-de-texto',
            name: 'text-editor',
            component: require('@/components/pages/TextEditorPage.vue').default
        },
        {
            path: '/game/escrever/geral/jornal',
            name: 'journal',
            component: require('@/components/pages/JournalPage.vue').default
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
