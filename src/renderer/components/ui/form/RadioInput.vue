<script>
import { mapState, mapActions } from 'vuex'
import { values } from 'lodash';
import uniqid from 'uniqid'

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
        size: String,
        item: Object,
        bgColor: String,
        focus: Boolean,
    },
    data(){
        return {
            valid: false,
            invalid: false,
            selected: false
        }
    },
    computed: {
        uid(){
            return uniqid();
        },
        canSendResponse(){
            // se o tipo da questão não é associação e o input está no estado válido ou inválido
            let inJoinTypes = values(ActivityTypes.activity.join).includes(this.activity.type.slug)
            let isValidOrInvalid = ( this.valid || this.invalid )
            return !inJoinTypes && isValidOrInvalid
        },
        isCardSm(){
            return this.size === 'small'
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