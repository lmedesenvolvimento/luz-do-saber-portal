<template>
    <div class="container-fluid">
        <b-row align-h="center">
            <b-row v-if="hasKeys" class="activity-keys">
                <b-col v-for="(item, position) in getKeys" :key="position" :sm="valueColSize" class="item"> 
                    <Item 
                        v-if="answer.length"
                        :item="item"
                        :type="'key'"
                        :template="activity.item_template.key"
                    />
                </b-col>
            </b-row>
            <b-row class="activity-values" align-v="center" align-h="center">
                <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :sm="valueColSize" class="item"> 
                    <Item 
                        v-if="answer.length"
                        :item="item"
                        :type="'value'"
                        :template="activity.item_template.value"
                    />
                </b-col>                    
            </b-row>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    }
}
</script>
