<template>
    <transition name="page">
        <div id="gameplay" v-if="activity">
            <div class="gameplay-body">
                <div class="gameplay-description" v-if="hasDescription">{{ getDescription }} </div>
                <div class="gameplay-activity-container">
                    <h1>Activity {{ $route.params.position }}</h1>    
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            isReady: false
        }
    },
    created(){
        this.fetchActivity(this.$route.params)
    },
    computed: {
        hasDescription(){
            return this.activity && this.activity.statement
        },
        getDescription(){
            return this.hasDescription ? this.activity.statement.text : ''
        },
        ...mapState('Activity', ['activity'])
    },
    methods: {
        ...mapActions('Activity', ['fetchActivity', 'destroyActivity'])
    },
    watch: {
        $route (newVal) {
            this.destroyActivity()
            this.fetchActivity(newVal.params)
        }
    }
}
</script>

<style>

</style>