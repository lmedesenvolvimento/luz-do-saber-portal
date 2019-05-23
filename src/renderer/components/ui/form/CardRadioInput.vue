<template>
    <div :id="`input-${uid}`" class="card-input card-radio-input" :class="$attrs.class">
        <label>
            <b-card 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <fill-background :bg-color="bgColor">
                    <b-card-body>
                        <slot name="img"></slot>
                        <slot></slot>
                    </b-card-body>
                </fill-background>
            </b-card>

            <input
                class="input"    
                type="radio"
                :name="$attrs.name" 
                v-bind="$attrs"
                @click.prevent="onChange"
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
