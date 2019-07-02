<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center"> 
            <h2>   
                <span v-for="(s, position) in splitedSentence" :key="position" style="display: inline-block">
                    <span v-if="!searchString(hiddenElements, s)" class="sentence">{{ s.text }}</span>
                    <span v-else>
                        <Item
                            :item="s"
                            :type="'key'"
                            :template="activity.item_template.key"
                        >                        
                        </Item>                                       
                    </span>
                </span>
            </h2>
        </b-row>        
        <ls-card-display v-if="valueColSize == 1">
            <b-row
                align-h="around"
                style="margin: 1px 0 1px 0"
            >                
                <div
                    v-for="item in activity.items.values"
                    :key="item.id"
                    :sm="valueColSize"                     
                    class="item"
                >
                    <div 
                        class="letra"
                    >
                        <Item                                                        
                            :item="item"                                                            
                            :type="'value'"                            
                            :template="activity.item_template.value"
                        >                        
                        </Item>                                         
                    </div>                    
                </div>
            </b-row>
        </ls-card-display>
        <ls-card-display v-else>
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
        colSize1(colSize){
            if(colSize == 1){
                return true;
            } 
            return false;
        }
    }
}
</script>

<style>
    .sentence{
        margin: 10px;
    }
</style>
