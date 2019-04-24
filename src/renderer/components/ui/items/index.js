import { mapState } from 'vuex'
import Types from './types'
import FormInputs from '@/components/ui/form'

export const ItemProps = {
    props: {
        item: Object,
        type: String,
        template: Object
    },
    data(){
        return {
            Types: Types
        }
    },
    components: { ...FormInputs },
    computed: {
        isInput(){
            return this.hasTags && /^input/.test(this.template.tags)
        },
        hasTags(){
            return ( this.template && this.template.tags ) ? true : false
        },        
        ...mapState('Activity', ['activity'])
    }
}

export default {
    'ls-item-text': require('./Text.vue').default,
    'ls-item-cracha-box': require('./custom/CrachaBox.vue').default
}