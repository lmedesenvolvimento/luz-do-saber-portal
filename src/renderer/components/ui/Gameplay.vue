<template>
    <div class="gameplay">
        <div class="step-bars">
            <router-link 
                class="bar" 
                v-for="(value, index) in unit.questions" 
                :key="index" 
                :to="{ name: 'activity', params: { position: (index + 1) }}"
                v-bind:class="{'active': getPosition === (index + 1)}" >
            </router-link>
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-counter counter">
                <span>{{ getPosition }}</span>
            </div>
            <div class="gameplay-heading-title">{{ getTitle }}</div>
        </div>
        <div class="gameplay-body">
            <div class="gameplay-description"> {{ getDescription }} </div>
            <div class="gameplay-activity-container">
                <router-view></router-view>
                <!-- <ls-activity :activity="activity" v-if="activity"></ls-activity>                 -->
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
        unit: Object,
    },
    data(){
        return {
            position: 1
        }
    },
    components: {
        'ls-timer': require('@/components/ui/helpers/Timer').default,
        'ls-activity': require('@/components/ui/activities/BaseActivity').default,
        ...alerts
    },
    created(){
        this.$router.push({ name: 'activity', params: { position: this.position }})
    },
    computed: {
        getPosition(){
            return this.activity ? this.activity.position : ''
        },
        getTitle(){
          return this.activity ? this.activity.title.text : ''
        },
        getDescription(){
          return this.activity && this.activity.statement ? this.activity.statement.text : ''
        },                
        ...mapState('Activity', ['activity','answer', 'log'])
    },
    watch: {
        activity(newVal){
            console.log(newVal)
        }
    }
}
</script>
