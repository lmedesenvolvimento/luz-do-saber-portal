<template>
    <div class="gameplay">
        <div class="step-bars">
            <div class="bar" v-for="(value, index) in activities" :key="index" v-bind:class="{'active': activity === value}"></div>            
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-counter counter">
                <span>{{ getCurrentPosition }}</span>
            </div>
            <div class="gameplay-heading-title">{{ getTitle }}</div>
        </div>
        <div class="gameplay-body">
            <div class="gameplay-description"> {{ getDescription }} </div>
            <div class="gameplay-activity-container">
                <ls-activity :activity="activity" v-if="activity"></ls-activity>                
            </div>
        </div>
        <div class="gameplay-footer">
            <div class="gameplay-footer-actions">
                <div class="flex"></div>
                <div class="gameplay-footer-action">
                    <ls-timer></ls-timer>
                </div>
                <div class="gameplay-footer-divider"></div>
                <div class="gameplay-footer-action">
                    <div class="gameplay-footer-status">
                        <div class="subtitle">Tentativas</div>
                        <div class="title">{{ log.errors.total }}</div>
                    </div>
                </div>
                <div class="flex"></div>
            </div>
        </div>
        <ls-alert-activity-success></ls-alert-activity-success>
        <ls-alert-activity-fail></ls-alert-activity-fail>        
    </div>
</template>
<script>
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { mapActions, mapState } from 'vuex'

export default {
    props: {
        activities: Array,
    },
    data(){
        return {
            position: 0
        }
    },
    created(){
        this.selectActivity(this.activities[0]) // get first
    },
    components: {
        'ls-timer': require('@/components/ui/helpers/Timer').default,
        'ls-activity': require('@/components/ui/activities/BaseActivity').default,
        ...alerts
    },
    methods: {
        ...mapActions('Activity', ['selectActivity'])
    },
    computed: {
        getTitle(){
          return this.activity ? this.activity.title.text : ''
        },
        getDescription(){
          return this.activity ? this.activity.statement.text : ''
        },                
        getCurrentPosition(){
            return ( this.position + 1 )
        },
        ...mapState('Activity', ['activity','answer', 'log'])
    }
}
</script>
