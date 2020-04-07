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
    computed: {
        getDuration(){
            let totalSeconds = (this.log.timer.totalSeconds * 1000)
            return moment(totalSeconds).format('mm:ss')
        },
        ...mapState('Activity', ['log'])
    },
    created(){
        if (process.env.NODE_ENV === 'production') {
            this.timer = setInterval(_ => this.incrementTimer(), WAIT_TIME)
        }
    },
    beforeDestroy(){
        clearInterval(this.timer)
    },
    methods: {
        ...mapActions('Activity', ['incrementTimer'])
    }    
}
</script>
