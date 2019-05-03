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
        fillBackgroundColor(){
            //return this.item.type === 'letra' ? `#${this.getRandomColor} !important`: null
            let a = this.availableColors
            return this.item.type === 'letra' ? `#${this.availableColors[random(a.length)]} !important` : null

        },
        getRandomColor(){
            return Math.floor(Math.random()*16777215).toString(16)
        },
        availableColors(){
            return ['cc7200', 'c30374', '8c2db4', '454ebc', '3875c1', '028d8b', 'ffb151', 'f766ae', 'ae67e0', '757bfa', '75c0ff', '64cbc2']
        },
        ...mapState('Activity', ['activity'])
    }
}

export default {
    'ls-item-text': require('./Text.vue').default,
    'ls-item-cracha-box': require('./custom/CrachaBox.vue').default,
    'ls-card-display-validacao': require('./custom/CardDisplayValidacao.vue').default,
    'ls-display-completa-letras': require('./custom/DisplayCompletaLetras.vue').default,
}