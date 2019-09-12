<template>
    <drop @drop="onDrop">
        <div class="card-input card--droppable">
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot name="transfer-data">
                        <div> {{ transferDataText }}</div>
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
    props: {
        defaultAttr: {
            type: String,
            default: 'text'            
        },
        customValidate: Function
    },    
    data(){
        return {
            transferData: {}
        }
    },
    computed: {
        transferDataText(){
            return this.transferData[this.defaultAttr]
        }
    },
    created(){
        this.transferData = this.item
    },
    methods: {
        onDrop(transferData, nativeElement){
            if (this.valid) return
            
            if (!this.customValidate){
                this.transferData = transferData
                if (this.item.value_ids.includes(transferData.id)) {
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
            } else {
                this.customValidate(transferData, nativeElement, this)
            }           
        }
    }
}
</script>

<style>
</style>
