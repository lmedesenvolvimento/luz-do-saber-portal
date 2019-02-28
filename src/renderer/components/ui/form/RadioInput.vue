<script>
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
        variant: String
    },
    methods: {
        onChange(event){
            this.$emit('change', this.value)
        }
    },
    computed: {
        isChecked(){
            return this.value === this.checked
        }
    }
  }
</script>