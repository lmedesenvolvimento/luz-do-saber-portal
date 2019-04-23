<template>
    <div class="card-input card-input-text" :class="$attrs.class">
        <label>
            <b-card 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <div class="bg-color" :style="bgColor">
                    <b-card-body>
                        <input
                            v-model="model"
                            :name="$attrs.name" 
                            :maxlength="1"
                            :disabled="valid"
                            type="text"
                            v-bind="$attrs"
                            selectionDirection="backward"
                            @keydown="onKeyDown($event)"
                        />
                    </b-card-body>
                </div>
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
        maxLength: Number,
        value: {
            type: Object,
            default: null,
        },
        bgColor: String,
    },
    data(){
        return {
            model: null
        }
    },
    watch: {
        model(value){
            if (this.valid) return

            console.log(this.model.toLowerCase(), this.value.text.toLowerCase())

            if (this.model.toLowerCase() === this.value.text.toLowerCase()) {
                console.log(this.type, this.value.id)
                this.setAnswer({ 
                    type: this.type, 
                    data: this.value.id,
                    vm: this
                })
            } else {
                this.setAnswer({ 
                    type: this.type, 
                    data: -1,
                    vm: this
                })
            }
            
        }
    },
    methods: {
        onKeyDown(event){
            // replace input value for new key if invalid
            if ( this.model && (event.key.length <= 1) ) this.model = event.key
        }
    }
}
</script>
<style lang="scss">
    .card-input-text{
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>
