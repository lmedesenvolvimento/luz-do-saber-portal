<template>
    <div class="gameplay-body">
        <transition name="page">
            <div v-if="activity" key="gameplay">
                <div v-if="hasDescription" class="gameplay-description">{{ getDescription }} </div>
                <div class="gameplay-activity-container">
                    <BaseActivity></BaseActivity>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
    components: {
        BaseActivity: require('@/components/ui/activities/BaseActivity').default,
    },
    data(){
        return {
            isReady: false
        }
    },
    computed: {
        hasDescription(){
            return this.activity && this.activity.statement
        },
        getDescription(){
            return this.hasDescription ? this.activity.statement.text : ''
        },
        getQuestion(){
            let { params } = this.$route
            return this.unit.questions[(params.position - 1)]
        },
        ...mapState('Unit', ['unit']),
        ...mapState('Activity', ['activity'])
    },
    watch: {
        $route (newVal) {
            this.destroyActivity()
            this.fetchActivity({ 
                params: newVal.params, 
                question: this.getQuestion
            })
        }
    },
    created(){        
        let { params } = this.$route
        
        this.fetchActivity({ 
            params, 
            question: this.getQuestion
        })
    },
    beforeDestroy(){
        this.destroyActivity()
    },    
    methods: {
        ...mapActions('Activity', ['fetchActivity', 'destroyActivity'])
    }
}
</script>

<style>

</style>