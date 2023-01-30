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
                            <circle-progress-themes
                                class=""
                                :label="theme.title"
                                :subtitle="theme.subtitle || theme.description"
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
import CircleProgressThemes from '../ui/CircleProgressThemes'
import Navbar from '../ui/navbars/Navbar'

export default {
    components: {
        CircleProgressThemes,
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
                return this.activeModule.themes.filter(({theme_audience, status}) => status === 'active' && theme_audience.slug === params.target_audience)
            } else {
                return filter(this.activeModule.themes, { status: 'active'})
            }
        },
        renderNavTitle(){
            return ( this.activeModule && this.activeModule.title ) ? 'Módulo ' + this.activeModule.title : ''
        },
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchModule(this.$route.params).then(this.registerUserProgress)
    },
    beforeDestroy(){
        this.destroyModule()
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
                break
            }
        },
        getModuleColor(module){
            const colors = {
                comecar: '#C72929',
                ler: '#00963F',
                escrever: '#007CB2',
                biblioteca: 'black'
            }
            return colors[module.slug] ? { color: colors[module.slug] } : { color: '#469d9e' }
        },
        getThemeImage(theme) {
            return theme.cover_url ? theme.cover_url : 'http://pngimg.com/uploads/book/book_PNG51049.png'
        }, 
        getProgressTheme(theme){
            const units = this.getProgressUnitsByThemeId(theme)
            // const total = ( filter(units, { completed: true }).length / theme.units.length ) * 100
            const percentage = units.reduce((acc, { percentage }) => percentage ? acc + percentage : acc + 0, 0) / theme.units.length
            return  percentage > 5 ? percentage : 5
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
