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

import { LetterTypes } from '@/constants'

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
            return LetterTypes.includes(this.value.type)
        },
        length(){
            return (this.isNotWord) ? 1 : 11
        },
        isCanSubmitValidation() {
            const model = this.model.toLowerCase()
            const value = this.value.text.toLowerCase()

            if (this.model.length === 0) return false

            if (model  === value){
                return true
            }

            return ( this.valid || this.invalid ) ? false : true
        }
    },
    watch: {
        model(value){
            if (this.isCanSubmitValidation) {
                this.isNotWord ? this.whenNotWord(value) : this.whenWord(value)
            }
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
        whenNotWord(){
            const model = this.model.toLowerCase()
            const value = this.value.text.toLowerCase()

            if (model === value) {
                this.setAnswer({
                    type: this.type,
                    data: this.value.id,
                    vm: this
                })

                this.toNextInput()
            } else {
                this.setAnswer({
                    type: this.type,
                    data: -1,
                    vm: this
                })
            }
        },
        whenWord(value){
            if (value.length < this.value.text.length) return false
            if (value.length === this.value.text.length) {
                if (value.toLowerCase() === this.value.text.toLowerCase()){
                    this.setAnswer({
                        type: this.type,
                        data: this.value.id,
                        vm: this
                    })
                    this.toNextInput()
                } else {
                    this.setAnswer({
                        type: this.type,
                        data: -1,
                        vm: this
                    })
                }
                return true
            }
            
            this.setAnswer({
                type: this.type,
                data: -1,
                vm: this
            })
        },
        toNextInput(){
            let nextElementEmpty = this.$el.closest('.activity, .game').querySelector('input:invalid')
            if (nextElementEmpty) {
                nextElementEmpty.focus()
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
