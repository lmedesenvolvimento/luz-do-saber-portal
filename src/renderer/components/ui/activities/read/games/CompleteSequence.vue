<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center"> 
            <h2>
                <span v-for="s in splitedSentence" :key="s" style="display: inline-block">
                    <span v-if="!hiddenElements.includes(s)" class="sentence">{{ s }}</span>
                    <span v-else>
                        <div class="caractere-especial">
                            <Item
                                :item="activity.items.keys[0]"
                                :type="'key'"
                                :template="activity.item_template.key"
                            >                        
                            </Item>
                        </div>                        
                    </span>
                </span>
            </h2>
        </b-row>        
        <ls-card-display>
            <b-row
                align-h="between"
            >
                <div 
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
                </div>
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
            keywords: [{
                text: '?'
            }]
        }
    },
    mounted() {
        this.createAnswersArray(),
        //this.sentence = this.getKeys[0].text;
        this.sentence = 'Onde está a ? bola'
        this.getValues.forEach(element => {            
            this.hiddenElements.push(element.text)
        });
        for(let i = 0; i < this.sentence.length; i++){
            this.searchString(this.hiddenElements,this.sentence[i])           
        }
        this.splitedSentence.push(this.sentence)

    },
    methods: {
        searchString(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if(arr[i] == str){
                    let sentences = this.sentence.split(str)
                    this.splitedSentence.push(sentences[0])
                    this.splitedSentence.push(str)
                    this.sentence = sentences[1]
                }
            }
        },
    }
}
</script>

<style>
    .sentence{
        margin: 10px;
    }
</style>
