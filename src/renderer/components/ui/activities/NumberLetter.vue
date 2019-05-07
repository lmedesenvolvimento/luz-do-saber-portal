<template>
    <div class="container-fluid">
        <b-row class="column">
            <b-col>
                <b-row align-v="center" align-h="center">
                    <ls-card-display v-for="index in getKeys[0].text.length" :key="index" style="padding: 10px; margin: 130px 0 130px 0">
                        {{ getKeys[0].text[index - 1] }}
                    </ls-card-display>
                </b-row>                
            </b-col>            
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :sm="valueColSize" class="item"> 
                        <Item 
                            v-if="answer.length"
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        />
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row> 
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import FormProps from '../form'
import { range } from 'lodash'

export default {
    components: {
        ...FormProps
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    },
    
}
</script>
