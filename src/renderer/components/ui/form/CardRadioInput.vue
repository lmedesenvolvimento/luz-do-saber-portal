<template>
    <div class="card-radio-input" v-bind:class="$attrs.class">
        <label>
                <b-card 
                    v-bind:class="{ 'checked': isChecked }" :bg-variant="variant">
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
                    v-on:change="onChange"
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
            display: none;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
        .card{
            &.checked{
                background-color: #999 !important;
                color: white;
            }
        }
    }
</style>
