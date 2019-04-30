<template>
    <div id="module" class="page-container" :class="activeModule ? activeModule.slug : ''">
        <div v-if="activeModule" class="container">
            <navbar
                :navbar-title="renderNavTitle"
                :navbar-subtitle="'Temas'"
                :navbar-icon="getModuleImage(activeModule)"
            />
            <b-col class="circle-list">
                <b-col v-for="theme in activeModule.themes" :key="theme.id" class="my-3 mx-4 circle-box flex-fill">
                    <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                        <vue-circle
                            class=""
                            :label="theme.title"
                            :image="getThemeImage(theme.slug)"
                            :progress="50"
                            :color="getModuleColor(activeModule)"
                        />
                    </router-link>
                </b-col>
                <b-col v-show="emptyCellTheme" class="my-3 mx-4 circle-box flex-fill" />
            </b-col>
        </div>
        <b-card class="mt-5">
            <b-card-body>
                <b-btn variant="link" :to="historyBack">
                    Voltar
                </b-btn>
                <b-btn variant="link" to="/componentes">
                    Componentes
                </b-btn>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { RouteMixin } from './index'
import VueCircle from '../ui/CircleProgressThemes'
import Navbar from '../ui/navbars/Navbar'

export default {
    components: {
        VueCircle,
        Navbar
    },
    mixins: [RouteMixin],
    data() {
        return {
            emptyCellTheme: false
        }
    },
    computed: {
        ...mapState('Modules', ['activeModule']),
        renderNavTitle(){
            return this.activeModule.slug ? 'Módulo ' + this.activeModule.slug : ''
        },
    },
    created(){
        this.fetchModule(this.$route.params.module_slug)
    },
    updated() {
        this.emptyCellTheme = this.alignEmptySpaces();
    },
    methods: {
        getModuleImage(module){
            switch (module.slug) {
            case 'comecar':
                return require('@/assets/images/btn-start.png')
            case 'ler':
                return require('@/assets/images/btn-read.png')
            case 'escrever':
                return require('@/assets/images/btn-write.png')
            default:
                break;
            }
        },
        getModuleColor(module){
            switch (module.slug) {
            case 'comecar':
                return  { color: '#C72929' }
            case 'ler':
                return { color: '#00963F' }
            case 'escrever':
                return { color: '#007CB2' }
            default:
                break;
            }
        },
        getThemeImage(themeSlug) {
            switch (themeSlug) {
            case 'meu-nome':
                return 'https://image.flaticon.com/icons/png/128/145/145867.png'
            default:
                return 'https://image.flaticon.com/icons/png/128/145/145867.png'
            }
        },
        alignEmptySpaces() {
            var list = document.getElementsByClassName('circle-list')[0]
            var numThemes = list.getElementsByClassName('circle-box').length

            if (numThemes % 2 == 0){
                return true
            }
        },
        ...mapActions('Modules', ['fetchModule'])
    }
}
</script>

<style>

</style>
