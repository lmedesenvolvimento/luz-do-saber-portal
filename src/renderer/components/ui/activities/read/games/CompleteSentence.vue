<template>
    <div id="complete-sentence" class="container-fluid">
        <b-row v-if="activity.total_correct_items == 1" align-v="center" align-h="center" class="activity-keys"> 
            <h2>   
                <span v-for="(s, position) in splitedSentence" :key="position" style="display: inline-block">
                    <span v-if="!searchString(hiddenElements, s)" class="sentence">{{ s.text }}</span>
                    <span v-else>                             
                        <div class="item">
                            <ls-card-droppable
                                class="letra"
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

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            hiddenElements: [],
            $refsInput: [],
            sentence: '',
            splitedSentence: [],  
        }
    },
    mounted() {
        this.createAnswersArray(),
        this.sentence = this.getKeys[0].text
        if(this.activity.total_correct_items == 1){
            this.uniqueCorrectItem();
        } else {
            this.multipleCorrectItem();
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
            words.forEach(word => {
                let objectWord = {
                    text: word,
                    hasInput: false,
                    value_ids: this.getKeys[0].value_ids
                }
                aux.push(Object.assign({}, objectWord))
            })
            let lastPosition = 0      
            aux.forEach((word, i, ss) => {
                word.value_ids = [];
                this.getValues.forEach((value, v, values) => {
                    if(word.text == value.text){
                        ss[i] = value;
                        ss[i].hasInput = true;
                        ss[i].valid = false;
                        if (ss.length !== values.length){
                            let aux2 = []
                            for (let j = lastPosition; j < i; j++){
                                if (ss[j].hasInput == false)
                                    aux2.push(ss[j])
                            }
                            lastPosition = i+1;
                            aux2 = aux2.reduce( function( prevVal, elem ) {
                                return prevVal + ' ' + elem.text;
                            },'');
                            aux2 = aux2.substr(1);
                            this.splitedSentence.push(aux2)
                        }
                        this.splitedSentence.push(ss[i])
                    }
                })
            })
        },
        customValidate(transferData, nativeElement, vm){
            this.dataTransfer = transferData
            if (this.dataTransfer.id === vm.item.id){
                vm.valid = true;
                transferData.valid = true
                vm.setAnswer({
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
            }else{
                vm.item.incorrect = true;
                vm.invalid = true;
                vm.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
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
            }, time * 1000)
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
        .card-input.card--input-text{
            // max-width: 130px;
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
            width: auto;
            max-width: 100%;
            .card .card-body{
                max-height: 55px;
                padding: 1rem !important;
            }
        }
        .card-input.draggshadow{
            width: auto;
            max-width: 100%;
            .card .card-body{
                max-height: 55px;
                padding: 1rem !important;
            }
        }
        .silaba{
            max-width: 74px;
            height: auto;
        }
        .substantivo_comum{
            max-width: 185px;
            height: auto;
        }
        .letra{
            max-width:58px;
            height: auto;
        }
    }
</style>
