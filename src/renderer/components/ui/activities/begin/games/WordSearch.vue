<template>
    <div class="word-search container-fluid">
        <b-row class="word-container" align-h="center" align-v="center">
            <b-col class="word-canvas" cols="8">
                <b-row align-h="center" align-v="center">
                    <ls-card-display>
                        <div class="grid">
                            <div v-for="(r, index) in grid" :key="index" class="letters">
                                <div v-for="(l, letterIndex) in r" :key="letterIndex" :class="l.class" class="letter" v-on:click="recreateGrid('show')">
                                    {{ l.value }}
                                </div>
                            </div>
                        </div>
                    </ls-card-display>
                </b-row>
            </b-col>
            <b-col class="clues" cols="4">
                <b-row v-for="(value, index) in getValues" :key="index" align-h="center" align-v="center">
                    <ls-card-display>
                        <div class="clue">
                            {{ value.text }}
                        </div>
                    </ls-card-display>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// import Item from '@/components/ui/items/Item'
// import { every } from 'lodash'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
// import { Drag, Drop } from 'vue-drag-drop'
import ui from '@/components/ui'

import { mapActions } from 'vuex'

export default {
    components: { ...ui },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            grid: [],
            directions: []
        }
    },
    created(){
        this.grid = this.createGrid(this.getValues)
        //seta as respostas
        this.createAnswersArray()
        this.setActivityAttrs({ total_correct_items: this.getValues.length })
    },
    methods: {
        recreateGrid(str){
            console.log(str)
            this.grid = this.createGrid(this.getValues)
        },
        createGrid(words){
            let gridAux = []
            for(let i = 0; i < 11; i++){
                gridAux[i] = []
                for(let j = 0; j < 11; j++){
                    gridAux[i].push({value: this.randomChar(), class: '', free: true})
                }
            }
            for (let i = 0; i<words.length; i++){
                let dir = this.randomDirection()
                let maxIndex = this.limit(gridAux,words[i].text)
                let beginIndex = this.getRandomInt(0, maxIndex)
                let transversal = this.getRandomInt(0, gridAux.length)
                if(dir==='hor'){
                    let word = words[i].text
                    for(let l = 0; l<word.length; l++){
                        gridAux[transversal][beginIndex+l].value = word[l]
                        gridAux[transversal][beginIndex+l].class = 'red'
                    }
                }
                else if(dir === 'ver'){
                    let word = words[i].text
                    for(let l = 0; l<word.length; l++){
                        gridAux[beginIndex+l][transversal].value = word[l]
                        gridAux[beginIndex+l][transversal].class = 'red'
                    }
                }
            }

            return gridAux
        },
        limit(grid,word){
            return grid.length - word.length
        },
        randomChar() {
            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let randomIndex = this.getRandomInt(0, alphabet.length)
            return alphabet[randomIndex]
        },
        getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min
        },
        randomDirection(){
            return Math.floor(Math.random()*2) ? 'hor' : 'ver'
        },
        ...mapActions('Activity', ['setActivityAttrs'])
    }
}
</script>

<style>
</style>
