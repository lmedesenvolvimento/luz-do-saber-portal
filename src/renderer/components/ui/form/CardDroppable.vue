<template>
    <drop @drop="onDrop">
        <div class="card-input card-droppable">
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot name="transfer-data">
                        <div> {{ transferData.text }} </div>
                    </slot>
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
    data(){
        return {
            transferData: {}
        }
    },
    created(){
        this.transferData = this.item
    },
    methods: {
        onDrop(transferData, nativeElement){
            if (this.valid) return

            this.transferData = transferData

            if ( transferData.text === this.item.text ) {                
                this.setAnswer({ 
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })

                transferData.valid = true
            } else {
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })

                transferData.invalid = true
            }
        }
    }
}
</script>

<style>
</style>
