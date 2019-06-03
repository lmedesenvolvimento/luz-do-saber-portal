<template>
    <div class="gameplay-body">
        <transition name="page">
            <div v-if="activity" key="gameplay">
                <div v-if="hasDescription" class="gameplay-description">{{ getDescription }} </div>
                <div class="gameplay-activity-container" :class="{'no-description': !hasDescription}">
                    <BaseActivity></BaseActivity>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { find } from 'lodash'

import AudioReader from '@/services/AudioReader'

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
            return this.unit.questions[(this.navigator.order - 1)]
        },
        ...mapState('Unit', ['unit','navigator']),
        ...mapState('Activity', ['activity'])
    },
    watch: {
        $route (newVal) {
            this.destroyActivity()

            AudioReader.stop()

            this.fetchActivity({ 
                params: newVal.params, 
                question: this.getQuestion
            }).then(() => {
                AudioReader.simplePlay(this.activity.statement.audio)
            })
        }
    },
    created(){        
        let { params } = this.$route
        
        this.fetchActivity({ 
            params, 
            question: this.getQuestion
        }).then(() => {
            AudioReader.simplePlay(this.activity.statement.audio)
        })
    },
    beforeDestroy(){
        this.destroyActivity()
        AudioReader.stop()
    },    
    methods: {
        ...mapActions('Activity', ['fetchActivity', 'destroyActivity'])
    }
}
</script>

<style>

</style>