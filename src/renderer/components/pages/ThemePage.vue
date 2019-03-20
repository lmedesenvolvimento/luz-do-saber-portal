<template>
    <div id="module" class="page-container">        
        <div class="container">
            <b-card class="mt-5">
                <b-card>
                    <b-card-body v-if="theme">
                        <h1>{{ theme.title }}</h1>
                        <ul>
                            <li v-for="unit in theme.units" :key="unit.id">
                                {{ unit.title }}                                
                            </li>
                        </ul>
                        <b-btn variant="light" v-on:click='historyBack'>
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
    created(){
        this.fetchTheme(this.$route.params)
    },
    computed: {
        ...mapState('Theme', ['theme'])
    },
    methods: {
        ...mapActions('Theme', ['fetchTheme'])
    }
}
</script>

<style>

</style>
