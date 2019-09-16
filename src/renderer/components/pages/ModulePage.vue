<template>
    <div
        v-if="activeModule"
        id="module"
        class="page-container"
    >
        <navbar
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Temas'"
            :navbar-icon="getModuleImage(activeModule)"
        />
        <div class="page-container-wrap-spacing">
            <b-row>
                <b-col v-for="theme in getThemes" :key="theme.id" cols="6">
                    <div class="my-2 circle-box">
                        <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                            <vue-circle
                                class=""
                                :label="theme.title"
                                :image="getThemeImage(theme)"
                                :progress="getProgressTheme(theme)"
                                :color="getModuleColor(activeModule)"
                            />
                        </router-link>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { filter, omit } from 'lodash'
import { RouteMixin } from './index'
import VueCircle from '../ui/CircleProgressThemes'
import Navbar from '../ui/navbars/Navbar'

export default {
    components: {
        VueCircle,
        Navbar,
    },
    mixins: [RouteMixin],
    data() {
        return {
            emptyCellTheme: false
        }
    },
    computed: {
        getThemes(){
            const { params } = this.$route

            if(!this.activeModule) return

            if (params.target_audience !== 'geral'){
                return filter(this.activeModule.themes, { target_audience: params.target_audience })
            } else {
                return this.activeModule.themes
            }
        },
        renderNavTitle(){
            return ( this.activeModule && this.activeModule.title ) ? 'Módulo ' + this.activeModule.title : ''
        },
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchModule(this.$route.params.module_slug).then(this.registerUserProgress)
    },
    beforeDestroy(){
        this.destroyModule();
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
            case 'biblioteca':
                return { color: 'black' }
            default:
                break;
            }
        },
        getThemeImage(theme) {
            return theme.cover_url ? theme.cover_url : 'http://pngimg.com/uploads/book/book_PNG51049.png'
        }, 
        getProgressTheme(theme){
            const units = this.getProgressUnitsByThemeId(theme)
            const total = ( filter(units, { completed: true }).length / theme.units.length ) * 100
            return  total || 5
        },
        registerUserProgress(_module){
            _module.themes.forEach((theme) => {
                const units = this.getProgressUnitsByThemeId(theme)
                const completed = filter(units, { completed: true }).length === theme.units.length
                const payload = {
                    data: {
                        ...omit(theme, ['units']),
                        completed
                    },
                    type: 'themes',
                }
                this.add(payload)
            })
        },
        getProgressUnitsByThemeId(theme){
            return this.$store.getters['Pointings/getUnitsByThemeId'](theme.id)
        },
        ...mapActions('Modules', ['fetchModule', 'destroyModule']),
        ...mapActions('Pointings', ['add'])
    }
}
</script>

<style>

</style>
