<template>
    <div class="container-fluid">
        <b-row align-v="center" class="bingo">
            <b-col cols="3" align-v="center" align-h="center">
                <div style="position: relative">
                    <b-row class="bingo-container" align-v="center" align-h="center">
                        <async-image class="bingo-roulette" :src="bingoRoulette" alt="roleta do bingo" />   
                        <div class="bingo-panel bingo-panel-word">
                            <div class="bingo-panel-inside">
                                <div
                                    class="bingo-counter"
                                    :class="{'bingo-counter-animation': animateBingoCounter}"
                                >
                                    <h2 v-if="showTimer" style="color: #13c5c4;">{{ getDuration }}</h2>
                                    <h2 v-else>{{ actualRaffleWord }}</h2>
                                </div>
                            </div>                            
                        </div>
                    </b-row>
                    <b-row align-h="start">
                        <div
                            v-for="bingoWord in allWords"
                            :key="bingoWord"
                            class="bingo-word"
                            :class="{'bingo-raffle-word': searchString(raffleWords,bingoWord), 'bingo-word-zoom': isWordBingo}"
                        >
                            <p :class="{'bingo-word-big': isWordBingo}">{{ bingoWord }}</p>
                        </div>
                    </b-row>
                </div>
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
                <b-row>
                    <ls-card-display
                        class="bingo-card bingo-card-player"
                    >
                        <b-col>
                            <b-row align-v="center" align-h="center">
                                <p style="color: white">sua cartela</p>
                            </b-row>
                            <b-row align-v="center" align-h="center" class="bingo-card-player-row">
                                <b-col
                                    v-for="(item, position) in getBingoValues"
                                    :key="position"
                                    class="item"
                                    cols="3"
                                >
                                    <div class="item letra texto bingo-card-player-col">
                                        <div class="substantivo_comum medium">
                                            <div class="card-input card--radio-input" :class="$attrs.class">
                                                <label>
                                                    <b-card
                                                        no-body
                                                        :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                                    >
                                                        <b-card-body
                                                            style="background-color: white"
                                                        >
                                                            <div class="bingo-word-player-item">
                                                                {{ item.text }}
                                                            </div>
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
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>                        
                    </ls-card-display>
                    <ls-card-display
                        v-for="i in 2" :key="i"
                        class="bingo-card"
                        :valid="loseCounter[i-1]==4"
                    >
                        <b-row align-v="center" align-h="center" class="bingo-card-row">
                            <b-col
                                v-for="word in words[i-1]"
                                :key="word"
                                class="item"
                            >
                                <div class="item letra">
                                    <div class="substantivo_comum medium">
                                        <ls-card-display                                            
                                            :valid="searchString(raffleWords, word)"  
                                            class="bingo-card-word"                              
                                        >
                                            {{ word }}
                                        </ls-card-display>
                                    </div>
                                </div>
                            </b-col>
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
import AsyncImage from '@ui/AsyncImage'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import moment from 'moment'
import { setTimeout } from 'timers'
import Activity from '@/store/modules/Activity'
import Bingo from '@/components/ui/activities/begin/games/Bingo'

export default {
    components: {
        ...ui,
        ...alerts,
        AsyncImage
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
            animateBingoCounter: false,
            loseCounter: [0,0],
            isCounter: true,
            isWordBingo: false,
            playerWordsCounter: 0
        }
    },
    computed:{
        getBingoValues(){
            return filter(this.getValues, value => value.key_id)
        },
        // retorna as imagens da roleta e do painel interno
        bingoRoulette() {
            return require('@/assets/images/components/bingo/globo-bingo.png')
        },
        bingoCounter(){
            return require('@/assets/images/components/bingo/painel-bingo.png')
        },
        // ajusta o formato em que o horário será exibido
        getDuration(){
            return moment(this.timer).format('m:ss')
        },
        ...mapState('Activity', ['log'])
    },
    watch: {
        showTimer() {
            if(this.isCounter){
                this.animateBingoCounter = true
            }
            this.isCounter = !this.isCounter
            this.timeOut = setTimeout(() => {
                this.animateBingoCounter = false
            },1000)
        },
    },
    created(){
        this.words = [[],[]]
        // coloca o valores da cartela do jogador num vetor
        for(let i = 0; i < this.getKeys.length; i++){
            this.unraffleWords.push(this.getKeys[i].text)
            this.scramblePlayerWords.push(this.getKeys[i].text)
            this.playerWords.push(Object.assign({}, this.getKeys[i]))
        }
        // pega os valores e os joga numa matriz de palavras
        this.scramblePlayerWords = shuffle(this.scramblePlayerWords)
        for(let i = 0; i < this.getValues.length; i++){
            if(this.getValues[i].text.length > 4){
                this.isWordBingo = true
            }            
            if(i < this.activity.total_correct_items){
                this.words[0].push(this.getValues[i].text)
            }else{
                this.words[1].push(this.getValues[i].text)
            }
            if(!this.searchString(this.unraffleWords, this.getValues[i].text)){
                this.unraffleWords.push(this.getValues[i].text)
            }
        }
        this.unraffleWords = shuffle(this.unraffleWords)
        this.allWords = this.unraffleWords.slice()
        this.actualizeBingoTimer()
    },
    mounted() {
        this.createAnswersArray()
    },    
    methods: {
        checkAIWords(word) {
            if (this.searchString(this.words[0],this.actualRaffleWord)){
                this.raffle(word)
                this.loseCounter[0]++
                if(this.loseCounter[0] == 4){
                    this.activity.pointings[0].quantity = 10
                    this.triggerSuccess()
                }
            } 
            if (this.searchString(this.words[1],this.actualRaffleWord)){
                this.raffle(word)
                this.loseCounter[1]++
                if(this.loseCounter[1] == 4){
                    this.activity.pointings[0].quantity = 10
                    this.triggerSuccess()
                }
            }
        },
        isCheck(item){
            return false
        },
        checkRaffle (item) {
            // caso o item já tenha sido checado, retornamos aqui mesmo
            if(item.valid || item.invalid) return
            //testa se o item já pode ser marcado na cartela do jogador
            if(this.searchString(this.scramblePlayerWords, item.text)){
                this.playerWordsCounter++
                this.actualizeBingoTimer()

                if (this.playerWordsCounter < this.scramblePlayerWords.length) {
                    setTimeout(()=> {
                        this.checkAIWords(item.text)
                    }, 1000)
                }

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
            this.raffleWords.push(word)
        },
        searchString(arr, str) {
            for(let i = 0; i < arr.length; i++){
                if (arr[i].match(str)) return true
            }
            return false
        },
        actualizeBingoTimer(){
            // decresce o contador até zero
            if(this.unraffleWords.length > 0){
                if(this.timer > 0){
                    setTimeout(() => {
                        this.timer -= 1000
                        this.actualizeBingoTimer()
                    },1000)
                }
                // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
                else if (this.showTimer){     
                    // sorteia aleatoriamente uma das palavras sorteáveis                
                    const wordIndex = Math.floor(Math.random()*this.unraffleWords.length)
                    const word = this.unraffleWords[wordIndex]
                    this.unraffleWords.splice(wordIndex,1)
                    this.actualRaffleWord = word

                    if (this.searchString(this.scramblePlayerWords, word)) {
                        this.showTimer = false
                        this.timer = 5000

                    } else {
                        this.checkAIWords(word)
                        this.showTimer = false
                        this.timer = 5000
                        this.actualizeBingoTimer()
                    }
                }
                // quando chega a zero, e exibindo o contador, ele seleciona aleatoriamente uma letra do alfabeto
                else if(this.playerWordsCounter < this.scramblePlayerWords.length) {
                    this.showTimer = true
                    this.timer = 5000
                    this.actualizeBingoTimer()
                }
            }

        },
        ...mapActions('Activity', ['setActivityAttrs','setAnswer','triggerSuccess'])
    },    
}
</script>

<style lang="scss" scoped>
.item .letra.texto [class*='card--'], .item .letra.texto .draggshadow {
    width: auto;
}
</style>
