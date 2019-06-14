<template>
    <div class="container-fluid">
        <b-row align-h="center">
            <b-col>
                <img 
                    :src="getKeys[0].images[0].url" 
                    alt=""
                >
            </b-col>
            <b-col
                v-for="(letter, index) in getKeys[0].text" 
                :key="index"
                :sm="1"
                class="item"
            >
                <div class="letra">
                    <ls-card-display>
                        {{ letter }}
                    </ls-card-display>
                </div>
            </b-col>  
        </b-row>
        <b-row
            sm="1"
        >
            <b-col
                v-for="(item, position) in alphabetInputs"
                :key="position"  
                :sm="1"
                class="item"
            >
                <div class="letra">
                    <div class="card-input card-radio-input" :class="$attrs.class">
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
                                class="input"    
                                type="checkbox"
                                true-value="valid"
                                false-value="invalid"
                                :name="`input-${position}`"
                                @change.stop="checkValid(item)"
                            />
                        </label>
                    </div>
                </div> 
            </b-col>
        </b-row>        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { setTimeout } from 'timers'
export default {
    components: { 
        ...ui
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            alphabetInputs: [],
            keyLetters: [],
        }
    },
    mounted() {
        this.createAnswersArray()
        this.addColorsToType('substantivo_comum')
        this.alphabet.forEach((letter) => {
            this.alphabetInputs.push(Object.assign({}, letter))
        })  
        this.getKeys[0].letters.forEach((letter) => {
            this.keyLetters.push(letter.text)
        })    
    }, 
    methods: {
        checkValid(item){
            if(item.valid || item.invalid) return
            if(this.searchString(this.keyLetters, item[0])){
                item.valid = true
                
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
    }
       
}
</script>

<style>

</style>


