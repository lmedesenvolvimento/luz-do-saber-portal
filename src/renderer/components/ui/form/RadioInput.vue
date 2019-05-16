<script>
import { mapState, mapActions } from 'vuex'
import { values } from 'lodash';

import FillBackground from '@/components/ui/helpers/FillBackground'
import { ActivityTypes } from '@/constants'

export default {
    components:{
        FillBackground
    },
    inheritAttrs: false,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        type: String,
        label: String,
        variant: String,
        item: Object,
        image: {
            type: String,
            required: false
        },
        bgColor: String
    },
    data(){
        return {
            valid: false,
            invalid: false,
            selected: false
        }
    },
    computed: {
        canSendResponse(){
            // se o tipo da questão não é associação e o input está no estado válido ou inválido
            let inJoinTypes = values(ActivityTypes.activity.join).includes(this.activity.type.slug)
            let isValidOrInvalid = ( this.valid || this.invalid )
            return !inJoinTypes && isValidOrInvalid
        },
        ...mapState('Activity', ['activity'])
    },
    watch: {
        invalid(newVal){
            if(newVal){
                // force render
                this.$nextTick(() => {
                    if(newVal) setTimeout( _ => {
                        this.invalid = false
                        this.selected = false
                    }, 600)
                })
            }
        }
    },
    methods: {
        onChange(event){
            if (this.canSendResponse) return
            
            this.setAnswer({ 
                type: this.type, 
                data: this.item.id,
                vm: this
            })
        },
        ...mapActions('Activity', ['setAnswer'])
    }    
}
</script>