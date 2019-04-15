<template>
    <div class="card-input card-input-text" :class="$attrs.class">
        <label>
            <!-- <b-card 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            > -->
            <b-card 
                no-body
            >
                <b-card-body>
                    <input
                        v-model.trim="model"
                        :name="$attrs.name" 
                        :maxlength="maxLength || false"
                        type="text"
                        v-bind="$attrs"
                    />
                </b-card-body>
            </b-card>
        </label>
    </div>
</template>
<script>
import RadioInput from './RadioInput.vue'
export default {
    mixins: [RadioInput],
    props:{
        maxLength: Number,
        value: {
            type: String,
            default: '',
            required: true
        }
    },
    data(){
        return {
            model: ''
        }
    },
    watch: {
        model(value){
            console.log('VALUE',value, this.activity)
            // if (this.valid || this.invalid) return
            
            // this.setAnswer({ 
            //     type: this.type, 
            //     data: this.item.id,
            //     vm: this
            // })
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
