<template>
    <b-container>
        <br><br><br><br>
        <b-row align-v="start">
            <b-col cols="3" align-v="center" align-h="center">
                <div>                   
                    <div v-for="bingoLetter in alphabet" :key="bingoLetter" :class="{bingoLetter, bingoRaffleLetter: searchString(raffleLetters,bingoLetter)}" @click="raffle(bingoLetter)">
                        {{ bingoLetter }}
                    </div>
                </div>                
            </b-col>
            <b-col cols="9" align-v="center" align-h="center">
                <b-row v-for="item in getValues" :key="item" :sm="valueColSize" :class="{bingoCardPlayer: item === getValues[0]}">
                    <ls-card-display v-if="item !== getValues[3]">
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
                                    <ls-card-display v-for="letter in item.text" :key="letter" style="margin-left: 10px">
                                        {{ letter }}
                                    </ls-card-display>                                    
                                </b-row>                       
                            </b-col> 
                        </b-row>
                    </ls-card-display>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {    
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            alphabet: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            raffleLetters: []
        }
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
    .bingoCardPlayer .card-body{
        background-color: #ffb141;
    }
    .bingoCardLetter{
        width: 600px;
        padding: 0 10px 0 10px;
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
    .bingoCardLetter .card-body{
        background-color: white;
    }
</style>

