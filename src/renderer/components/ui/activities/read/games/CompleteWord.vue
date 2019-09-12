<template>
    <div class="container-fluid complete-word">
        <b-row align-h="center" class="column">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row align-v="center">
                    <b-col cols="12" md="4" sm="4">
                        <async-image class="image" :src="incompleteWord.images[0].url"></async-image>
                    </b-col>
                    <b-col cols="12" md="8" sm="8" class="pieces-row">
                        <b-row>
                            <b-col v-for="(piece, index) in incompleteWord.pieces" :key="index" :md="1" class="key-pieces item">                                        
                                <ls-card-droppable
                                    v-if="piece.template.tags === 'encaixar'"
                                    :class="[piece.type, 'texto', activity.item_template.key.font_size]"
                                    :item="piece"
                                    :type="'key'"
                                    :template="activity.item_template.key"
                                >
                                </ls-card-droppable>
                                <div v-else :class="[piece.type, 'texto', activity.item_template.key.font_size]">
                                    <ls-card-display
                                        :item="piece"
                                        :valid="piece.valid"
                                        :invalid="piece.invalid"
                                    >
                                        {{ piece.text }}
                                    </ls-card-display>                                    
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-col class="activity-values" cols="12" md="12">
                    <b-row align-v="center" align-h="center" class="values-container">
                        <ls-card-display v-if="activity.item_template.value.tags==='arrastar'" class="card--display-container">
                            <b-row align-v="center" align-h="center" cols="12" md="12">
                                <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item">
                                    <Item 
                                        :item="item"
                                        :type="'value'"
                                        :template="activity.item_template.value"
                                        :size="activity.item_template.value.font_size"
                                    />
                                </b-col>
                            </b-row>
                        </ls-card-display>
                        <b-col v-for="(item, position) in getValues" v-else :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item selection" @click="triggerFocus(item)">
                            <Item 
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                                :size="activity.item_template.value.font_size"
                            />                                
                        </b-col>
                    </b-row>
                </b-col>
            </b-col>
        </b-row>
    </div>
</template>
<script>
// script
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { cloneDeep, findIndex } from 'lodash'
import AsyncImage from '@ui/AsyncImage'
import Item from '@/components/ui/items/Item'
import ItemComponents, { ItemProps } from '@/components/ui/items/index.js'
import { mapState, mapActions } from 'vuex'

import FormProps from '@ui/form'

export default {
    components: {
        ...FormProps,
        AsyncImage,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    props:{ type: String },
    data() {
        return {
            incompleteWord: {},
            separator: this.type,
            selectItem: null,
            correctIndex: -1,
        }
    },
    computed: {
        ...mapState('Activity', ['answers'])
    },
    watch: {
        selectItem(value){
            if(value){
                const pieceIndex = value.id
                let pieces = this.incompleteWord.pieces.filter(p => p.value_ids)
                let piece = pieces.filter((p) => p.value_ids.includes(pieceIndex))[0]
                if(piece){
                    let selectedPieceIndex = this.getIndex(this.incompleteWord.pieces, piece, 'value_ids')
                    let selectPiece = this.incompleteWord.pieces[selectedPieceIndex]
                    selectPiece.text = value.text
                    selectPiece.valid = true
                }
            }
        },
    },
    created(){
        this.incompleteWord = cloneDeep(this.getKeys[0])
        this.correctPiece = this.getValues.filter(value => value.key_id)
        this.clearIncompleteWord(this.separator, this.correctPiece[0])
        this.clearIncompleteWord(this.separator, this.correctPiece)
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        triggerFocus(item) {
            this.selectItem = item
        },
        clearIncompleteWord(type, correct){
            let pieces = []
            this.correctPiece = correct
            if(type === 'letra'){
                pieces = this.incompleteWord.letters
            } else if(type === 'silaba'){
                pieces = this.incompleteWord.syllables
            }
            for(let i = 0; i<pieces.length; i++){
                pieces[i].template = cloneDeep(this.activity.item_template.key)
                if(pieces[i].text === correct.text){
                    pieces[i].text = ''
                    pieces[i].value_ids = this.incompleteWord.value_ids
                    this.correctIndex = i
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
.complete-word{
    .key-pieces{
        .silaba{
            .card{
                &.valid, &.invalid{
                    &::after{
                        content: none !important;
                    }
                }        
            }
        }
    }

    .item{
        pointer-events: none;
    }

    .card-input{
        pointer-events: all;
    }

    .selection{
        .bg-color{
            background-color: transparent !important;
            color: #5F4343 !important;
        }
    }

    .silaba,
    .letra{
        .card-body{
            min-height: 60px;
        }
    }    
}
</style>
