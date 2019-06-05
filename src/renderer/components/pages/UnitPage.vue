<template>
    <div v-if="unit" id="unit" class="page-container" :class="$route.params.module_slug">
        <navbar :navbar-title="unit.title" :navbar-subtitle="'Lorem Ipsum'" :navbar-icon="'https://placeimg.com/480/480/tech'" :custom="true">
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
        ...mapState('Unit', ['unit', 'navigator'])
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