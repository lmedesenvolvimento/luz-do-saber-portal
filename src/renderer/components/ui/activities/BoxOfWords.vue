<template>
    <div class="container-fluid">
        <b-row class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-keys">
                <b-row class="fill" align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        :sm="keyColSize"
                        class="item"
                    >
                        <div class="caixa">
                            <Item
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                                :group="true"
                            />
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="activity-values flex-4">
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
    created(){
        this.createAnswersArray()
        console.log(this.getColorsArray)
        console.log(this.addColors())
    },
    methods: {
        addColors(){
            for (var key in this.activity.items.values) {
                if (this.activity.items.values.hasOwnProperty(key)) {
                    if (this.activity.items.values[key].type === 'substantivo_comum'){
                        this.activity.items.values[key].color = this.getColorsArray[key]
                    }
                    else {
                        this.activity.items.values[key].color = null
                    }
                }
            }
            for (var key in this.activity.items.keys) {
                if (this.activity.items.values[key].type === 'substantivo_comum'){
                    this.activity.items.keys[key].color = this.getColorsArray[key]
                }
                else {
                    this.activity.items.keys[key].color = null
                }
            }
            return 'owo'
        }
    }
}
</script>
<style lang="scss">
.caixa{
    .drop-group {
        border: 3px dotted royalblue;
        min-height: 50px;
        padding: 4px;
    }

    .drop-group .drop-group-item{
        margin: 1rem auto;
    }
}
</style>

