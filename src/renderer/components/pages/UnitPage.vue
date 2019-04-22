<template>
    <div v-if="unit" id="unit" class="page-container">
        <ls-navbar :navbar-title="unit.title" :navbar-subtitle="'Lorem Ipsum'" :navbar-icon="'https://placeimg.com/480/480/tech'">
            <b-btn variant="link" to="/components">
                <div class="icon-home"></div>
            </b-btn>            
            <span class="flex"></span>
            <div class="navbar-title">{{ unit.title }}</div>
            <span class="flex"></span>
        </ls-navbar>
        <div class="container">            
            <ls-gameplay></ls-gameplay>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { RouteMixin } from './index'

import ui from '@/components/ui'

export default {
    components: { ...ui },
    computed: {
        ...mapState('Unit', ['unit', 'navigator'])
    },
    watch: {
        navigator: {
            handler(val){
                console.log(val)
            },
            deep: true
        }
    },
    created(){
        this.fetchUnit(this.$route.params)
    },
    methods: {
        ...mapActions('Unit', ['fetchUnit'])
    },
}
</script>

<style>

</style>