<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center">
            <b-col 
                v-for="(item, index) in activity.items.values"
                :key="item.id"
                :sm="valueColSize"
                class="item"
            >   
                {{ getColorsArray[index] }}
                <Item
                    :item="item"
                    :type="'value'"
                    :template="activity.item_template.value"
                />
            </b-col>                    
        </b-row>
        <b-row align-v="center" align-h="center">
            <b-col 
                v-for="(item, index) in activity.items.keys"
                :key="item.id"
                :sm="keyColSize"
                class="item"
            >
                {{ getColorsArray[index] }}
                <Item
                    :item="item"
                    :type="'key'"
                    :template="activity.item_template.value"
                />
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
    mounted(){
        this.createAnswersArray()
        console.log('cores')
        console.log(this.getColorsArray)
    }
}
</script>

<style>

</style>
