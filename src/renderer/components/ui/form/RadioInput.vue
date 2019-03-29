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
        label: String,
        variant: String,
        item: Object
    },
    methods: {
        onChange(event){
            console.log("Binded")
            
            if (this.item.$valid || this.item.$invalid) return


            this.setAnswer({ 
                ref: this.checked.parent_ref, 
                key: this.checked.type, 
                data: this.item
            })
        },
        ...mapActions('Activity', ['setAnswer'])
    }
  }
</script>