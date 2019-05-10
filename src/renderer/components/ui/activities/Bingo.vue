<template>
    <div class="container-fluid">        
        <b-row align-v="start">
            <b-col cols="3" align-v="center" align-h="center">
                <div class="bingoCounter">
                    <h2 v-if="showTimer" style="color: #13c5c4;">{{ getDuration }}</h2>
                    <h2 v-else>{{ actualRaffleLetter }}</h2>
                </div>
                <div>                   
                    <div 
                        v-for="bingoLetter in alphabet"
                        :key="bingoLetter" 
                        :class="{bingoLetter, bingoRaffleLetter: searchString(raffleLetters,bingoLetter)}" 
                        @click="raffle(bingoLetter)"
                    >
                        {{ bingoLetter }}
                    </div>
                </div>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
                <b-row>
                    <ls-card-display class="bingoCard bingoCardPlayer">
                        <b-row align-v="center" align-h="center">
                            <p>sua cartela</p>
                        </b-row>
                        <b-row align-v="center" align-h="center">                       
                            <b-row
                                v-for="(item, position) in getValues[0].letters" 
                                :key="position" 
                                :sm="valueColSize" 
                                class="item bingoCardLetter"
                            >
                                <Item 
                                    v-if="answers"
                                    :item="item"
                                    :type="'value'"
                                    :template="activity.item_template.key"
                                /> 
                            </b-row>
                        </b-row>
                    </ls-card-display> 
                </b-row>
                <b-row v-for="i in 3" :key="i">
                    <ls-card-display class="bingoCard">
                        <b-row align-v="center" align-h="center">
                            <b-row
                                v-for="(item, position) in getValues[i].letters" 
                                :key="position" 
                                :sm="valueColSize"
                                class="item bingoCardLetter"
                            >
                                <ls-card-display                                      
                                    :class="{bingoCardRaffleLetter: searchString(raffleLetters, item.text)}" 
                                    style="margin-left: 10px"
                                >
                                    {{ item.text }}
                                </ls-card-display>
                            </b-row>
                        </b-row>
                    </ls-card-display>
                </b-row>
            </b-col>
            <!-- <b-col cols="9" align-v="center" align-h="center">                                              
                <b-row 
                    v-for="(item, position) in getValues" 
                    :key="position" 
                    :sm="valueColSize" 
                    :class="{bingoCardPlayer: item === getValues[0]}"
                >
                    <ls-card-display>
                        <b-row 
                            v-if="item === getValues[0]" 
                            align-v="center" align-h="center" 
                            style="margin: 10px"
                        >
                            <p style="color: white">sua cartela</p>
                        </b-row>
                        <b-row> 
                            <b-col>
                                <b-row v-if="item === getValues[0]" class="bingoCardLetter" align-v="center" align-h="center">
                                    <ls-card-input 
                                        v-for="letter in item.text"
                                        :key="letter" style="margin-left: 10px"
                                    >
                                        {{ letter }}
                                    </ls-card-input>                                    
                                </b-row>
                                <b-row v-else class="bingoCardLetter" align-v="center" align-h="center">
                                    <ls-card-display 
                                        v-for="letter in item.text" 
                                        :key="letter" 
                                        :class="{bingoCardRaffleLetter: searchString(raffleLetters, letter)}" 
                                        style="margin-left: 10px"
                                    >
                                        {{ letter }}
                                    </ls-card-display>                                    
                                </b-row>                       
                            </b-col> 
                        </b-row>
                    </ls-card-display>
                </b-row>
            </b-col> -->
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { sortBy, shuffle } from 'lodash'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import moment from 'moment'
import { setInterval, clearInterval, clearImmediate, setTimeout } from 'timers'
import activities from '.';

export default {    
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            unraffleLetters: [],
            raffleLetters: [],
            timer: 10000,
            actualRaffleLetter: '',
            showTimer: true
        }
    },
    computed: {
        getDuration(){           
            return moment(this.timer).format('m:ss')
        },        
        ...mapState('Activity', ['log'])
    },
    created(){
        // inicia o contador
        this.actualizeTimer();
        this.unraffleLetters = this.alphabet.slice(0);        
        this.setActivityAttrs({ total_correct_items: 7 })
    },        
    beforeDestroy(){
        clearInterval(this.timer)
    }, 
    mounted() {
        this.createAnswersArray()
    },
    methods: {    
        actualizeTimer(){
            // decresce o contador até zero
            if(this.timer > 0){
                setTimeout(() => {
                    this.timer -= 1000;
                    this.actualizeTimer();
                },1000) 
            }
            // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
            else if (this.showTimer){
                const letterIndex = Math.floor(Math.random()*this.unraffleLetters.length);
                const letter = this.unraffleLetters[letterIndex];
                this.unraffleLetters.splice(letterIndex,1);
                console.log(this.unraffleLetters);
                this.actualRaffleLetter = letter;
                this.showTimer = false;
                this.raffle(letter);
                this.timer = 5000;
                this.actualizeTimer();
            } 
            // quando chega a zero, e exibindo a letra sorteada, ele reinicia a contagem regressiva
            else {
                this.showTimer = true;
                this.timer = 5000;
                this.actualizeTimer();
            }             
        },
        // marca a letra como sorteada, trocando sua cor   
        raffle(letter) {
            this.raffleLetters.push(letter);
        },
        // verifica se a letra já foi sorteada, percorrendo o vetor raffleLetters
        searchString(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if (arr[i].match(str)) return true;
            }
            return false;
        },        
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>

<style>
    .bingoCounter{
        border: solid 4px;
        border-color: #13c5c4; 
        text-align: center;
        width: 100px;
        margin: auto;
        padding-top: 5px;
        border-radius: 10px;
    }
    .bingoCard{
        width: 800px;
    }
    .bingoCardPlayer .card-body{
        background-color: #ffb141;       
    }
    .bingoCardLetter{        
        margin: 5px;
    }   
    .bingoCardRaffleLetter .card-body{
        background-color: palegreen;
    } 
    .bingoLetter{
        display: inline-grid;
        text-align: center;
        padding-top: 5px;
        color: white;
        background-color: #dfd9db;
        border-radius: 15px;
        width: 30px;
        height: 30px;
        margin: 2px;
    }
    .bingoRaffleLetter{
        background-color: #13c5c4;
    }    
</style>

