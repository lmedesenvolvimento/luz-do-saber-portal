<template>
    <h1>Activity {{ $route.params.position }}</h1>    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    mounted(){
        this.fetchActivity(this.$route.params)
    },
    methods: {
        ...mapActions('Activity', ['fetchActivity'])
    },
    watch: {
        $route (newVal) {
            this.fetchActivity(newVal.params)
        }
    }
}
</script>

<style>

</style>