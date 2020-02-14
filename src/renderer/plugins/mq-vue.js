import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        sm: 1400,
        lg: Infinity,
    }
})