<template>
    <div class="container-fluid">
        <b-col v-if="hasKeys" class="activity-keys">
            <b-row align-v="center" align-h="center">
                <b-col v-for="(item, position) in getKeys" :key="position" align-self="center" :sm="valueColSize" class="item"> 
                    <Item 
                        v-if="answer.length"
                        :item="item"
                        :type="'key'"
                        :template="activity.item_template.key"
                    />
                </b-col>
            </b-row>            
        </b-col>
        <p>{{ progress }}</p>
        <!-- <p v-for="(item, position) in getKeys" :key="position">{{ item.id }}</p> -->
        <b-col class="activity-values">
            <b-row align-v="center" align-h="center">
                <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :sm="valueColSize" class="item" @click="checkLetterOrder()"> 
                    <Item                         
                        v-if="answer.length"
                        :item="item"
                        :type="'value'"
                        :template="activity.item_template.value"                        
                    />
                </b-col>                    
            </b-row>
        </b-col>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            progress: 0
        }
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        checkLetterOrder() {
            
        }
    },    
}
</script>
