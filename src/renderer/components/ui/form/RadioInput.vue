<script>
import { mapActions } from 'vuex'
import { invalid } from 'moment';
import { setTimeout } from 'timers';
export default {
    model: {
        prop: 'checked',
        event: 'change'
    },
    inheritAttrs: false,
    props: {
        type: String,
        label: String,
        variant: String,
        item: Object
    },
    data(){
        return {
            valid: false,
            invalid: false,
            selected: false
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
    },
    watch: {
        invalid(newVal){
            if(newVal){
                // return for selected status
                setTimeout(_ => this.invalid = false, 800)
            }
        }
    }
  }
</script>