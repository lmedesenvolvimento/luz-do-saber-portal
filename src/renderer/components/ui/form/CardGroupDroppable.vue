<template>
    <drop @drop="onDrop">
        <slot :props="{answers}">
            <div v-if="answers.length && template.custom_image_full_url" class="card-input drop-group" :style="{'background-image': `url(${template.custom_image_full_url})`}">
                <div class="title">
                    {{ item.text }}
                </div>                
                <div v-if="(answers[0].type == 'letra') || (answers[0].type == 'numero')" class="items-container">
                    <b-row align-h="center">
                        <b-col cols="6">
                            <b-row align-h="center">
                                <b-col
                                    v-for="item in answers"
                                    :key="item.id"
                                    cols="4"
                                >
                                    <div class="item">
                                        <div class="texto letra medium">
                                            <div class="card--drop-group-item">
                                                <b-card
                                                    no-body
                                                    :class="{ 'invalid': invalid, 'valid': valid }"
                                                >
                                                    <b-card-body>
                                                        <slot name="transfer-data">
                                                            <div>{{ item.text }}</div>
                                                        </slot>
                                                    </b-card-body>
                                                </b-card>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <div v-else class="items-container">
                    <b-row align-h="center" align-v="center">
                        <b-col cols="6">
                            <b-row align-h="center" align-v="center">
                                <b-col 
                                    v-for="item in answers"
                                    :key="item.id"
                                    cols="6" 
                                >
                                    <div class="item">
                                        <div class="texto medium">
                                            <b-card
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
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div v-else-if="answers.length" class="card-input drop-group">
                <div class="title">
                    {{ item.text }}
                </div>
                <div class="items-container">
                    <div 
                        v-for="item in answers"
                        :key="item.id"
                        class="item"
                    >
                        <div class="texto medium">
                            <b-card
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
                </div>
            </div>
            <div v-else class="card-input drop-group" :style="{'background-image': `url(${template.custom_image_full_url})`}">
                <div class="title">
                    {{ item.text }}
                </div>
            </div>
        </slot>
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
    },
}
</script>

<style>

</style>
