<template>
    <div class="memory-game container-fluid">
        <b-row align-h="center" align-self="center" :md="valueColSize" :sm="6">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(card, index) in cards" :key="card.key" class="item">
                        <div class="card-face" :class="card.class" v-on:click="toggleFlip(index, card)">                            
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
                                bg-color="#FFFFFF"
                                class="back"
                            >
                                <div>{{ card.value }}</div>
                            </ls-card-display>
                        </div>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import ItemComponents from '../form/index.js'
import { shuffle, find } from 'lodash'

import { mapActions, mapState } from 'vuex'


export default {
    components: {... ItemComponents},
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            cards: [],
            openedCards: [],
            matchedCards: []
        }
    },
    created(){
        this.cards = this.createArray(this.activity.items)
        this.createAnswersArray()
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
    },
    methods: {
        createArray(items){
            let cards = []
            let values = items.keys.map( function(k) {
                let {id, text, value_ids} = k
                let aux = {id, value: text, value_ids, type: 'key'}
                return aux
            })
            let values2 = items.values.map( function(k) {
                if(k.images.length>=0)
                    k.images = k.first_letter
                let {id, images, key_id} = k
                let aux = {id, value: images, key_id, type: 'value'}
                return aux
            })
            cards = values.concat(values2)

            for(let i = 0; i<cards.length; i++){
                cards[i]['class'] = {flip: false, success: false, fail: false}
            }

            return cards
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
            this.matchedCards = _.concat(this.matchedCards, this.openedCards);
            this.openedCards = [];
            console.log(value)
            this.setAnswer({ 
                type: 'value',
                data: value.id,
                vm: {}
            })
        
        },
        unmatched(){
            this.openedCards[0].class.fail = true
            this.openedCards[1].class.fail = true
            this.setAnswer({ 
                type: 'value', 
                data: -1,
                vm: {}
            })
            setTimeout(() => {
                this.openedCards[0].class.flip = false
                this.openedCards[1].class.flip = false
                this.openedCards[0].class.fail = false
                this.openedCards[1].class.fail = false
                this.openedCards = [];  
            }, 2000)
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    }
}
</script>

<style>
</style>
