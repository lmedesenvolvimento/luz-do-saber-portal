<template>
    <div class="container-fluid">        
        <b-row align-v="center">
            <b-col sm="4">
                <img 
                    :src="getKeys[0].images[0].url" 
                    alt=""
                >
            </b-col>
            <b-col sm="8">
                <b-row align-h="between">
                    <div 
                        v-for="(letter, index) in keyLetters" 
                        :key="index"
                        class="item"
                    >
                        <div class="letra">
                            <ls-card-display>
                                <div v-if="searchString(raffle,letter)">
                                    {{ letter }}
                                </div>
                                <div v-else>
                                    _
                                </div>                      
                            </ls-card-display>
                        </div>                    
                    </div>
                </b-row>                
            </b-col>  
        </b-row>            
        <div>
            <b-row v-for="i in 2" :key="i" align-h="between" align-v="center">
                <div
                    v-for="(item, position) in alphabetInputs(i)"
                    :key="position"                 
                    class="item"     
                >
                    <div>
                        <div class="card-sm letra card-input card-radio-input" :class="$attrs.class">
                            <label>
                                <b-card 
                                    no-body
                                    :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                >
                                    <b-card-body>
                                        {{ item[0] }}
                                    </b-card-body>
                                </b-card>

                                <input
                                    v-model="item.selected"                                           
                                    
                                    type="checkbox"
                                    true-value="valid"
                                    false-value="invalid"
                                    :name="`input-${position}`"
                                    @change.stop="checkValid(item)"
                                />
                            </label>
                        </div>
                    </div> 
                </div>
            </b-row>
        </div>   
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { setTimeout } from 'timers'
import { watch } from 'fs';
export default {
    components: { 
        ...ui
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            alphabet_1: ['A','B','C','D','E','F','G','H','I','J','K','L','M'],
            alphabet_2: ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            alphabetInputs_1: [],
            alphabetInputs_2: [],
            keyLetters: [],
            keyIds: [],
            raffle: []
        }
    },     
    mounted() {
        this.createAnswersArray()
        this.addColorsToType('letra')
        this.alphabet_1.forEach((letter) => {
            this.alphabetInputs_1.push(Object.assign({}, letter))
        })
        this.alphabet_2.forEach((letter) => {
            this.alphabetInputs_2.push(Object.assign({}, letter))
        })  
        for(let i = 0; i < this.activity.total_correct_items; i++){
            this.keyLetters.push(this.getKeys[0].letters[i].text)
            this.keyIds.push(this.getKeys[0].value_ids[i])
        }
    }, 
    methods: {
        alphabetInputs (index) {
            if (index == 1) return this.alphabetInputs_1            
            return this.alphabetInputs_2            
        },
        checkValid(item){
            if(item.valid || item.invalid) return
            if(this.searchString(this.keyLetters, item[0])){
                item.valid = true
                this.raffle.push(item[0])
                this.setAnswer({ 
                    type: 'value', 
                    data: this.keyIds[0],
                    vm: this
                })
                this.keyIds.shift();
            }else { 
                item.invalid = true
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })
            }
            
        },
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

</style>


