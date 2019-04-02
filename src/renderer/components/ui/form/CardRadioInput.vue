<template>
    <div class="card-radio-input" v-bind:class="$attrs.class" v-if="item">
        <label>
                <b-card 
                    v-bind:class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }">
                    <slot name="img"></slot>
                    <b-card-body>
                        <slot></slot>
                    </b-card-body>
                </b-card>
                <input
                    :name="$attrs.name" 
                    class="input"
                    type="radio"
                    v-bind="$attrs"
                    v-on:change.prevent="onChange"
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
            visibility: hidden;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
        .card{
            &.valid{
                background-color: green;
                color: white;
            }
            &.invalid{
                background-color: red;
                color: white;
            }
            &.selected{
                background-color: #ccc;
            }
        }
    }
</style>
