<template>
    <div id="unit" class="page-container" v-if="unit">
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
    mixins: [ RouteMixin ],
    components: { ...ui },
    created(){
        this.fetchUnit(this.$route.params)
    },
    computed: {
        ...mapState('Unit', ['unit'])
    },
    methods: {
        ...mapActions('Unit', ['fetchUnit'])
    }
}
</script>

<style>

</style>
