<template>
    <div v-if="unit" id="unit" class="page-container">
        <ls-navbar :navbar-title="unit.title" :navbar-subtitle="'Lorem Ipsum'" :navbar-icon="'https://placeimg.com/480/480/tech'">
            <b-btn variant="link" to="/components">
                <div class="icon-home" />
            </b-btn>            
            <span class="flex" />
            <div class="navbar-title">{{ unit.title }}</div>
            <span class="flex" />
        </ls-navbar>
        <div class="container">            
            <ls-gameplay />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { RouteMixin } from './index'

import ui from '@/components/ui'

export default {
    components: { ...ui },
    mixins: [ RouteMixin ],
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
