<template>
    <div class="card-input card-radio-input" :class="$attrs.class">
        <label>
            <div 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <div>
                    <div class="cracha-container">
                        <b-card-img class="cracha-img" :src="renderCrachaImage" />
                        <div class="cracha-text">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>

            <input
                :name="$attrs.name" 
                type="radio"
                v-bind="$attrs"
                class="input"
                @change.prevent="onChange"
            />
        </label>
    </div>
</template>
<script>
import RadioInput from './RadioInput.vue'
export default {
    mixins: [RadioInput],
    computed: {
        renderCrachaImage(){
            if (this.valid){
                return require('@/assets/images/btn-read.png')
            } else if (this.invalid) {
                return require('@/assets/images/btn-write.png')
            } else {                
                return require('@/assets/images/components/examples/cracha-1.png')
            }
        }
    }
}
</script>
<style lang="scss">
    .card-radio-input{        
        .input{
            display: block;
            visibility: hidden;
            width: 0px;
            height: 0px;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>
