<template>
    <div class="gameplay-footer-status">
        <div class="subtitle">Tempo</div>
        <div class="title">{{ getDuration }}</div>
    </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import { setInterval, clearInterval, clearImmediate } from 'timers'

const WAIT_TIME = 1000

export default {
    data(){
        return {
            timer: null
        }
    },
    created(){
        this.timer = setInterval(_ => this.incrementTimer(), WAIT_TIME)
    },
    beforeDestroy(){
        clearInterval(this.timer)
    },
    computed: {
        getDuration(){
            return moment(this.log.timer.totalSeconds).format('mm:ss')
        },
        ...mapState('Activity', ['log'])
    },
    methods: {
        ...mapActions('Activity', ['incrementTimer'])
    }    
}
</script>
