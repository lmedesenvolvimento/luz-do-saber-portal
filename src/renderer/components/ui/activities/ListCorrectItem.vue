<template>
    <div class="container-fluid">
        <b-row>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-col v-for="(item, position) in getKeys" :key="position" :sm="valueColSize" class="item"> 
                    <Item 
                        v-if="answer.length"
                        :item="item"
                        :type="'key'"
                        :template="activity.item_template.key"
                    />
                </b-col>
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
import Vue from 'vue'
import { first } from 'lodash'
import { mapActions } from 'vuex'
import ActitivitiesComponents from './index'
import { ListMixin } from './mixins'

export default {
    components: {
        ...ActitivitiesComponents
    },
    mixins: [ListMixin],
    methods: {
        isValid(value){
            let { keys } = this.activity.items
            return first(keys).value_ids.includes(value)
        }
    }
}
</script>
