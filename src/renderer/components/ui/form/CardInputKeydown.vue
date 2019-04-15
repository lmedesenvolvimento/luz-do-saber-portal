<template>
    <div class="card-input card-radio-input" :class="$attrs.class">
        <label>
            <b-card 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <b-card-body>
                    <slot name="img"></slot>
                    <slot></slot>
                </b-card-body>
            </b-card>

            <input
                :name="$attrs.name" 
                type="text"
                v-bind="$attrs"
                class="input"
                @keydown="onChange"
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
