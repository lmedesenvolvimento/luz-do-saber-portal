<template>
    <drop @drop="onDrop">
        <div v-if="answers.length === 0" class="card-input card-droppable">
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot name="transfer-data">
                        <div> {{ transferData.text }}</div>
                    </slot>
                </b-card-body>
            </b-card>
        </div>
        <div v-if="answers.length !== 0" class="card-input card-droppable">
            <b-card
                v-for="item in answers" 
                :key="item.id"
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot name="transfer-data">
                        <div> {{ item.text }}</div>
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
            transferData: {},
            answers: [],
        }
    },
    created(){
        this.transferData = this.item
    },
    methods: {
        onDrop(transferData, nativeElement){
            this.transferData = transferData

            this.validationById(transferData)
        },
        validationById(transferData){
            if (this.item.value_ids.includes(transferData.id)) {
                this.answers.push(transferData)

                transferData.valid = true
            }
            else {
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })

                transferData.invalid = true
            }

            if (transferData.valid){
                for (let i = 0; i < this.answers.length; i++){
                    this.setAnswer({ 
                        type: 'value',
                        data: this.answers[i].id,
                        vm: this
                    })
                }
            }
        }
    }
}
</script>

<style>
</style>
