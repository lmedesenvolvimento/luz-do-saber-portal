<template>
    <div class="card-radio-input" v-bind:class="$attrs.class">
        <label>
                <b-card 
                    v-bind:class="{ 'invalid': checked.$invalid, 'valid': checked.$valid }">
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
                    v-bind:checked="checked"
                    v-on:change="onChange"
                />
                {{ checked }}
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
            display: none;
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
        }
    }
</style>
