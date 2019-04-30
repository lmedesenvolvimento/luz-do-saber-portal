<template>
    <div class="card-input card-radio-input" :class="$attrs.class">
        <label>
            <div 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <div>
                    <slot name="img"></slot>
                    <slot></slot>
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
    mixins: [RadioInput]
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
