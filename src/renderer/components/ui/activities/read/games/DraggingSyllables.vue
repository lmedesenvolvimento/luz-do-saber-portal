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
        for (let item1 of this.activity.items.keys){
            this.newItens.push(JSON.parse(JSON.stringify(item1)));
        }
        for (let item1 of this.newItens){
            let i = 0
            for (let item2 of item1.syllables){
                item2.syllable = item1.syllables[i]
                item2.syllable.word = item1.text
                item2.correct = false
                i++
            }
        }
    },
    methods: {
        validateBySyllabe(transferData, nativeElement, vm){
            this.dataTransfer = transferData   
            if (transferData.text === vm.item.text){
                vm.valid = true;
                transferData.valid = true;
                for (let item1 of this.newItens){
                    for(let item2 of item1.syllables){
                        if(item2.syllable.text === transferData.text){
                            item2.correct = true
                        }
                    }
                }
                for (let item1 of this.newItens){
                    if (item1.text === vm.item.word){
                        for (let item2 of item1.syllables){                        
                            if (item2.correct === false){
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
            } else {
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
<style>
</style>
