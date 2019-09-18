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
                <div v-if="item.hasInput === true" :class="[activity.item_template.value.font_size, inputSize(item.text)]" class="validate-icon-top">  
                    <div class="card-input card--input-text">
                        <label>
                            <b-card
                                no-body
                                :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                            >
                                <b-card-body>
                                    <input
                                        id="input-name"
                                        :ref="position"
                                        type="value"
                                        maxlength="13"
                                        @blur="checkAwnser(...arguments, item, position)"
                                    />
                                </b-card-body>
                            </b-card>
                        </label>
                    </div>
                </div>
                <div v-else>
                    {{ item }}
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
import { clone } from 'lodash'
import { setTimeout } from 'timers';

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            hiddenElements: [],
            $refsInput: [],
            sentence: '',
            splitedSentence: [],  
            dataTransfer: null,
            values_ids: [],
        }
    },
    mounted() {
        this.createAnswersArray(),
        this.sentence = this.getKeys[0].text
        this.values_ids = this.getKeys[0].value_ids
        if(this.activity.total_correct_items == 1){
            this.uniqueCorrectItem()
        } else {
            this.multipleCorrectItem()
        }
        // console.log(this.splitedSentence);
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
            return false;
        },
        uniqueCorrectItem(){
            this.getValues.forEach(element => {    
                let hiddenElement = {
                    text: element.text
                }       
                this.hiddenElements.push(hiddenElement)
            });
            this.splitSentence(this.hiddenElements, this.sentence)        
            let sentences = {
                text: this.sentence
            }
            this.splitedSentence.push(Object.assign({}, sentences))
        },
        multipleCorrectItem(){
            let words = this.sentence.split(' ')
            let aux = []         
            let getValues = this.getValues
            words.forEach((word, w) => {
                let objectWord = {
                    text: word,
                    hasInput: false,
                    id: w
                }
                aux.push(Object.assign({}, objectWord))
            })
            let lastPosition = aux.length;
            for (let i = 0; i < aux.length; i++){
                console.log('to olhando a palavra '+aux[i].text+' na posição '+i)
                for (let j = 0; j < getValues.length; j++){
                    if (aux[i].text === getValues[j].text){
                        console.log('achei '+aux[i].text+'['+i+']. Ele tava na posição '+j)
                        this.splitedSentence.push(aux[i])
                        getValues.splice(j, 1)
                        console.log(getValues)
                        break;
                    } else {
                        console.log(getValues[j].text+'['+j+'] Não é '+aux[i].text)
                    }
                }
                console.log('');
            }
        },
        customValidate(transferData, nativeElement, vm){
            Vue.set(vm.item, 'transferData', transferData)
            
            if (vm.item.transferData.id === vm.item.id){
                vm.valid = true;
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
        }
        .substantivo_comum{
            max-width: 138px;
        }
        .letra{
            max-width:58px;
        }

    }
</style>
