<template>
    <div class="container-fluid">
        <b-row align-v="center">
            <b-col cols="3" align-v="center" align-h="center">
                <b-row class="bingo-container" align-v="center" align-h="center">
                    <img class="bingo-roulette" :src="bingoRoulette" alt="">                  
                    <img class="bingo-panel" :src="bingoCounter" alt="">
                    <div 
                        class="bingo-counter"
                    >
                        <h2>{{ getDuration }}</h2>
                    </div>                    
                </b-row>                
                <b-row align-h="start">
                    <div
                        v-for="word in unraffleWords"
                        :key="word"
                        class="bingo-word" 
                    >
                        {{ word }}
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
                                v-for="(item, position) in getKeys" 
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
import Activity from '../../../../../store/modules/Activity';

export default { 
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            words: [],
            unraffleWords: [],
            raffleWords: [],
            timer: 5000,
            showTimer: true
        }
    },
    computed:{
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
    created(){
        // pega os valores e os joga numa matriz de palavras
        this.words = [[],[]]   
        for(let i = 0; i < this.getKeys.length; i++){
            this.unraffleWords.push(this.getKeys[i].text)            
        }      
        this.unraffleWords = shuffle(this.unraffleWords)
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
        this.actualizeBingoTimer();
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        checkRaffle (item) {    
            // caso o item já tenha sido checado, retornamos aqui mesmo
            
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
                else {
                    this.showTimer = true;
                    this.timer = 5000;
                    this.actualizeBingoTimer();
                }
            }
                  
        },
    },
    ...mapActions('Activity', ['setActivityAttrs','setAnswer'])
}
</script>

<style lang="scss">    
@import '~animate-scss/_properties';
@import '~animate-scss/_attention-seekers/attention-seekers';
.bingo-container{
    display: flex;
    flex-flow: column;
    margin: 140px 0 150px 0;
    
}
.bingo-roulette{
    position: fixed;        
    z-index: 0;
}
.bingo-panel{
    position: fixed;
    margin-top: 2px;
    z-index: 1;
}
.bingo-counter{
    position: fixed;
    margin-top: 4px;
    z-index: 2;    
        &.bingo-counter-animation{
        @include rubberBand;
    }
}
.bingo-card{
    width: 800px;
    margin: 3px 0 3px 30px;
}
.bingo-card-player .card-body{
    background-color: #ffb141;       
}
.bingo-card-letter{        
    margin: -5px 5px -5px 5px;
}   
.bingo-card-letter .card-body{
    background-color: white;
}    
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
    &.bingo-raffle-letter{
        background-color: #13c5c4;
    }
}

</style>
