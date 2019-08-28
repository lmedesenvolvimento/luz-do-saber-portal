<template>
    <div class="container-fluid">        
        <b-row id="grouping-activity" class="row" align-v="center" align-h="center">            
            <b-col
                v-if="hasValues" 
                class="activity-values"
                cols="6"                 
            >      
                <card-display>
                    <b-row style="margin: 5px">
                        <b-col v-for="(item, position) in letters" :key="position" align-self="center" :md="valueColSize" class="item"> 
                            <Item 
                                v-if="answers"
                                :class="{'lowercase-letter': item.key_id == -1}"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />
                        </b-col>                    
                    </b-row> 
                </card-display>  
            </b-col>
            <b-col class="activity-keys">
                <b-row>
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        class="item"
                    >
                        <div class="caixa">
                            <group-drop
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.key"
                            />
                        </div>                        
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'

import Item from '@/components/ui/items/Item'

import groupDrop from '@/components/ui/form/CardGroupDroppable'
import cardDisplay from '@/components/ui/form/CardDisplay'
import { shuffle } from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
    components: { Item, groupDrop, cardDisplay },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins], 
    data(){
        return{
            letters: null,
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            selectedAlphabet:[]
        }
    },   
    created(){
        this.createAnswersArray();        
        this.alphabet.forEach(letter => {
            let cont = 0;
            this.getValues.forEach(value => {
                if(value.text == letter) cont++;
            })
            if(cont == 0) this.selectedAlphabet.push(letter);
        })
        this.letters = this.getValues;
        this.selectedAlphabet = shuffle(this.selectedAlphabet).slice(0, 12 - this.activity.total_correct_items);
        this.selectedAlphabet.forEach(letter => {
            let obj = {
                text: letter,
                key_id: -1
            }
            this.letters.push(Object.assign({}, obj));
        }) 
        this.letters = shuffle(this.letters);
        for(let i = 0; i < this.letters.length; i++){
            this.letters[i].color = this.getColorsArray[i];
        }
        console.log()
    }   
}
</script>

<style>
    .lowercase-letter{
        text-transform: lowercase;
    }
</style>