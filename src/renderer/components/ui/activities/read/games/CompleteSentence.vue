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
            <div v-else>
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
            </div>
        </b-row>
        <b-row v-if="getKeys.length === 1 && activity.item_template.key.type === 'audio'" align-h="around" class="activity-values">               
            <b-col
                v-for="item in splitedSentence"
                :key="item.id"
                class="word item"
            > 
                <div v-if="item.hasInput === true" :class="activity.item_template.value.font_size" class="silaba validate-icon-top">        
                    <Item                                                        
                        :item="item"                                                            
                        :type="'value'"                            
                        :template="activity.item_template.value"
                        :sm="activity.item_template.total_per_line"
                        :maxlength="13"
                    />                        
                </div>
                <div v-else>
                    {{ item.text }}
                </div>        
            </b-col>
        </b-row>
        <b-row v-else class="activity-values">
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
        </b-row>
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
        this.sentence = this.getKeys[0].text
        this.sentence = this.sentence.replace('.','')
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
            words.forEach(word => {
                let objectWord = {
                    text: word,
                    hasInput: false,
                    value_ids: this.getKeys[0].value_ids
                }
                this.splitedSentence.push(Object.assign({}, objectWord))
            })
            this.splitedSentence.forEach((word, i, ss) => {
                word.value_ids = [];
                this.getValues.forEach(value => {
                    if(word.text == value.text){
                        ss[i] = value;
                        ss[i].hasInput = true;
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss">
    #complete-sentence{
        .sentence{
            margin: 10px;
        }
        .card-input.card--input-text{
            max-width: 130px;
        }
        .word{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        .activity-keys{
            max-height: 40% !important;
        }
    }
</style>
