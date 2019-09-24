<template>
    <div id="complete-sentence" class="container-fluid">
        <b-row v-if="activity.total_correct_items == 1" align-v="center" align-h="center" class="activity-keys"> 
            <h2>   
                <span v-for="(s, position) in splitedSentence" :key="position" style="display: inline-block">
                    <span v-if="!searchString(hiddenElements, s)" class="sentence">{{ s.text }}</span>
                    <span v-else class="item">                             
                        <div class="validate-icon-top" :class="activity.item_template.value.font_size">
                            <ls-card-droppable
                                :item="s"
                                :type="'key'"
                                :template="activity.item_template.key"
                            >
                            </ls-card-droppable>
                        </div>                              
                    </span>
                </span>
            </h2>
        </b-row>    
        <b-row v-else class="activity-keys" align-v="center" align-h="center">
            <div v-if="getKeys.length === 1 && activity.item_template.key.type === 'audio'">
                <Item 
                    v-if="answers"
                    :item="getKeys[0]"
                    :type="'key'"
                    :template="activity.item_template.key"
                />
            </div>
            <b-row v-else align-h="center">
                <span v-for="(item, position) in splitedSentence" :key="position" class="item sentence">
                    <div class="validate-icon-top" :class="[activity.item_template.value.font_size, inputSize(item.text)]">
                        <ls-card-droppable
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                            :custom-validate="customValidate"
                        >
                            <template slot="transfer-data">
                                {{ item.transferData ? item.transferData.text : item.text }}
                            </template>
                        </ls-card-droppable>
                    </div>
                </span>
            </b-row>
        </b-row>
        <b-row v-if="getKeys.length === 1 && activity.item_template.key.type === 'audio'" class="activity-values">               
            <b-col
                v-for="(item, position) in splitedSentence"
                :key="item.id"
                class="item"
                md="auto"
            > 
                <div v-if="item.isInteractive === true" :class="[activity.item_template.value.font_size, inputSize(item.text)]" class="validate-icon-top">  
                    <div class="card-input card--input-text">
                        <label>
                            <b-card
                                no-body
                                :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                            >
                                <b-card-body>
                                    <input
                                        id="input-name"
                                        type="value"
                                        maxlength="13"
                                        @blur="checkAwnser(...arguments, item, position)"
                                    />
                                </b-card-body>
                            </b-card>
                        </label>
                    </div>
                </div>
                <div v-else :class="activity.item_template.value.font_size"> 
                    <div class>
                        {{ item.text }}
                    </div>
                </div>        
            </b-col>
        </b-row>
        <b-row v-else class="activity-values">
            <ls-card-display id="container-display">
                <b-row>                
                    <b-col
                        v-for="item in activity.items.values"
                        :key="item.id"
                        class="item"
                    >         
                        <Item                                                        
                            :item="item"                                                            
                            :type="'value'"                            
                            :template="activity.item_template.value"
                        >                        
                        </Item>               
                    </b-col>
                </b-row>
            </ls-card-display>    
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { clone, findIndex } from 'lodash'
import { setTimeout } from 'timers'

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            hiddenElements: [],
            sentence: '',
            splitedSentence: [],
            allSentenceInteractive: false
        }
    },
    mounted() {
        this.createAnswersArray(),
        this.sentence = this.getKeys[0].text
        if(this.activity.total_correct_items == 1){
            this.uniqueCorrectItem()
        } else {
            this.multipleCorrectItem()
        }
    },    
    methods: {        
        splitSentence(arr, str){
            for (let i = 0; i < arr.length; i++){
                if(str.indexOf(arr[i].text) != -1){
                    let sentences = {
                        text: this.sentence.split(arr[i].text)[0]
                    }
                    this.splitedSentence.push(Object.assign({},sentences))
                    sentences = {
                        text: arr[i].text,
                        value_ids: this.getKeys[0].value_ids
                    }
                    this.splitedSentence.push(Object.assign({},sentences))                                  
                    this.sentence = this.sentence.split(arr[i].text)[1]
                }
            }
            
        },
        searchString(arr, str){
            for(let i = 0; i < arr.length; i++){
                if(arr[i].text == str.text) return true
            }            
            return false
        },
        uniqueCorrectItem(){
            if (this.sentence.includes('?'))
                this.sentence = this.sentence.replace('?', ' ?')
            let values = this.getValues
            values.forEach(element => {    
                let hiddenElement = {
                    text: element.text
                }       
                this.hiddenElements.push(hiddenElement)
            })
            this.splitSentence(this.hiddenElements, this.sentence)        
            let sentences = {
                text: this.sentence
            }
            this.splitedSentence.push(Object.assign({}, sentences))
        },
        multipleCorrectItem(){
            this.sentence = this.sentence.replace(/,/g, '')//removendo vírgulas da frase para não aparecerem nos inputs, nem atrapalharem na hora de separá-la por espaços
            this.sentence = this.sentence.split(' ')//separando as palavras da frase em um vetor
            let words = []//
            let values = clone(this.getValues)
            this.sentence.forEach((word, w) => {
                let objectWord = {
                    text: word,
                    isInteractive: false,
                }
                words.push(Object.assign({}, objectWord))
            })
            if (words.length === values.length){//se o array de keys e values for do mesmo tamanho, então toda a frase vai ser substituída
                this.allSentenceInteractive = true
                this.splitedSentence = this.makeCompleteSentence(words, values)
            } else {
                this.splitedSentence = this.getSplitedSentence(words, values)
            }
        },
        getSplitedSentence(words, values){
            let splitedSentence = [] //array que vai ser retornado no fim da função
            let lastPosition = 0 //última posição a ser encontrada de interação (input ou draggable)
            values.forEach((value, index) => { //percorrendo o vetor que contém todos os values qeu serão interagíveis
                let indexOfWord = findIndex(words, {text: value.text}) //busca uma correspondência do texto do value no do momento dentro do vetor com a frase inteira
                if (indexOfWord !== -1){//se ela existir
                    words[indexOfWord] = value //transforma o antigo valor no value correspondente
                    words[indexOfWord].isInteractive = true//define q é interativo para renderizar como item
                    if (!this.allSentenceInteractive){//se a frase toda não for interagível, temos que juntar numa string só as palavras anteriores
                        this.joinNonInteractiveWords(words, splitedSentence, lastPosition, indexOfWord)
                        lastPosition = indexOfWord + 1 //guardamos onde foi o último lugar que encontramos a palavra interagível 
                    }
                    splitedSentence.push(words[indexOfWord])//adicionamos a palavra que encontramos no vetor que será renderizado
                }
                if (index === values.length-1 && !this.allSentenceInteractive){
                    //quando chegar ao final da frase e não for uma frase que deve ser completamente preenchida pelo usuário
                    //é preciso adicionar o resto da frase, já que a código para na última interação
                    this.joinNonInteractiveWords(words, splitedSentence, lastPosition, words.length)
                }
            })
            return splitedSentence
        },
        makeCompleteSentence(words, values){
            let sentence = []
            words.forEach(word => {
                let indexOfWord = findIndex(values, {text: word.text}) //busca uma correspondência do texto do value no do momento dentro do vetor com a frase inteira
                if (indexOfWord !== -1){//se ela existir
                    word = values[indexOfWord] //deixa a palavra com o mesmo
                    word.isInteractive = true//importante para a renderização
                    values.splice(indexOfWord, 1)//remove a palavra do vetor que estamos checando, pois se houver palavras iguais, o findIndex só retornará a primeira
                }
                sentence.push(word)
            })
            return sentence
        },
        joinNonInteractiveWords(words, splitedSentence, lastPosition, indexOfWord){
            let newWord = words.slice(lastPosition, indexOfWord)
            let sentence = newWord.map((w) => w.text).join(' ')
            splitedSentence.push({text: sentence})
        },
        customValidate(transferData, nativeElement, vm){
            Vue.set(vm.item, 'transferData', transferData)
            
            if (vm.item.transferData.id === vm.item.id){
                vm.valid = true
                transferData.valid = true

                vm.setAnswer({
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
            }else {                
                vm.item.incorrect = true
                vm.invalid = true

                transferData.invalid = true

                vm.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })

                setTimeout(() => {
                    Vue.set(vm.item, 'transferData', null)
                }, 1000)
            }
        },
        checkAwnser(event, item, position) {
            const updates = clone(this.splitedSentence)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase()){
                this.setAnswer({
                    type: 'value',
                    data: item.id,
                    vm: {}
                })
                if (this.$refs[position+1]!=null)
                    this.$refs[position+1][0].focus()
                updates[position].valid = true
                event.target.disabled = true
            } 
            else {
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: {}
                })
                updates[position].invalid = true
                this.removeInvalid(item, 1, position)
            }
            Vue.set(this, 'splitedSentence', updates)
        },
        removeInvalid(item, time, position){
            setTimeout(()=> {
                const updates = clone(this.splitedSentence)
                updates[position].invalid = false
                Vue.set(this, 'splitedSentence', updates)
            }, time * 500)
        },
        inputSize(text){
            if (text.length < 2){
                return 'letra'
            } else if (text.length < 4) {
                return 'silaba'
            } else {
                return 'substantivo_comum'
            }
        },
        ...mapActions('Activity', ['setAnswer'])
    }
}
</script>

<style lang="scss">
    #complete-sentence{
        .sentence{
            margin: 0px 6px;
        }
        .activity-keys{
            padding: 0;
        }
        .activity-values{
            justify-content: center;
        }
        .card-input.card--droppable .card .card-body{
            max-height: 55px;
        }
        
        .card-input.card--draggable 
        {
            width: 105%;
            .card .card-body{
                max-height: 55px;
                padding: 1rem !important;
            }
        }
        .card--display .card .card-body{
            padding: 1.5rem;
        }
        .card-input.draggshadow{
            width: auto;
            .card .card-body{
                max-height: 55px;
                padding: 1rem !important;
            }
        }
        .silaba{
            max-width: 78px;
            .card-input.card--draggable .card .card-body{
                color: #5F4343 !important;
                background-color: #fff !important;
            } 
        }
        .substantivo_comum{
            max-width: 138px;
        }
        .letra{
            max-width:58px;
            .card-input.card--draggable .card .card-body{
                color: #5F4343 !important;
                background-color: #fff !important;
            } 
        }

    }
</style>
