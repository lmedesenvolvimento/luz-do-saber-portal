<template>
    <div :id="`input-${uid}`" class="card-input card-radio-input check-mark" :class="$attrs.class">
        <label>
            <b-card 
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <fill-background :bg-color="bgColor">
                    <b-card-body>
                        <img v-if="valid" class="check-image" src="https://picsum.photos/id/988/25/25" alt="">
                        <slot name="img">
                        </slot>
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
<style lang="scss" scoped>
    .check-mark {
        max-width: 45px;
        margin-top: 3%;

        .card, .card-input, .card-body {
            border-radius: 0.4rem !important;
        }

        .check-image {
            position: absolute;
            top: 21.5%;
            left: 21.5%;
        }
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