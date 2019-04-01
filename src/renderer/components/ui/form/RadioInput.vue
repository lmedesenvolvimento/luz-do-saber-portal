<script>
import { mapActions } from 'vuex'
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
            invalid: false
        }
    },
    methods: {
        onChange(event){
            if (this.$valid || this.$invalid) return
            
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