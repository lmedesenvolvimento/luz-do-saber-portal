<template>
    <div v-if="unit" id="unit" class="page-container">
        <ls-navbar :navbar-title="unit.title"></ls-navbar>
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
