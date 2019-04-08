<template>
    <div v-if="unit" id="unit" class="page-container">
        <ls-navbar>
            <b-btn variant="link" to="/components">
                <div class="icon-home"></div>
            </b-btn>            
            <span class="flex"></span>
            <div class="navbar-title">{{ unit.title }}</div>
            <span class="flex"></span>
        </ls-navbar>
        <ls-gameplay></ls-gameplay>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { RouteMixin } from './index'

import ui from '@/components/ui'

export default {
    components: { ...ui },
    mixins: [ RouteMixin ],
    computed: {
        ...mapState('Unit', ['unit'])
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
