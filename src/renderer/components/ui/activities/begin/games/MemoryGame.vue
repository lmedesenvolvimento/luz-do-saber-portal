<template>
    <div class="memory-game container-fluid" :class="{ 'clickable' : firstClick}" @click="unflipCards()">
        <b-row :md="valueColSize" :sm="6">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(card, index) in cards" :key="card.key" :class="card.class" class="item" :sm="valueColSize">
                        <div class="card-face" :class="card.class" @click="toggleFlip(index, card)">                           
                            <ls-card-display
                                label="item.text" 
                                :type="'text'"
                                :item="card"
                                bg-color="#02CCC3"
                                class="front"
                            >
                                <div></div>
                            </ls-card-display>
                            <ls-card-display
                                label="item.text" 
                                :type="'text'"
                                :item="card"
                                :valid="card.class.success"
                                :invalid="card.class.fail"
                                bg-color="#FFFFFF"
                                class="back"
                            >
                                <div v-if="card.type === 'key'">
                                    <div v-if="isImage && card.images.length" class="m-image-container">
                                        <img class="m-image" :src="card.images[0].url">
                                    </div>
                                    <div v-else>
                                        {{ card.value }}
                                    </div>
                                </div>                                    
                                <div v-else>
                                    <div v-if="card.value.length > 0" class="m-image-container">
                                        <img class="m-image" :src="card.value[0].url">
                                    </div>
                                    <div v-else>
                                        {{ card.first_letter }}
                                    </div>
                                </div>
                            </ls-card-display>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ItemComponents from '@ui/form/index.js'
import { shuffle, find } from 'lodash'

import { mapActions, mapState } from 'vuex'

export default {
    components: {... ItemComponents},
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            cards: [],
            openedCards: [],
            matchedCards: [],
            firstClick: true,
        }
    },
    computed: {
        isImage() {
            return this.activity.item_template === 'imagem'
        }
    },
    created(){
        this.cards = this.createArray(this.activity.items)
        this.createAnswersArray()
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
    },
    methods: {
        unflipCards(){
            if(this.firstClick){
                this.cards.map( function(c){ c.class.unflip = true, c.class.flipped = false })
                setTimeout(() => this.cards.map( function(c){ c.class.unflip = false }), 1200)
                this.firstClick = false
            }
        },
        createArray(items){
            let cards = []
            
            let values = items.keys.map( function(k) {                    
                let {id, text, images, value_ids} = k
                let aux = {id, value: text, images, value_ids, type: 'key'}
                return aux
            })

            let values2 = items.values.map( function(k) {
                let {id, images, key_id, first_letter} = k
                let aux = {id, value: images, key_id, type: 'value', first_letter}
                return aux
            })
            cards = values.concat(values2)

            for(let i = 0; i<cards.length; i++){
                cards[i]['class'] = {flip: false, flipped: true, success: false, fail: false, unflip: false}
            }

            return shuffle(cards)
        },

        toggleFlip(index, card){
            if(this.openedCards.length<=1){
                this.openedCards.push(card)
                card.class.flip = true
                if(this.openedCards.length===2){
                    if(this.openedCards[0].type !== this.openedCards[1].type){
                        let value = find(this.openedCards,['type', 'value'])
                        let key = find(this.openedCards,['type', 'key'])
                        let index = key.value_ids.indexOf(value.id)
                        if(index>=0)
                            this.matched(value);
                        else
                            this.unmatched();
                    } else {
                        this.unmatched();
                    }
                }
            }
        },
        matched(value){
            this.openedCards[0].class.success = true
            this.openedCards[1].class.success = true   
            this.matchedCards = _.concat(this.matchedCards, this.openedCards);
            this.openedCards = [];
            this.setAnswer({ 
                type: 'value',
                data: value.id,
                vm: {}
            })
        
        },
        unmatched(){
            setTimeout(() => {
                this.openedCards[0].class.fail = true
                this.openedCards[1].class.fail = true
            },600)
            this.setAnswer({ 
                type: 'value', 
                data: -1,
                vm: {}
            })
            setTimeout(() => {
                this.openedCards[0].class.unflip = true
                this.openedCards[1].class.unflip = true
                this.openedCards[0].class.fail = false
                this.openedCards[1].class.fail = false
            }, 2000)
            setTimeout(() => {
                this.openedCards[0].class.unflip = false
                this.openedCards[1].class.unflip = false
                this.openedCards[0].class.flip = false
                this.openedCards[1].class.flip = false
                this.openedCards = [];  
            }, 3000)
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    }
}
</script>

<style lang="scss" scoped>
.m-image-container{
    position: relative;
    overflow: hidden;
    padding-left: 4px;
    padding-right: 4px;
    .m-image{
        width: auto;
        max-width: 100%;
        max-height: 160px;
    }
}
</style>


