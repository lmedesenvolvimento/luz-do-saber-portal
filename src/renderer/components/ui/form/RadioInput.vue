<script>
import { mapActions } from 'vuex'
import { invalid } from 'moment';
export default {
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
        bgColor: String
    },
    data(){
        return {
            valid: false,
            invalid: false,
            selected: false
        }
    },
    watch: {
        invalid(newVal){
            if(newVal){
                // force render
                this.$nextTick(() => {
                    if(newVal) setTimeout( _ => this.invalid = false, 600)
                })
            }
        }
    },
    methods: {
        onChange(event){
            if (this.valid || this.invalid) return
            
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