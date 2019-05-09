<template>
    <div class="container-fluid">        
        <b-row align-v="start">
            <b-col cols="3" align-v="center" align-h="center">
                <div class="bingoCounter">
                    <h2>{{ getDuration }}</h2>
                </div>
                <div>                   
                    <div v-for="bingoLetter in alphabet" :key="bingoLetter" :class="{bingoLetter, bingoRaffleLetter: searchString(raffleLetters,bingoLetter)}" @click="raffle(bingoLetter)">
                        {{ bingoLetter }}
                    </div>
                </div>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
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
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            raffleLetters: [],
            timer: 10000
        }
    },
    computed: {
        getDuration(){           
            return moment(this.timer).format('m:ss')
        },
        ...mapState('Activity', ['log'])
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
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>

<style>
    .bingoCounter{
        color: #13c5c4;
        border: solid 4px;
        text-align: center;
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
    }
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

