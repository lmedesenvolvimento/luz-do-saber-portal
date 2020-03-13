import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 1024,
        sm: 1400,
        lg: Infinity,
    }
})