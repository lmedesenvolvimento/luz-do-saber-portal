<template>
    <drop @drop="onDrop">
        <div class="card-input card-droppable">
            <b-card
                no-body
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot v-if="a.length !== 0" name="transfer-data">
                        <div v-for="item in a" :key="item.id"> {{ item.text }}</div>
                    </slot>
                    <slot v-if="a.length === 0" name="transfer-data">
                        <div> {{ transferData.text }}</div>
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
            a: [],
        }
    },
    created(){
        this.transferData = this.item
        console.log(this.transferData)
    },
    methods: {
        onDrop(transferData, nativeElement){
            if (this.valid) return

            this.transferData = transferData

            this.validationById(transferData)
        },
        validationById(transferData){

            if (this.item.value_ids.includes(transferData.id)) {                
                // this.setAnswer({ 
                //     type: 'value',
                //     data: transferData.id,
                //     vm: this
                // })

                this.a.push(transferData)

                console.log('válido')

                //transferData.valid = true
            }
            else {
                // this.setAnswer({ 
                //     type: 'value', 
                //     data: -1,
                //     vm: this
                // })

                console.log('inválido')

                //transferData.invalid = true
            }

            console.log(this.a)
        }
    }
}
</script>

<style>
</style>
