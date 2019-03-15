<template>
    <div class="container-fluid">
        <b-row>
            <b-col class="activity-keys" v-if="hasKeys">
                <Item 
                    v-if="answer.length"
                    :item="item" 
                    :input="answer[0].value"
                    :template="activity.item_template.value">
                </Item>
            </b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col :sm="valueColSize" v-for="(item, position) in getValues" v-bind:key="position"> 
                        <Item 
                            v-if="answer.length"
                            :item="item" 
                            :input="answer[0].value"
                            :template="activity.item_template.value">
                        </Item>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import { first } from 'lodash'
import { mapActions } from 'vuex'
import ActitivitiesComponents from './index'
import { ListMixin } from './mixins'

export default {
    mixins: [ListMixin],
    components: {
        ...ActitivitiesComponents
    },
    methods: {
        isValid(value){
            let { keys } = this.activity.items
            return first(keys).value_ids.includes(value)
        }
    }
}
</script>
