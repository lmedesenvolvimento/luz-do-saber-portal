<template>
    <div class="container-fluid">        
        <b-row align-h="center">            
            <b-col class="activity-values">
                <ls-card-display style="width: 150px">
                    <b-row>
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :md="valueColSize" :sm="6" class="item"> 
                            <Item 
                                v-if="answers"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />
                        </b-col>                    
                    </b-row> 
                </ls-card-display> 
            </b-col>
            <b-col class="activity-keys">
                <div>
                    <b-row>
                        <b-col v-for="(item, position) in getKeys" :key="position" class="item"> 
                            <b-row align-h="start">
                                <b-col>
                                    <Item 
                                        :item="item"
                                        :type="'key'"
                                        :template="activity.item_template.key"
                                        class="accentuation-drop"
                                    />
                                </b-col>
                                <b-col class="accentuation-column">
                                    <ls-card-display class="accentuation-card">
                                        <p class="accentuation-card-word">{{ words[position] }}</p>
                                    </ls-card-display>
                                </b-col>                 
                            </b-row>                        
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import alerts from '@/components/alerts'

export default {
    components: {
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            words: []
        }
    },
    mounted() {
        this.createAnswersArray(),
        this.getKeys.forEach(element => {
            this.words.push(element.text);
            element.text = 'a';
        });
        console.log(this.words);
    },
}
</script>

<style lang="scss">  
    .accentuation-drop {  
        .card--droppable{
            .card{
                width: 74px;
                height: 74px !important;
                z-index: 1;
            }            
        }
    }
    .accentuation-column{
        left: -200px;
        z-index: 0;
    }
    .accentuation-card {
        margin: 8px 0 0 0;
        .card-body {
            height: 50px;            
        }     
    }
    .accentuation-card-word {
            margin-top: -4px;
    }
</style>
