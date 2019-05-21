<template>
    <div class="container-fluid">
        <b-row class="column" align-v="center" align-h="center">
            <b-col class="activity-keys flex-4">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.values"
                        :key="item.id"
                        :sm="valueColSize"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        />
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        :sm="keyColSize"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                            :group="true"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>        
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import { sampleSize, drop, range } from 'lodash'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

import { mapState, mapActions } from 'vuex'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    props: {
        colSizes: Object
    },
    created(){
        this.createAnswersArray()
        this.teste()
    },
    methods: {
        teste(){
            let aux = this.activity.items.keys
            let oa = {}

            let tamanho = 0;

            for(let i = 0; i < aux.length; i++) tamanho += aux[i].value_ids.length

            console.log(oa, 'oa')

            for (let i = 0; i < tamanho; i++) oa[i] = aux[0]
        },
        validationById(transferData){            
            if (this.item.value_ids.includes(transferData.id)) {                
                this.setAnswer({ 
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })

                transferData.valid = true
            } else {
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })

                transferData.invalid = true
            }
        }
    }
}
</script>

<style>

</style>
