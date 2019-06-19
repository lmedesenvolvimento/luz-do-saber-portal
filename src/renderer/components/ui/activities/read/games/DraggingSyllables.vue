<template>
    <div id="dragging-syllables" class="container-fluid">
        <b-row align-h="center" class="reverse">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in newItens" :key="position" cols="12" md="12" class="item"> 
                        <b-row align-v="center">
                            <b-col class="image-col" cols="12" md="3" sm="3">
                                <ls-card-display v-if="item.images[0].url !== null" class="key-image">
                                    <div class="image" :style="{ 'background-image': 'url(' + item.images[0].url + ')' }" />
                                </ls-card-display>
                            </b-col>
                            <b-col cols="12" md="9" sm="9" class="syllables-row">
                                <b-row>
                                    <b-col v-for="(syllables, index) in item.syllables" :key="index" cols="12" lg="3" :md="4" :sm="4" class="key-syllables">
                                        <ls-card-droppable
                                            v-if="answers"
                                            class="item letra"
                                            :item="syllables.syllable"
                                            :type="'key'"
                                            :template="activity.item_template.key"
                                            :custom-validate="validateBySyllabe"
                                        >
                                            <template slot="transfer-data">
                                                {{ syllables.correct ? syllables.syllable.text : dataTransfer.text }}
                                            </template> 
                                        </ls-card-droppable>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="activity-values" cols="12" lg="5" md="12">
                <ls-card-display id="values-container-display">
                    <b-row align-v="center" align-h="center" class="values-container">
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="4" class="item"> 
                            <ls-card-draggable 
                                v-if="answers"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            >
                                {{ item.text }}
                            </ls-card-draggable>
                        </b-col>                    
                    </b-row>
                </ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import Item from '@/components/ui/items/Item'
import { mapState, mapActions } from 'vuex'

import FormProps from '@ui/form'


export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            newItens: [],
            dataTransfer: {text: 'AA'},
        }
    },
    mounted() {
        this.createAnswersArray()
        this.activity.items.keys.forEach((item1,index1)=>{
            this.newItens.push(JSON.parse(JSON.stringify(this.activity.items.keys[index1])));
            this.activity.items.keys[index1].syllables.forEach((item2,index2) =>{
                this.newItens[index1].syllables[index2] = JSON.parse(JSON.stringify(this.activity.items.keys[index1]))
                this.newItens[index1].syllables[index2].syllable = this.activity.items.keys[index1].syllables[index2]
                this.newItens[index1].syllables[index2].syllable.word = this.activity.items.keys[index1].text
                this.newItens[index1].syllables[index2].correct = false;
            })
        })
        // for (let i = 0; i < this.activity.items.keys.length; i++) {
        //     this.newItens.push(JSON.parse(JSON.stringify(this.activity.items.keys[i])));
        //     for (let j = 0; j < this.activity.items.keys[i].syllables.length; j++){           
        //         this.newItens[i].syllables[j] = JSON.parse(JSON.stringify(this.activity.items.keys[i]))
        //         this.newItens[i].syllables[j].syllable = this.activity.items.keys[i].syllables[j]
        //         this.newItens[i].syllables[j].syllable.word = this.activity.items.keys[i].text
        //         this.newItens[i].syllables[j].correct = false;
        //     }
        // }
    },
    methods: {
        validateBySyllabe(transferData, nativeElement, vm){
            this.dataTransfer = transferData   
            if (transferData.text === vm.item.text){
                vm.valid = true;
                transferData.valid = true;


                this.newItens.forEach((item1,index1)=>{
                    this.newItens[index1].syllables.forEach((item2,index2) =>{
                        if (this.newItens[index1].syllables[index2].syllable.text === transferData.text && !this.newItens[index1].syllables[index2].correct){
                            this.newItens[index1].syllables[index2].correct = true
                        }
                    })
                })
                // this.newItens.forEach((item1)=>{
                //     if (item1.text === vm.item.word){
                //         item1.syllables.forEach((item2)=>{
                //             if (item2.correct === false){
                //                 return;
                //             }
                //         })
                //     }
                // })
                // this.newItens.forEach((item1,index1)=>{
                //     if (this.newItens[index1].text === vm.item.word){
                //         this.newItens[index1].syllables.forEach((item2,index2)=>{
                //             if (this.newItens[index1].syllables[index2].correct === false){
                //                 return;
                //             }
                //         })
                //     }
                // })
                for (let i = 0; i < this.newItens.length; i++){
                    if (this.newItens[i].text === vm.item.word){
                        for (let j = 0; j < this.newItens[i].syllables.length; j++){
                            if (this.newItens[i].syllables[j].correct === false){
                                return;
                            }
                        }
                    }
                }
                vm.setAnswer({ 
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
            }else{
                vm.invalid = true;
                transferData.invalid = true
                vm.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })
            }
        },
    },

}
</script>
<style lang="scss">
</style>
