<template>
    <div id="module" class="page-container">        
        <div class="container">
            <b-card class="mt-5">
                <b-card>
                    <b-card-body v-if="activeModule">
                        <h1>{{ activeModule.title }}</h1>
                        <ul>
                            <li v-for="theme in activeModule.themes" :key="theme.id">
                                <router-link :to="{ name: 'theme', params: { module_slug: $route.params.module_slug, theme_slug: theme.slug } }">
                                    {{ theme.title }}
                                </router-link>
                            </li>
                        </ul>
                    </b-card-body>
                    <b-btn variant="link" :to="historyBack">
                        Voltar
                    </b-btn>
                </b-card>                
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { RouteMixin } from './index'
export default {
    mixins: [RouteMixin],
    created(){
        this.fetchModule(this.$route.params.module_slug)
    },
    computed: {
        ...mapState('Modules', ['activeModule'])
    },
    methods: {
        ...mapActions('Modules', ['fetchModule'])
    }
}
</script>

<style>

</style>
