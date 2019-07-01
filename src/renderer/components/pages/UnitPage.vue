<template>
    <div v-if="unit" id="unit" class="page-container">
        <navbar :navbar-title="renderNavTitle" :navbar-icon="unitImage" :custom="true">
        </navbar>
        <ls-gameplay></ls-gameplay>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { RouteMixin } from './index'
import Navbar from '../ui/navbars/Navbar'

import ui from '@/components/ui'

export default {
    components: { ...ui },
    computed: {
        ...mapState('Unit', ['unit', 'navigator']),
        renderNavTitle(){
            return this.unit.title ? this.unit.title : ''
        },
        unitImage(){
            return this.unit.cover_url ? this.unit.cover_url : ''
        },
    },
    created(){
        this.fetchUnit(this.$route.params)
    },
    beforeDestroy(){
        this.setNavigatorOrder(1)
        this.destroyUnit()
    },
    methods: {
        ...mapActions('Unit', ['fetchUnit', 'setNavigatorOrder', 'destroyUnit'])
    },
}
</script>

<style>

</style>