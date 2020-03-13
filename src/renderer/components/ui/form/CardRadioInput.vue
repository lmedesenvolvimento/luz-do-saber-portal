<template>
    <div 
        :id="`input-${uid}`"
        class="card-input card--radio-input" 
        :class="$attrs.class" 
        @mousedown.stop="onMouseEvent"
        @mouseup.stop="onMouseEvent"
    >
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
import { ClusterTypes } from '@/store/modules/helpers'
export default {
    mixins: [RadioInput],
    methods: {
        onMouseEvent(event) {
            if (ClusterTypes.includes(this.activity.type.slug)) {
                this.onChange(event)
            }
        }
    }
}
</script>
<style lang="scss">
    .card--radio-input{        
        .input{
            position: absolute;
            display: block;
            visibility: hidden;
            width: 0px;
            height: 0px;
            z-index: -9999;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>
