<template>
    <drag @drag="onDrag">
        <div class="card-input card-draggable">
            <b-card
                no-body
            >
                <b-card-body>
                    <slot name="img"></slot>
                    <slot></slot>
                </b-card-body>
            </b-card>
        </div>
    </drag>
</template>

<script>
import { Drag } from 'vue-drag-drop';

export default {
    components: { Drag },
    methods: {
        onDrag(transferData, nativeElement){
            console.log(transferData, nativeElement)
        }
    }
}
</script>

<style>

</style>
