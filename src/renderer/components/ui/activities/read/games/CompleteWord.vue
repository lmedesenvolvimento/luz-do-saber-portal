<template>
    <div id="complete-word" class="container-fluid">
        <b-row align-h="center" class="column">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row align-v="center">
                    <b-col cols="12" md="4" sm="4">
                        <async-image class="image" :src="incompleteWord.images[0].url"></async-image>
                    </b-col>
                    <b-col cols="12" md="8" sm="8" class="pieces-row">
                        <b-row>
                            <b-col v-for="(pieces, index) in incompleteWord.pieces" :key="index" :md="1" class="key-pieces item">
                                <Item 
                                    :item="pieces"
                                    :type="'key'"
                                    :template="pieces.template"
                                />
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-col class="activity-values" cols="12" md="12">
                    <b-row align-v="center" align-h="center" class="values-container">
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item" @click="triggerFocus(item)">
                            <Item 
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />
                        </b-col>
                    </b-row>
                </b-col>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { cloneDeep, findIndex } from 'lodash'
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
    props: [ 'type' ],
    data() {
        return {
            incompleteWord: {},
            correctPiece: {},
            separator: this.type,
            selectItem: null
        }
    },
    created(){
        this.incompleteWord = this.getKeys[0]
        this.correctPiece = this.getValues.filter(value => value.key_id)
        this.clearIncompleteWord(this.separator, this.correctPiece[0])
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        triggerFocus(item) {
            console.log(item)
            const pieceIndex = findIndex(this.incompleteWord.pieces, { text: null })
            this.incompleteWord.pieces[pieceIndex].text = item.text
        },
        clearIncompleteWord(type, correct){
            let pieces = []
            if(type === 'letra'){
                pieces = this.incompleteWord.letters
            } else if(type === 'silaba'){
                pieces = this.incompleteWord.syllables
            }
            for(let i = 0; i<pieces.length; i++){
                pieces[i].template = cloneDeep(this.activity.item_template.key)
                if(pieces[i].text === correct.text){
                    pieces[i].text = null
                    pieces[i].value_ids = this.incompleteWord.value_ids
                } else {
                    pieces[i].template.tags = null
                }
            }
            this.incompleteWord.pieces = pieces
        },

        ...mapActions('Activity', ['setAnswer'])

    },
}
</script>
<style lang="scss">
.silaba,
.letra{
    .card-body{
        min-height: 60px;
    }
}
</style>
