<template>
    <drop @drop="onDrop">
        <div class="card-input card-droppable">
            <b-card
                no-body
            >
                <b-card-body>
                    <slot name="img"></slot>
                    <slot></slot>
                </b-card-body>
            </b-card>
        </div>
    </drop>
</template>

<script>
import { Drop } from 'vue-drag-drop'
import RadioInput from './RadioInput.vue'

export default {
    components: { Drop },
    mixins: [RadioInput],
    methods: {
        onDrop(data, event){
            console.log(data, event)
        }
    }
}
</script>

<style>

</style>
