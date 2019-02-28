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
            if (find(this.checked, val => val === this.value)) return
            this.$emit('change', this.checked.concat(this.value))
        },
        $removeInList(){
            let indexOf = findIndex(this.checked, val => val === this.value)
            this.checked.splice(indexOf, 1)
            this.$emit('change', this.checked)
        }
    },
    computed: {
        isChecked(){
            return this.checked.includes(this.value)
        }
    }
}
</script>
