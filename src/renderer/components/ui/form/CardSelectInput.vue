<template>
    <div class="card-select-input" v-bind:class="$attrs.class">
        <label>
                <b-card 
                    v-bind:class="{ 'checked': isChecked }" 
                    :bg-variant="variant">
                    <slot name="img"></slot>
                    <b-card-body>
                        <slot></slot>
                    </b-card-body>
                </b-card>
                <input
                    :name="$attrs.name" 
                    class="input"
                    type="checkbox"
                    v-bind="$attrs"
                    v-on:change="onChange"
                />
        </label>
    </div>
</template>

<script>

import CheckboxInput from './CheckboxInput.vue'

export default {
    mixins: [CheckboxInput]
}
</script>

<style lang="scss">
    .card-select-input{
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
