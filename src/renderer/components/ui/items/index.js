import { mapState } from 'vuex'
import Types from './types'
import FormInputs from '@/components/ui/form'

import { random } from 'lodash'

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
            return this.hasTags && /input/.test(this.template.tags)
        },
        isDrag(){
            return this.hasTags && this.type === 'value' && /arrastar/.test(this.template.tags)
        },
        isDrop(){
            return this.hasTags && this.type === 'key' && /encaixar/.test(this.template.tags)
        },
        hasTags(){
            return ( this.template && this.template.tags ) ? true : false
        },
        ...mapState('Activity', ['activity'])
    }
}

export default {
    'ls-item-text': require('./Text.vue').default,
    'ls-item-cracha-box': require('./custom/CrachaBox.vue').default,
    'ls-card-display-validacao': require('./custom/CardDisplayValidacao.vue').default,
    'ls-display-18-items': require('./custom/Display18Items.vue').default,
    'ls-item-texto-em-blocos': require('./custom/TextoEmBlocos.vue').default,
}