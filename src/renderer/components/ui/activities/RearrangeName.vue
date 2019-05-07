<template>
    <div class="container-fluid">
        <b-row class="column" align-v="center" align-h="center">
            <b-col class="flex-4">
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
            <b-col>
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
    props: {
        colSizes: Object
    },
    mounted(){
        this.createAnswersArray()
        console.log(this.activity.item_template.value)
    }
}
</script>

<style>

</style>
