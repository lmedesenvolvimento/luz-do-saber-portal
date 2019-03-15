<script>
import { mapActions } from 'vuex'
export default {
    model: {
        prop: 'checked',
        event: 'change'
    },
    inheritAttrs: false,
    props: {
        checked: null,
        value: null,
        label: String,
        variant: String,
        hasError: Boolean,
        hasSuccess: Boolean
    },
    computed: {
        isValid(){
            return ( this.checked.$valid && this.checked.data.id === this.value )
        },
        isInvalid(){
            return ( this.checked.$invalid && this.checked.data.id === this.value )
        }
    },
    methods: {
        onChange(event){
            if (this.isValid || this.isInvalid) return
            
            this.setAnswer({ 
                ref: this.checked.parent_ref, 
                key: this.checked.type, 
                data: this.value
            })
        },
        ...mapActions('Activity', ['setAnswer'])
    }
  }
</script>