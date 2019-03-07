<template>
    <div class="gameplay-footer-status">
        <div class="subtitle">Tempo</div>
        <div class="title">{{ getDuration }}</div>
    </div>
</template>
<script>
import moment from 'moment'

import { setInterval, clearInterval } from 'timers'

const WAIT_TIME = 1000

export default {
    data(){
        return {
            now: 0,
            timer: null
        }
    },
    computed: {
        getDuration(){
            return moment(this.now).format('mm:ss')
        }
    },
    created(){
        this.timer = setInterval(() => {
            this.now += WAIT_TIME
        }, WAIT_TIME)
    }    
}
</script>
