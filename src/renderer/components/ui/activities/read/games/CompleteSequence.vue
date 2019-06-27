<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center">            
            <b-col
                v-for="(key, position) in activity.items.keys" 
                :key="key.id"
                :sm="valueColSize"
                class="item"
            >
                <div style="vertical-align: middle">
                    <h2>{{ splitedSentence[position] }}</h2> 
                </div>                
                <div>
                    <Item
                        :item="key"
                        :type="'key'"
                        :template="activity.item_template.key"
                    >                        
                    </Item>
                </div> 
                <h2 
                    v-if="(activity.total_correct_items != splitedSentence.length) &&
                        (activity.total_correct_items == position + 1)"
                >
                    {{ splitedSentence[position + 1] }}
                </h2>               
            </b-col>             
        </b-row>
        <b-row>
            <b-col class="activity-keys">
                <ls-card-display>
                    <b-row>
                        <div 
                            v-for="item in activity.items.values"
                            :key="item.id"
                            class="item card-sm"
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
            </b-col>                
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
            splitedSentence: []
        }
    },
    mounted() {
        this.createAnswersArray(),
        //this.sentence = this.getKeys[0].text;
        this.sentence = 'Onde está a? bola'
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
                    this.sentence = sentences[1]
                }
            }
        },
    }
}
</script>

<style>

</style>
