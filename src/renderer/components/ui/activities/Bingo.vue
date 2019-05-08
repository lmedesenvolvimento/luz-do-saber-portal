<template>
    <div class="container-fluid">        
        <b-row align-v="center">
            <b-col cols="3" align-v="center" align-h="center">
                <div class="title">{{ getDuration }}</div>
                <!-- <ls-timer></ls-timer> -->
                <div>                   
                    <div v-for="bingoLetter in alphabet" :key="bingoLetter" :class="{bingoLetter, bingoRaffleLetter: searchString(raffleLetters,bingoLetter)}" @click="raffle(bingoLetter)">
                        {{ bingoLetter }}
                    </div>
                </div>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center" style="max-height: 100%;overflow: auto;">
                <b-row v-for="item in getValues" :key="item" :sm="valueColSize" :class="{bingoCardPlayer: item === getValues[0]}">
                    <ls-card-display>
                        <b-row v-if="item === getValues[0]" align-v="center" align-h="center" style="margin: 10px">
                            <p>sua cartela</p>
                        </b-row>
                        <b-row> 
                            <b-col>
                                <b-row v-if="item === getValues[0]" class="bingoCardLetter" align-v="center" align-h="center">
                                    <ls-card-input v-for="letter in item.text" :key="letter" style="margin-left: 10px">
                                        {{ letter }}
                                    </ls-card-input>                                    
                                </b-row>
                                <b-row v-else class="bingoCardLetter" align-v="center" align-h="center">
                                    <ls-card-display v-for="letter in item.text" :key="letter" :class="{bingoCardRaffleLetter: searchString(raffleLetters, letter)}" style="margin-left: 10px">
                                        {{ letter }}
                                    </ls-card-display>                                    
                                </b-row>                       
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
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import moment from 'moment'
import { setInterval, clearInterval, clearImmediate } from 'timers'

export default {    
    components: { 
        ...ui,
        ...alerts,
        // 'ls-timer': require('@/components/ui/helpers/Timer').default
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            raffleLetters: [],
            timer: null
        }
    },
    computed: {
        getDuration(){
            let totalSeconds = (this.log.timer.totalSeconds * 1000)
            return moment(totalSeconds).format('s')
        },
        ...mapState('Activity', ['log'])
    },
    created(){
        this.timer = 10
    },
    beforeDestroy(){
        clearInterval(this.timer)
    }, 
    mounted() {
        this.createAnswersArray()
    },
    methods: {       
        raffle(letter) {
            this.raffleLetters.push(letter);
        },
        searchString(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if (arr[i].match(str)) return true;
            }
            return false;
        },
        ...mapActions('Activity', ['setActivityAttrs', 'incrementTimer'])
    },    
}
</script>

<style>
    .bingoCardPlayer .card-body{
        background-color: #ffb141;
    }
    .bingoCardLetter{
        width: 600px;
        padding: 0 10px 0 10px;
    }
    .bingoCardLetter .card-body{
        background-color: white;
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

