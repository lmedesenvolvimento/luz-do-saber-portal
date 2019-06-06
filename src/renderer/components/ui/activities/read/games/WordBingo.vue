<template>
    <div class="container-fluid">
        <b-row align-v="center">
            <b-col cols="3" align-v="center" align-h="center">
                <b-row class="bingo-container" align-v="center" align-h="center">
                    <img class="bingo-roulette" :src="bingoRoulette" alt="">                  
                    <img class="bingo-panel" :src="bingoCounter" alt="">
                    <div 
                        class="bingo-counter"
                        :class="{'bingo-counter-animation': animateBingoCounter}"
                    >
                        <h2 v-if="showTimer" style="color: #13c5c4;">{{ getDuration }}</h2>
                        <h2 v-else>{{ actualRaffleWord }}</h2>
                    </div>                    
                </b-row>                
                <b-row align-h="start">
                    <div
                        v-for="bingoWord in allWords"
                        :key="bingoWord"
                        class="bingo-word" 
                        :class="{'bingo-raffle-word': searchString(raffleWords,bingoWord)}" 
                    >
                        {{ bingoWord }}
                    </div>
                </b-row>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
                <b-row>
                    <ls-card-display 
                        class="bingo-card bingo-card-player"
                    >
                        <b-row align-v="center" align-h="center">
                            <p style="color: white">sua cartela</p>                            
                        </b-row>
                        <b-row align-v="center" align-h="center">                       
                            <b-row
                                v-for="(item, position) in getBingoValues" 
                                :key="position" 
                                :sm="valueColSize" 
                                class="item bingo-card-letter"
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
                    <ls-card-display 
                        v-for="i in 2" :key="i"
                        class="bingo-card"
                    >                        
                        <b-row align-v="center" align-h="center">                       
                            <b-row
                                v-for="word in words[i-1]" 
                                :key="word"
                                :sm="valueColSize" 
                                class="item bingo-card-letter"
                            >                                
                                <ls-card-display                                      
                                    style="margin-left: 10px"  
                                    :valid="searchString(raffleWords, word)"                                  
                                >
                                    {{ word }}
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
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import moment from 'moment'
import { setTimeout } from 'timers';
import Activity from '@/store/modules/Activity';
import Bingo from '@/components/ui/activities/begin/games/Bingo';

export default { 
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            words: [],
            playerWords: [],
            allWords: [],
            unraffleWords: [],
            raffleWords: [],
            scramblePlayerWords: [],
            actualRaffleWord: '',
            timer: 5000,
            showTimer: true,
            animateBingoCounter: false
        }
    },
    computed:{
        getBingoValues(){
            return filter(this.getValues, value => value.key_id)
        },
        // retorna as imagens da roleta e do painel interno
        bingoRoulette() {
            return require('@/assets/images/components/bingo/globo-bingo.png');
        },
        bingoCounter(){
            return require('@/assets/images/components/bingo/painel-bingo.png');
        },
        // ajusta o formato em que o horário será exibido
        getDuration(){           
            return moment(this.timer).format('m:ss')
        },        
        ...mapState('Activity', ['log'])
    }, 
    watch: {
        showTimer() {
            this.animateBingoCounter = true;
            setTimeout(() => {
                this.animateBingoCounter = false;
            },1000) 
        }
    },   
    created(){        
        this.words = [[],[]]   
        // colocaca o valores da cartela do jogador num vetor, e nas
        for(let i = 0; i < this.getKeys.length; i++){
            this.unraffleWords.push(this.getKeys[i].text)      
            this.scramblePlayerWords.push(this.getKeys[i].text)
            this.playerWords.push(Object.assign({}, this.getKeys[i]))      
        }  
        // pega os valores e os joga numa matriz de palavras
        this.scramblePlayerWords = shuffle(this.scramblePlayerWords);
        for(let i = 0; i < this.getValues.length; i++){
            if(i < this.activity.total_correct_items){
                this.words[0].push(this.getValues[i].text)                             
            }else{
                this.words[1].push(this.getValues[i].text)
            }
            if(!this.searchString(this.unraffleWords, this.getValues[i].text)){
                this.unraffleWords.push(this.getValues[i].text) 
            } 
        }
        this.unraffleWords = shuffle(this.unraffleWords);
        this.allWords = this.unraffleWords.slice();
        this.actualizeBingoTimer();
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        isCheck(item){
            return false
        },
        checkRaffle (item) {    
            // caso o item já tenha sido checado, retornamos aqui mesmo
            if(item.valid || item.invalid) return
            //testa se o item já pode ser marcado na cartela do jogador
            if(this.searchString(this.raffleWords, item.text)){
                item.valid = true                
                this.setAnswer({ 
                    type: 'value', 
                    data: item.id,
                    vm: this
                })  
            // caso a letra marcada ainda não tiver saído no bingo
            }else{
                setTimeout(()=> {
                    delete item.invalid
                }, 300)

                item.invalid = true

                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })
            }
            
        },
        // marca a letra como sorteada, trocando sua cor   
        raffle(word) {
            this.raffleWords.push(word);
        },
        searchString(arr, str) {
            for(let i = 0; i < arr.length; i++){
                if (arr[i].match(str)) return true;
            }
            return false;
        },
        actualizeBingoTimer(){
            // decresce o contador até zero
            if(this.unraffleWords.length > 0){
                if(this.timer > 0){
                    setTimeout(() => {
                        this.timer -= 1000;
                        this.actualizeBingoTimer();
                    },1000) 
                }
                // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
                else if (this.showTimer){
                    // os primeiros valores sorteados são referentes as letras embaralhadas do nome do jogador
                    if(this.scramblePlayerWords.length > 0){                    
                        this.unraffleWords.splice( this.unraffleWords.indexOf(this.scramblePlayerWords[0]) ,1);
                        this.actualRaffleWord = this.scramblePlayerWords[0];
                        this.raffle(this.scramblePlayerWords[0]);
                        this.scramblePlayerWords.shift(); 
                    }
                    // após todas as letras do nome do jogador terem sido sorteadas, letras remanescentes são sorteadas aleatoriamente 
                    else {
                        const wordIndex = Math.floor(Math.random()*this.unraffleWords.length);
                        const word = this.unraffleWords[wordIndex];
                        this.unraffleWords.splice(wordIndex,1);
                        this.actualRaffleWord = word;
                        this.raffle(word);
                    }
                    this.showTimer = false;
                    this.timer = 5000;
                    this.actualizeBingoTimer();
                }
                // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
                else {
                    this.showTimer = true;
                    this.timer = 5000;
                    this.actualizeBingoTimer();
                }
            }
                  
        },
        ...mapActions('Activity', ['setActivityAttrs','setAnswer'])
    },
}
</script>

<style lang="scss">    
@import '~animate-scss/_properties';
@import '~animate-scss/_attention-seekers/attention-seekers';
.bingo-word{
    display: inline-grid;
    text-align: center;
    padding-top: 20px;
    color: white;
    background-color: #dfd9db;
    border-radius: 30px;
    width: 60px;
    height: 60px;
    margin: 2px;
    &.bingo-raffle-word{
        background-color: #13c5c4;
    }
}
</style>
