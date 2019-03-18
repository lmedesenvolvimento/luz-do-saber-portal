<script>
import RadioInput from './RadioInput.vue'
import { find, findIndex, hasIn } from 'lodash'

export default {
    mixins: [RadioInput],
    methods: {
        onChange(event){
            event.target.checked 
                ? this.$addInList()
                : this.$removeInList()
        },
        $addInList(){
            if (find(this.checked, val => val === this.item)) return
            this.setAnswer({ ref: this.checked.parent_ref, data: this.checked})
        },
        $removeInList(){
            let indexOf = findIndex(this.checked, val => val === this.item)
            this.checked.splice(indexOf, 1)
            this.setAnswer({ ref: this.checked.parent_ref, data: this.checked})
        }
    }    
}
</script>
