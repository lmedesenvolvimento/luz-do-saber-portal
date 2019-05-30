<template>
    <div :id="`input-${uid}`" class="card-input card-radio-input teste" :class="$attrs.class">
        <label class="input-horizontal-align">
            <b-card 
                class="check-mark"
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

            <b-card
                class="limited-width-input"
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <fill-background :bg-color="bgColor">
                    <b-card-body>
                        {{ item.text }}
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
import RadioInput from '@/components/ui/form/RadioInput.vue'

export default {
    mixins: [RadioInput],
    props: {
    }
};
</script>
<style lang="scss" scoped>
    .input-horizontal-align {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
    }
    .check-mark {
        max-height: 45px;
        min-width: 45px;

        .card-body {
            border-radius: 0.4rem !important;
        }

        .check-image {
            position: absolute;
            top: 21.5%;
            left: 21.5%;
        }
    }
    .limited-width-input {
        min-width: 300px;
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