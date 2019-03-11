<template>
    <div class="container-fluid">
        <b-row>
            <b-col class="activity-keys" v-if="hasKeys">Keys</b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col :sm="valueColSize" v-for="(item, position) in getItems" v-bind:key="position">                        
                        <Item :item="item" :input="input" :hasError="feedback.$isInvalid" :hasSuccess="feedback.$isValid" :template="activity.item_template.value"></Item>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import { clone, first } from 'lodash'
import { mapActions } from 'vuex'
import ActitivitiesComponents, { ListMixin } from './index'

export default {
    mixins: [ListMixin],
    components: {
        ...ActitivitiesComponents
    },
    computed: {
        hasKeys(){
            let { item_template } = this.activity
            return item_template.key.total_per_line ? true : false
        },
        getItems(){
            return this.activity.items.values
        }
    },
    methods: {
        isValid(value){
            let { keys } = this.activity.items
            return first(keys).value_ids.includes(value)
        }
    },
    watch: {
        input: {
            handler(input){
                if(input.value === null) return

                this.isValid(input.value) 
                    ? this.onSuccess() 
                    : this.onFail()
            },
            deep: true
        }
    }
}
</script>
