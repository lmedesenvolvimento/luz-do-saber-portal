<template>
    <div class="container-fluid">
        <b-row align-v="center">
            <b-col sm="4">
                <async-image
                    :src="getKeys[0].images[0].url"
                    :alt="getKeys[0].text"
                />
            </b-col>
            <b-col sm="8">
                <b-row>
                    <div
                        v-for="(letter, index) in keyLetters"
                        :key="index"
                        class="item"
                        style="margin-right: 10px"
                    >
                        <div class="letra texto" :class="activity.item_template.key.font_size">
                            <ls-card-display>
                                <div :class="{'invisible' : !searchString(raffle,letter)}">
                                    {{ notNormalizedLetters[index] }}
                                </div>                                
                            </ls-card-display>
                        </div>
                    </div>
                </b-row>
            </b-col>
        </b-row>
        <div>
            <b-row class="alphabet" align-v="center">
                <div
                    v-for="(item, position) in alphabetInputs"
                    :key="position"
                    class="item"
                >
                    <div class="letra texto medium">
                        <div class="card-input card--radio-input" :class="$attrs.class">
                            <label>
                                <b-card
                                    no-body
                                    :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                >
                                    <b-card-body
                                        :style="isChecked(item) ? {backgroundColor: item.color, color: '#FFFFFF'} : {}"
                                    >
                                        {{ item.letter }}
                                    </b-card-body>
                                </b-card>

                                <input
                                    v-model="item.selected"
                                    type="checkbox"
                                    class="invisible"
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
import AsyncImage from '@ui/AsyncImage'
import ui from '@/components/ui'
import { alphabet_with_acents } from '@/constants'
export default {
    components: {
        ...ui,
        AsyncImage
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            alphabetInputs: [],
            keyLetters: [],
            notNormalizedLetters: [],
            keyIds: [],
            raffle: []
        }
    },
    mounted() {
        this.createAnswersArray()
        // coloca uma assinatura nos botões criados dentro da fase
<<<<<<< HEAD
        let i = 0
        this.alphabet_1.forEach((letter) => {
            let color = this.getColorsArray[i]
            this.alphabetInputs_1.push(Object.assign({}, {letter, color}))
            i++
        })
        this.alphabet_2.forEach((letter) => {
            let color = this.getColorsArray[i]
            this.alphabetInputs_2.push(Object.assign({}, {letter, color}))
            i++
        })
=======
        alphabet_with_acents.forEach((letter, index) => {
            let color = this.getColorsArray[index]
            this.alphabetInputs.push(Object.assign({}, {letter, color}))
        })        
>>>>>>> master
        // define quais botões terão as respostas corretas
        for(let i = 0; i < this.activity.total_correct_items; i++){
            this.keyLetters.push(this.getKeys[0].letters[i].text)
            this.notNormalizedLetters.push(this.getKeys[0].letters[i].text)
            this.keyIds.push(this.getKeys[0].value_ids[i])
        }       
        this.controlCorrectItems()
    },
    methods: {        
        // impede que o mesmo botão seja checado 2 ou mais vezes
        isChecked(item){
            if(item.valid || item.invalid) return false
            return true
        },
        // ajusta o número de items corretos baseado nas letras que se repetem
        controlCorrectItems(){
            let noRepeatLetters = []
            this.keyLetters.forEach(letter => {
                if(!this.searchString(noRepeatLetters, letter)){
                    noRepeatLetters.push(letter)
                }                
            })
            this.setActivityAttrs({ total_correct_items: noRepeatLetters.length })
            // this.activity.total_correct_items = noRepeatLetters.length;
            
        },
        // faz a validação de um objeto criado na própria fase
        checkValid(item){
            if(item.valid || item.invalid) return
            if(this.searchString(this.keyLetters, item.letter)){
                item.valid = true
                this.raffle.push(item.letter)
                this.setAnswer({
                    type: 'value',
                    data: this.keyIds[0],
                    vm: this
                })
                this.keyIds.shift()
            }else {
                item.invalid = true
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
            }

        },  
        // procura se uma string está contida em outra string
        searchString(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if (arr[i].match(str)) return true
            }
            return false
        },
        ...mapActions('Activity', ['setActivityAttrs','setAnswer'])
    },
}
</script>

<style lang="scss" scoped>
.alphabet{
    .letra{
        margin: auto 8px;
    }    
}
</style>


