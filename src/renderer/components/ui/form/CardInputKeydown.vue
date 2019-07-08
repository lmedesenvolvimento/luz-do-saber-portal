<template>
    <div class="card-input card--input-text" :class="$attrs.class">
        <label>
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <input
                        v-model="model"
                        v-focus="focus"
                        :name="$attrs.name"
                        :maxlength="length"
                        :disabled="valid"
                        :required="true"
                        type="text"
                        v-bind="$attrs"
                        autocomplete="off"
                        selectionDirection="backward"
                        @keypress="onKeyDown($event)"
                    />
                </b-card-body>
            </b-card>
        </label>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
import { setTimeout } from 'timers'
import { trim, dropRight } from 'lodash'

export default {
    mixins: [RadioInput],
    props:{
        maxLength: {
            type: Number,
            default: 1,
            required: false
        },
        value: {
            type: Object,
            default: null,
        }
    },
    data(){
        return {
            model: ''
        }
    },
    computed: {
        isNotWord(){
            return this.value.type !== 'substantivo_comum'
        },
        length(){
            return (this.isNotWord) ? 1 : 11
        },
    },
    watch: {
        model(value){
            if ((this.valid || this.invalid) || this.model.length === 0) return

            this.isNotWord ? this.whenNotWord(value) : this.whenWord(value)  
        }
    },
    mounted(){
        let isFirstElement = this.$el.closest('.item') === this.$el.closest('.item').parentElement.firstElementChild

        if (isFirstElement) {
            this.$el.querySelector('input').focus()
        }
    },
    methods: {
        onKeyDown(event){
            if (this.isNotWord && this.model && (event.key.length <= 1)) this.model = event.key
        },
        whenNotWord(value){
            if (this.model.toLowerCase() === this.value.text.toLowerCase()) {
                this.setAnswer({
                    type: this.type,
                    data: this.value.id,
                    vm: this
                })

                let nextElementEmpty = this.$el.closest('.activity, .game').querySelector('input:invalid')

                if (nextElementEmpty) {
                    nextElementEmpty.focus()
                }
            } else {
                this.setAnswer({
                    type: this.type,
                    data: -1,
                    vm: this
                })
            }
        },
        whenWord(value){
            if (value.length <= this.value.text.length){
                if (value.toLowerCase() === this.value.text.toLowerCase()){
                    this.setAnswer({
                        type: this.type,
                        data: this.value.id,
                        vm: this
                    })
                }
            }
            else {
                this.setAnswer({
                    type: this.type,
                    data: -1,
                    vm: this
                })
            }
        }
    },

}
</script>

<style lang="scss">
    .card--input-text{
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>
