<template>
    <div class="container-fluid"> 
        <div class="rearrange-name">
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
                    />
                </b-col>                    
            </b-row> 
        </div> 
        <ls-card-display>
            <b-row align-v="around" align-h="around">
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
        </ls-card-display>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import { sampleSize, drop, range } from 'lodash'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

import { mapState, mapActions } from 'vuex'

export default {
    components: { 
        Item,
        ...ui,
        ...alerts
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    props: {
        colSizes: Object
    },
    created(){
        this.createAnswersArray()
    }
}
</script>

<style>
    .rearrange-name {
        margin: 12px auto 12px;
    }
</style>
