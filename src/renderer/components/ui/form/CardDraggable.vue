<template>
    <drag :transfer-data="item" :image-x-offset="offsetX" :image-y-offset="offsetY" :draggable="!dropped" @drag="onDrag" @dragend="onDragEnd">
        <template slot="image">
            <div class="card-input draggshadow" :style="{ width: elementWidth }" :class="{ 'card-sm': isCardSm, ...$attrs.class}">
                <b-card
                    no-body
                >
                    <fill-background :bg-color="bgColor">
                        <b-card-body>
                            <slot name="transfer-data">
                                <div>{{ item.text }}</div>
                            </slot>
                        </b-card-body>
                    </fill-background>
                </b-card>
            </div>
        </template>

        <div class="card-input card--draggable" :class="{ 'card-sm': isCardSm, ...$attrs.class}">
            <b-card
                no-body
            >
                <fill-background :bg-color="bgColor">
                    <b-card-body :class="{ 'dragging': dragging, 'dropped': dropped }">
                        <slot name="img"></slot>
                        <slot></slot>
                    </b-card-body>
                </fill-background>
            </b-card>
        </div>
    </drag>
</template>

<script>
import FillBackground from '@/components/ui/helpers/FillBackground'

import { Drag } from 'vue-drag-drop'
import { setTimeout } from 'timers';

export default {
    components: { Drag, FillBackground },
    inheritAttrs: false,
    props:{
        item: {
            type: Object,
            required: true
        },
        size: String,
        type: String,
        bgColor: String,
    },
    data(){
        return {
            dragging: false,
            dropped: false,
            elementWidth: null,
            offsetX: 32,
            offsetY: 24
        }
    },
    computed: {
        isCardSm(){
            return this.size === 'small'
        },
    },
    mounted(){
        this.elementWidth = this.getElementWidth()
        this.elementHeight = this.getElementHeight()
    },
    methods: {
        getElementWidth(){
            return this.$el.offsetWidth
        },
        getElementHeight(){
            return this.$el.offsetHeight
        },
        onDrag(transferData, nativeElement){
            this.dragging = true
        },
        onDragEnd(transferData, nativeElement){
            if (transferData.valid) {
                this.dropped = true
            }

            if (transferData.invalid) {
                setTimeout(() => {
                    this.dragging = false
                    transferData.invalid = false
                }, 600)
            } else {
                this.dragging = false
            }
        }
    },
}
</script>

<style>

</style>
