<template>
    <div class="card-input card-radio-input check-mark" :class="$attrs.class">
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

    <!-- <div class="check-mark"></div> -->
</template>

<script>
import RadioInput from './RadioInput.vue'

export default {
    mixins: [RadioInput],
    props: {
    }
};
</script>
<style lang="scss">
    .check-mark {
        max-width: 45px;
        max-height: 90px;
    }
    .card-radio-input{        
        .input{
            display: block;
            visibility: hidden;
            width: 0px;
            height: 0px;
            background-color: black;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>