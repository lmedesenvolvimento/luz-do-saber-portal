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
                        <h2 v-else>{{ actualRaffleLetter }}</h2>
                    </div>                    
                </b-row>                
                <b-row align-h="start">                   
                    <div 
                        v-for="bingoLetter in alphabet"
                        :key="bingoLetter"
                        class="bingo-letter" 
                        :class="{'bingo-raffle-letter': searchString(raffleLetters,bingoLetter)}" 
                    >
                        <h4>{{ bingoLetter }}</h4>                        
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
                                v-for="(item, position) in playerLetters" 
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
                </b-row>
                <b-row 
                    v-for="i in (getValues.length - 2)" 
                    :key="i"
                >
                    <ls-card-display 
                        class="bingo-card" 
                        :valid="searchStringInArray(raffleLetters, normalizeString(getValues[i].text).split(''))"                       
                    >                        
                        <b-row align-v="center" align-h="center">
                            <b-row
                                v-for="(item, position) in getValues[i].letters" 
                                :key="position" 
                                :sm="valueColSize"
                                class="item bingo-card-letter"
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
import Bingo from '@ui/activities/begin/games/Bingo'
export default {
    mixins:[Bingo]
}
</script>

<style>

</style>
