<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center">
            <h2>{{ splitedSentence }}</h2>
        </b-row>
        <b-row>
            <b-col class="activity-keys">
                <ls-card-display>
                    <b-row>
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
        this.sentence = this.getKeys[0].text;
        this.getValues.forEach(element => {            
            this.hiddenElements.push(element.text)
        });
        for(let i = 0; i < this.sentence.length; i++){
            console.log(this.hiddenElements,this.sentence)           
        }

    },
    methods: {
        searchString(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if (arr[i].match(str)) return true;
            }
            return false;
        },
    }
}
</script>

<style>

</style>
