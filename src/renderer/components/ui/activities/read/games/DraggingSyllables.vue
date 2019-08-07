<template>
    <div id="dragging-syllables" class="container-fluid">
        <b-row align-h="center" class="reverse">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(item, position) in newItens" :key="position" cols="12">
                        <b-row class="custom-row" align-v="center">
                            <b-col class="image-container">
                                <ls-card-display>
                                    <async-image class="image" :src="item.images[0].url"></async-image>
                                </ls-card-display>
                            </b-col>
                            <b-col>
                                <b-row align-h="left" class="syllables-row custom-row">
                                    <b-col v-for="(syllables, index) in item.syllables" :key="index" class="item key-syllables">
                                        <div class="silaba texto validate-icon-top" :class="activity.item_template.key.font_size">
                                            <ls-card-droppable
                                                v-if="answers"
                                                :item="syllables.syllable"
                                                :type="'key'"
                                                :template="activity.item_template.key"
                                                :custom-validate="validateBySyllabe"
                                            >
                                                <template slot="transfer-data">
                                                    {{ syllables.correct ? syllables.syllable.text : dataTransfer.text }}
                                                </template>
                                            </ls-card-droppable>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="activity-values">
                <ls-card-display id="values-container-display">
                    <b-row class="values-container" align-h="center">
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" class="item value-syllables">
                            <div class="silaba texto" :class="activity.item_template.value.font_size">
                                <ls-card-draggable
                                    v-if="answers"
                                    class="value"
                                    :item="item"
                                    :type="'value'"
                                    :template="activity.item_template.value"
                                >
                                    {{ item.text }}
                                </ls-card-draggable>
                            </div>
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
import AsyncImage from '@ui/AsyncImage'
import Item from '@/components/ui/items/Item'
import { mapState, mapActions } from 'vuex'

import FormProps from '@ui/form'


export default {
    components: {
        ...FormProps,
        AsyncImage,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            newItens: [],
            dataTransfer: {text: 'SAN'},
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
                vm.setAnswer({
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
                console.log(transferData.text + '/' + vm.item.text);
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
