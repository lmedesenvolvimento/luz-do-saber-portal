<template>
    <div class="gameplay">
        <div class="step-bars">
            <div class="bar" v-for="(activity, index) in activities" :key="index" v-bind:class="{'active': isActiveActivity(index)}"></div>            
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-counter counter">
                <span>{{ currentPosition }}</span>
            </div>
            <div class="gameplay-heading-title">{{ getTitle }}</div>
        </div>
        <div class="gameplay-body">
            <div class="gameplay-description"> {{ getDescription }} </div>
            <div class="gameplay-activity-container">
                <ls-activity :activity="currentActivity"></ls-activity>                
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
                        <div class="title">0</div>
                    </div>
                </div>
                <div class="flex"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        activities: Array,
    },
    data(){
        return {
            position: 0
        }
    },
    components: {
        'ls-timer': require('@/components/ui/Timer').default,
        'ls-activity': require('@/components/ui/Activity').default
    },
    methods: {
        isActiveActivity(index){
            return index === this.position
        }
    },
    computed: {
        getTitle(){
          return this.currentActivity.title.text  
        },
        getDescription(){
          return this.currentActivity.statement.text
        },
        currentActivity(){
            return this.activities[this.position]
        },
        currentPosition(){
            return this.position + 1
        }
    }
}
</script>
