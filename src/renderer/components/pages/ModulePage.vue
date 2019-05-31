<template>
    <div 
        v-if="activeModule" 
        id="module" 
        class="page-container" 
        :class="activeModule ? activeModule.slug : ''"
    >
        <navbar
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Temas'"
            :navbar-icon="getModuleImage(activeModule)"
        />
        <div class="page-container-wrap-spacing">
            <b-row>
                <b-col v-for="theme in getThemes" :key="theme.id" cols="12" md="6">
                    <div class="my-2 circle-box">
                        <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                            <vue-circle
                                class=""
                                :label="theme.title"
                                :image="getThemeImage(theme)"
                                :progress="50"
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
import { filter } from 'lodash'
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
        getThemes(){
            const { params } = this.$route
            if (params.target_audience !== 'geral'){
                return filter(this.activeModule.themes, { target_audience: params.target_audience })
            } else {
                return this.activeModule.themes
            }
        },
        renderNavTitle(){
            return this.activeModule.slug ? 'Módulo ' + this.activeModule.slug : ''
        },        
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchModule(this.$route.params.module_slug)
    },
    beforeDestroy(){
        this.destroyModules();
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
        getThemeImage(theme) {
            return theme.cover_url ? theme.cover_url : 'http://pngimg.com/uploads/book/book_PNG51049.png'
        },
        ...mapActions('Modules', ['fetchModule', 'destroyModules'])
    }
}
</script>

<style>

</style>
