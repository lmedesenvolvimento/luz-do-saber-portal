<template>
    <transition name="page">
        <div id="gameplay" v-if="activity">
            <div class="gameplay-body">
                <div class="gameplay-description" v-if="hasDescription">{{ getDescription }} </div>
                <div class="gameplay-activity-container">
                    <BaseActivity></BaseActivity>
                </div>
            </div>
        </div>
    </transition>
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
    mounted(){        
        let { params } = this.$route
        
        this.fetchActivity({ 
            params, 
            question: this.getQuestion
        })
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
    methods: {
        ...mapActions('Activity', ['fetchActivity', 'destroyActivity'])
    },
    watch: {
        $route (newVal) {
            this.destroyActivity()
            this.fetchActivity({ 
                params: newVal.params, 
                question: this.getQuestion
            })
        }
    }
}
</script>

<style>

</style>