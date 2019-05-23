<template>
    <drop @drop="onDrop">
        <div v-if="answers.length" class="card-input drop-group" :style="{ 'background-image': 'url('+ baseUrl + item.images[0].url + ') no-repeat', 'max-width': '500px', 'max-height': '500px' }" >
            <!-- <img :src="baseUrl + item.images[0].url" alt=""> -->
            <b-card
                v-for="item in answers" 
                :key="item.id"
                no-body
                class="drop-group-item"
                :class="{ 'invalid': invalid, 'valid': valid }"
            >
                <b-card-body>
                    <slot name="transfer-data">
                        <div> {{ item.text }}</div>
                    </slot>
                </b-card-body>
            </b-card>
        </div>
        <div v-else class="drop-group">
            <img :src="baseUrl + item.images[0].url" alt="">
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
    computed: {
        baseUrl(){
            return process.env.BASE_API_URL
        }
    },
    created(){
        this.transferData = this.item
    },
    methods: {
        onDrop(transferData, nativeElement){
            this.transferData = transferData
            
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
