<template>
    <div class="container-fluid">
        <b-row class="column" align-v="center" align-h="center">
            <b-col class="activity-keys">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.values"
                        :key="item.id"
                        :sm="1"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.value"
                        />
                        <ls-card-display
                        > 
                            {{ dropaLetra(item.text) }}  
                        </ls-card-display>      
                    </b-col>            
                    <!-- <ls-card-display
                        v-for="item in activity.items.keys"
                        :key="item.id"
                    > 
                        {{ dropaLetra(item.text) }} 
                    </ls-card-display>         -->
                </b-row>
            </b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <ls-card-display>
                        <b-row>
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
    components: { 
        Item,
        ...ui,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    props: {
        colSizes: Object
    },
    mounted(){
        this.createAnswersArray()
        console.log(this.activity.item_template.value)
    },
    methods: {
        dropaLetra(nome){
            return nome.substring(1)
        }
    }
}
</script>

<style>

</style>
