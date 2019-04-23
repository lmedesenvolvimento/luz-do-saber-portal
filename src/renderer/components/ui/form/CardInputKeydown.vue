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
                            v-model.lazy="model"
                            :name="$attrs.name" 
                            :maxlength="maxLength || false"
                            :placeholder="value.text"
                            :disabled="valid || invalid"
                            type="text"
                            v-bind="$attrs"
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
            model: ''
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
    mounted(){
        console.log(this.value)
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
