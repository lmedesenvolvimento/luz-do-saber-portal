<template>
    <div class="memory-game container-fluid">
        <b-row align-h="center" align-self="center" :md="valueColSize" :sm="6">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="card in cards" :key="card.key" class="item">
                        <div class="card-face">                            
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
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import ItemComponents from '../form/index.js'

export default {
    components: {... ItemComponents},
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    created(){
        this.cards = this.createArray(this.activity.items.keys)
        console.log(this.cards)
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        createArray(keys){
            let cards = []
            let values = keys.map( function(k) {
                let {text, first_letter, images} = k
                let aux = {text, first_letter, images}
                return aux
            })
            for(let i = 0; i<values.length; i++){
                if(values[i].images.length<=0)
                    values[i].images=values[i].first_letter
                let cardImage = { key: values[i].text, value: values[i].images}
                let cardName = { key: values[i].images, value: values[i].text}
                cards.push(cardImage, cardName)
            }

            return cards
        },
    }
}
</script>

<style>
</style>
