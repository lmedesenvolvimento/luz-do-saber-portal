import { mapState } from 'vuex'
import { ActivityTypes, ItemTypes } from '@/constants'
import FormInputs from '@/components/ui/form'

import { values } from 'lodash'

export const ItemProps = {
    props: {
        item: Object,
        type: String,
        focus: Boolean,
        template: Object,
        group: Boolean,
    },
    data(){
        return {
            Types: ItemTypes,
            ActivityTypes: ActivityTypes
        }
    },
    components: { ...FormInputs },
    computed: {
        isJoinInput(){
            return values(ActivityTypes.activity.join).includes(this.activity.type.slug)
        },
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
        ...mapState('Activity', ['activity','answers'])
    }
}

export default {
    'ls-item-text': require('./Text.vue').default,
    'ls-item-cracha-box': require('./custom/CrachaBox.vue').default,
    'ls-card-display-validacao': require('./custom/CardDisplayValidacao.vue').default,
    'ls-display-18-items': require('./custom/Display18Items.vue').default,
    'ls-item-texto-em-blocos': require('./custom/TextoEmBlocos.vue').default,
}