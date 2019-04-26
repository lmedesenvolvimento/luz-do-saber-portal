<template>
    <drop @drop="onDrop">
        <div class="card-input card-droppable">
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
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
        onDrop(transferData, nativeElement){
            if (this.valid) return

            if ( transferData.text === this.item.text ) {                
                this.setAnswer({ 
                    type: this.type,
                    data: this.item.id,
                    vm: this
                })
                transferData.valid = true
            } else {
                this.setAnswer({ 
                    type: this.type, 
                    data: -1,
                    vm: this
                })
            }
        }
    }
}
</script>

<style>

</style>
