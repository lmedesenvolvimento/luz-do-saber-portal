<template>
    <div class="container-fluid">
        <b-row v-if="activity.total_correct_items == 1" align-v="center" align-h="center"> 
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
        <b-row v-else align-v="center" align-h="center">
            <span v-for="(item, position) in splitedSentence" :key="position" class="sentence" style="display: inline-block">
                <div class="item">
                    <ls-card-droppable
                        class="letra"
                        :item="item"
                        :type="'key'"
                        :template="activity.item_template.key"
                    >
                        <template slot="transfer-data">
                            {{ item.text }}
                        </template>
                    </ls-card-droppable>
                </div>
            </span>
        </b-row>   
        <ls-card-display>
            <b-row
                align-h="around"
            >                
                <b-col
                    v-for="item in activity.items.values"
                    :key="item.id"
                    :sm="valueColSize"                     
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
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            hiddenElements: [],
            sentence: '',
            splitedSentence: [],            
        }
    },
    mounted() {
        this.createAnswersArray(),
        this.sentence = this.getKeys[0].text; 
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
            let words = this.sentence.split(' ');
            words.forEach(word => {
                let objectWord = {
                    text: word,
                    value_ids: this.getKeys[0].value_ids
                }
                this.splitedSentence.push(Object.assign({}, objectWord))
            })
            this.splitedSentence.forEach(word => {
                word.value_ids = [];
                this.getValues.forEach(value => {
                    if(word.text == value.text){
                        word.value_ids.push(value.id);
                    }
                })
            })
        }
    }
}
</script>

<style>
    .sentence{
        margin: 10px;
    }
</style>
