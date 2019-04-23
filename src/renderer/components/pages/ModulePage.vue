<template>
    <div id="module" class="page-container" :class="activeModule ? activeModule.slug : ''">
        <div v-if="activeModule" class="container">
            <navbar
                :navbar-title="'MÓDULO: '+activeModule.slug "
                :navbar-subtitle="'TEMAS'"
                :navbar-icon="getModuleImage(activeModule)"
            />
            <b-row>
                <b-list-group horizontal class="circle-list">
                    <b-list-group v-for="theme in activeModule.themes" :key="theme.id">
                        <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                            <vue-circle
                                class="m-4"
                                :label="theme.title"
                                :image="getThemeImage(theme.slug)"
                                :progress="50"
                                :color="getModuleColor(activeModule)"
                            />
                        </router-link>
                    </b-list-group>
                    <b-list-group>
                        <vue-circle
                            class="m-4"
                            :label="'Título'"
                            :image="'https://image.flaticon.com/icons/png/128/145/145867.png'"
                            :progress="50"
                            :color="{ color: '#EC2727' }"
                        />
                    </b-list-group>
                    <b-list-group>
                        <vue-circle
                            class="m-4"
                            :label="'Título'"
                            :image="'https://image.flaticon.com/icons/png/128/145/145867.png'"
                            :progress="50"
                            :color="{ color: '#EC2727' }"
                        />
                    </b-list-group>
                    <b-list-group>
                        <vue-circle
                            class="m-4"
                            :label="'Título'"
                            :image="'https://image.flaticon.com/icons/png/128/145/145867.png'"
                            :progress="50"
                            :color="{ color: '#EC2727' }"
                        />
                    </b-list-group>
                    <b-list-group>
                        <vue-circle
                            class="m-4"
                            :label="'Título'"
                            :image="'https://image.flaticon.com/icons/png/128/145/145867.png'"
                            :progress="50"
                            :color="{ color: '#EC2727' }"
                        />
                    </b-list-group>
                    <b-list-group>
                        <vue-circle
                            class="m-4"
                            :label="'Título'"
                            :image="'https://image.flaticon.com/icons/png/128/145/145867.png'"
                            :progress="50"
                            :color="{ color: '#EC2727' }"
                        />
                    </b-list-group>
                </b-list-group>
            </b-row>
        </div>
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
        getThemeImage(themeSlug) {
            switch (themeSlug) {
            case 'meu-nome':
                return 'https://image.flaticon.com/icons/png/128/145/145867.png'
            case 'ler':
                return require('@/assets/images/btn-read.png')
            case 'escrever':
                return require('@/assets/images/btn-write.png')
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
