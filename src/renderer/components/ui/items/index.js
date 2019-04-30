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
            return this.item.type === 'letra' ? `#${this.getRandomColor} !important`: null
        },
        getRandomColor(){
            return Math.floor(Math.random()*16777215).toString(16)
        },
        ...mapState('Activity', ['activity'])
    }
}

export default {
    'ls-item-text': require('./Text.vue').default,
    'ls-item-cracha-box': require('./custom/CrachaBox.vue').default,
    'ls-item-completa-letras': require('./custom/CompletaLetras.vue').default
}