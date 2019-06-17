<template>
    <drop @drop="onDrop">
        <div v-if="isBox">
            <div v-if="answers.length && template.custom_image_full_url" class="card-input drop-group" :style="{'background-image': `url(${template.custom_image_full_url})`}">
                <div class="title">
                    {{ item.text }}
                </div>
                <div class="items-container">
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
            </div>
            <div v-else-if="answers.length" class="card-input drop-group">
                <div class="title">
                    {{ item.text }}
                </div>
                <div class="items-container">
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
            </div>
            <div v-else class="card-input drop-group" :style="{'background-image': `url(${template.custom_image_full_url})`}">
                <div class="title">
                    {{ item.text }}
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="answers.length" class="card-input drop-group">
                <div class="title">
                    {{ item.text }}
                </div>
                <div class="items-container">
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
            </div>
            <div v-else class="card-input drop-group" :style="{'background-image': `url(${template.custom_image_full_url})`}">
                <div class="title">
                    {{ item.text }}
                </div>
            </div>
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
        template: Object
    },
    data(){
        return {
            transferData: {},
            answers: [],
        }
    },
    computed: {
        isBox(){
            return this.template.custom === 'game-caixa-de-palavras' ? true : false
        }
    },
    created(){
        this.transferData = this.item
    },
    methods: {
        onDrop(transferData, nativeElement){
            this.transferData = transferData
            
            if (this.item.value_ids.includes(transferData.id)) {
                this.answers.unshift(transferData)

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
    },
}
</script>

<style>

</style>
