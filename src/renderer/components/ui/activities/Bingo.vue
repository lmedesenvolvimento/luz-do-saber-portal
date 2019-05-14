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
                    <ls-card-display 
                        class="bingoCard bingoCardPlayer"
                    >
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
                <b-row 
                    v-for="i in 3" 
                    :key="i"
                >
                    <ls-card-display 
                        class="bingoCard" 
                        :valid="searchStringInArray(raffleLetters, normalizeString(getValues[i].text).split(''))"                       
                    >                        
                        <b-row align-v="center" align-h="center">
                            <b-row
                                v-for="(item, position) in getValues[i].letters" 
                                :key="position" 
                                :sm="valueColSize"
                                class="item bingoCardLetter"
                            >
                                <ls-card-display                                      
                                    style="margin-left: 10px"
                                    :valid="searchString(raffleLetters, normalizeString(item.text))"
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
import { shuffle, range, filter } from 'lodash'
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
            scramblePlayerLetters: [],
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            unraffleLetters: [],
            raffleLetters: [],
            timer: 5000,
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
        //preenchee um vetor com o alfabeto, que perderá letras a cada jogada
        this.unraffleLetters = this.alphabet.slice(0);
        // inicia o contador
        this.actualizeBingoTimer();        
    },
    mounted(){
        //insere as letras dojogador num array
        this.getKeys[0].letters.forEach(letter => {
            this.playerLetters.push(Object.assign({}, letter))
        })
        // para podermos dar prioridade as letras do usuário na chamada do bingo, criamos um vetor com as letras, sem repetições
        this.playerLetters.forEach(letter => {
            if(!this.searchString(this.scramblePlayerLetters, this.normalizeString(letter.text))){
                this.scramblePlayerLetters.push(letter.text)
            }            
        })
        // embaralhamos o vetor de letras
        this.scramblePlayerLetters = shuffle(this.scramblePlayerLetters);        
    },
    destroyed() {
        // impede que continuem sendo chamados após sair da fase
        delete this.unraffleLetters
        delete this.actualizeBingoTimer
    },
    methods: {
        checkRaffle (item) {    
            // caso o item já tenha sido checado, retornamos aqui mesmo
            if(item.valid || item.invalid) return
            //testa se o item já pode ser marcado na cartela do jogador
            if(this.searchString(this.raffleLetters, this.normalizeString(item.text))){
                item.valid = true
                // insere o id da resposta do jogador
                if(filter(this.playerLetters, { valid: true }).length === this.playerLetters.length){
                    this.setAnswer({ 
                        type: 'value', 
                        data: 66,
                        vm: {}
                    })
                }
            // caso a letra marcada ainda não tiver saído no bingo
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
        actualizeBingoTimer(){
            // decresce o contador até zero
            if(this.unraffleLetters.length > 0){
                if(this.timer > 0){
                    setTimeout(() => {
                        this.timer -= 1000;
                        this.actualizeBingoTimer();
                    },1000) 
                }
                // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
                else if (this.showTimer){
                    // os primeiros valores sorteados são referentes as letras embaralhadas do nome do jogador
                    if(this.scramblePlayerLetters.length > 0){                    
                        this.unraffleLetters.splice( this.unraffleLetters.indexOf(this.scramblePlayerLetters[0]) ,1);
                        this.actualRaffleLetter = this.scramblePlayerLetters[0];
                        this.raffle(this.scramblePlayerLetters[0]);
                        this.scramblePlayerLetters.shift();                    
                        
                    }
                    // após todas as letras do nome do jogador terem sido sorteadas, letras remanescentes são sorteadas aleatoriamente 
                    else {
                        const letterIndex = Math.floor(Math.random()*this.unraffleLetters.length);
                        const letter = this.unraffleLetters[letterIndex];
                        this.unraffleLetters.splice(letterIndex,1);
                        this.actualRaffleLetter = letter;
                        this.raffle(letter);
                    }
                    this.showTimer = false;
                    this.timer = 5000;
                    this.actualizeBingoTimer();
                }             
                // quando chega a zero, e exibindo a letra sorteada, ele reinicia a contagem regressiva
                else {
                    this.showTimer = true;
                    this.timer = 5000;
                    this.actualizeBingoTimer();
                }
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
        // pesquisa se todas letras de um nome já saíram
        searchStringInArray(arr, str) {
            let counter = 0;            
            for(let i = 0; i < arr.length;i++){
                for (let j = 0; j < str.length; j++){
                    if (arr[i].match(str[j])) counter++;
                }
            }
            if (counter == str.length) return true;
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

