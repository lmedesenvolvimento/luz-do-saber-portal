<template>
    <div id="theme" class="page-container">        
        <div class="container">
            <b-card class="mt-5">
                <b-card>
                    <b-card-body v-if="theme">
                        <h2>Thema</h2>
                        <h1>{{ theme.title }}</h1>
                        <ul>
                            <li v-for="unit in theme.units" :key="unit.id">
                                <router-link :to="{ 
                                    name: 'unit', 
                                    params: { 
                                        module_slug: $route.params.module_slug, 
                                        theme_slug: theme.slug,
                                        unit_slug: unit.slug
                                    }}"
                                >
                                    {{ unit.title }}
                                </router-link>
                            </li>
                        </ul>
                        <b-btn variant="link" :to="historyBack">
                            Voltar
                        </b-btn>
                    </b-card-body>
                </b-card>                
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { RouteMixin } from './index'

export default {
    mixins: [RouteMixin],
    computed: {
        ...mapState('Theme', ['theme'])
    },
    created(){
        this.fetchTheme(this.$route.params)
    },
    methods: {
        ...mapActions('Theme', ['fetchTheme'])
    }
}
</script>

<style>

</style>
