<template>
    <div id="module" class="page-container" :class="activeModule ? activeModule.slug : ''">
        <div v-if="activeModule" class="container">
            <navbar
                :navbar-title="'MÓDULO: '+activeModule.slug "
                :navbar-subtitle="'TEMAS'"
                :navbar-icon="getModuleImage(activeModule)"
            />
            <b-row class="mt-5">
                <div class="circle">
                    <ul>
                        <li v-for="theme in activeModule.themes" :key="theme.id">
                            <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                                <vue-circle
                                    class="m-5"
                                    :label="theme.title"
                                    :image="getModuleImage(theme)"
                                    :progress="50"
                                    :color="getModuleColor(activeModule)"
                                />
                            </router-link>
                        </li>
                    </ul>
                </div>                           
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { RouteMixin } from './index'
import VueCircle from './CircleProgressThemes'
import Navbar from '../ui/navbars/Navbar'

export default {
    components: {
        VueCircle,
        Navbar
    },
    mixins: [RouteMixin],
    computed: {
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchModule(this.$route.params.module_slug)
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
                return  { color: '#EC2727' }
            case 'ler':
                return { color: '#00963F' }
            case 'escrever':
                return { color: '#007CB2' }
            default:
                break;
            }
        },
        ...mapActions('Modules', ['fetchModule'])
    }
}
</script>

<style>

</style>
