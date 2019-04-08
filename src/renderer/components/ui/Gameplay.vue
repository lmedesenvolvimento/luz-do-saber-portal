<template>
    <div class="gameplay">
        <div class="step-bars">
            <router-link 
                v-for="(value, index) in unit.questions" 
                :key="index" 
                :to="{ name: 'activity', params: { position: (index + 1) }}"
                class="bar" 
                :class="{'active': getPosition == ( index + 1 )}"
            />
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-counter counter">
                <span>{{ getPosition }}</span>
            </div>
            <div class="gameplay-heading-title">{{ getTitle }}</div>
        </div>
        <router-view />
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
    </div>
</template>
<script>
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
        'ls-timer': require('@/components/ui/helpers/Timer').default,
        ...alerts
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
        ...mapState('Unit', ['unit']),
        ...mapState('Activity', ['activity','answer', 'log'])
    }, 
    created(){
        this.$router.push({ name: 'activity', params: { position: 1 }})
    },  
}
</script>
