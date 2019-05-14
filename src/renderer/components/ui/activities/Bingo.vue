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
                        <h4>{{ bingoLetter }}</h4>                        
                    </div>
                </div>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
                <b-row>
                    <ls-card-display class="bingoCard bingoCardPlayer">
                        <b-row align-v="center" align-h="center">
                            <p style="color: white">sua cartela</p>
                        </b-row>
                        <b-row align-v="center" align-h="center">                       
                            <b-row
                                v-for="(item, position) in playerLetters" 
                                :key="position" 
                                :sm="valueColSize" 
                                class="item bingoCardLetter"
                            >
                                <!-- <ls-card-input
                                    v-if="answers"
                                    :item="item"
                                >
                                    {{ item.text }}
                                </ls-card-input> -->
                                <div class="card-input card-radio-input" :class="$attrs.class">
                                    <label>
                                        <b-card 
                                            no-body
                                            :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                        >
                                            <b-card-body>
                                                {{ item.text }}
                                            </b-card-body>
                                        </b-card>

                                        <input
                                            v-model="item.selected"                                            
                                            class="input"    
                                            type="checkbox"
                                            true-value="valid"
                                            false-value="invalid"
                                            :name="`input-${position}`"
                                            @change.stop="checkRaffle(item)"
                                        />
                                    </label>
                                </div>
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
                                    :class="{bingoCardRaffleLetter: searchString(raffleLetters, normalizeString(item.text))}" 
                                    style="margin-left: 10px"
                                >
                                    {{ item.text }}
                                </ls-card-display>
                            </b-row>
                        </b-row>
                    </ls-card-display>
                </b-row>
            </b-col>            
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { range, filter } from 'lodash'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import moment from 'moment'

export default {    
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            playerLetters: [],
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
        this.createAnswersArray()
        // inicia o contador
        this.actualizeTimer();
        this.unraffleLetters = this.alphabet.slice(0);          
        // this.setActivityAttrs({ total_correct_items: 7 })

    },
    mounted(){
        this.getKeys[0].letters.forEach(letter => {
            this.playerLetters.push(Object.assign({}, letter))
        })
    },
    
    methods: {  
        checkRaffle (item) {    
            if(item.valid || item.invalid) return

            if(this.searchString(this.raffleLetters, this.normalizeString(item.text))){
                item.valid = true

                if(filter(this.playerLetters, { valid: true }).length === this.playerLetters.length){
                    console.log(this.activity)
                    this.setAnswer({ 
                        type: 'value', 
                        data: 66,
                        vm: {}
                    })
                }

            }else{
                setTimeout(()=> {
                    delete item.invalid
                }, 300)

                item.invalid = true

                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: {}
                })
            }
            
        },
        // ignora a acentuação das letras dos nomes na hora de comparar com as letras do bingo
        normalizeString (string) {
            return string.split('').map(function (letter) {
                let i = this.accents.indexOf(letter)
                return (i !== -1) ? this.out[i] : letter
            }.bind({
                accents: 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź',
                out: 'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz'
            })
            ).join('')
        },      
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
        isRaffle(letter){

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
        ...mapActions('Activity', ['setActivityAttrs','setAnswer'])
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
        margin: -5px 5px -5px 5px;
    }   
    .bingoCardLetter .card-body{
        background-color: white;
    }
    .bingoCardRaffleLetter .card-body {
        background-color: palegreen;
        /* box-shadow: inset 0px 0px 0px 6px transparentize(green, 0.9); */
    }
    .bingoLetter{
        display: inline-grid;
        text-align: center;
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

