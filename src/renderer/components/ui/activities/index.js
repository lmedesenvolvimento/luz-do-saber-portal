import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import ItemComponents from '@/components/ui/items'
import { ActivityTypes } from '@/components/ui/types'

import { clone } from 'lodash'

const TIMEOUT = 800

export const ListMixin = {
    components: {
        ...ItemComponents
    },
    props:{
        valueColSize: Number,
        input: null
    },
    data() {
        return {
            ActivityTypes: ActivityTypes,
            feedback: {}
        }
    },
    methods: {
        onFail(){
            Vue.set(this.feedback, '$isInvalid', true)
            // emit to reducer
            setTimeout(this.emitFail.bind(this), TIMEOUT)
            // clear model
            setTimeout(this.resetInput.bind(this), ( TIMEOUT + 100 ))
            
        },
        onSuccess(){
            Vue.set(this.feedback, '$isValid', true)
            // emit to reducer
            setTimeout(this.emitSuccess.bind(this), TIMEOUT)
            // clear model
            setTimeout(this.resetInput.bind(this), ( TIMEOUT + 100 ))
        },
        resetInput(){
            Vue.set(this, 'feedback', {})
            Vue.set(this.input, 'value', null)
        },
        ...mapActions('Activity', ['emitSuccess', 'emitFail'])
    },
    computed: {
        ...mapState('Activity', ['activity', 'answer'])
    }
}


export default {
    'ls-list-correct-item': require('./ListCorrectItem.vue').default
}