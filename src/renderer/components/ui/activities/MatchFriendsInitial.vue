<template>
    <div class="container-fluid">
        <b-row class="column" align-v="center" align-h="center">
            <b-col class="activity-keys">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="(item) in activity.items.values"
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
                            {{ findKeyId(item.id)}}
                        </ls-card-display>      
                    </b-col>            

                </b-row>
            </b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <ls-card-display>
                        <b-row>
                            <b-col 
                                v-for="item in newArrayValues"
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
import { shuffle } from 'lodash'

export default {
    components: { 
        Item,
        ...ui,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    props: {
        colSizes: Object
    },
    created()
    {
        console.log(shuffle(this.activity.items.values));
    },
    mounted(){
        this.createAnswersArray()
    },
    computed: {
        newArrayValues() {
            return shuffle(this.activity.items.values)
        }
    },
    methods: {
        dropFirstLetter(nome){
            return nome.substring(1)
        },
        findKeyId(value_id)
        {
            for (let i = 0; i < this.activity.items.keys.length; i++) {
                if (this.activity.items.keys[i]['value_ids'][0] === value_id)
                {
                    return this.dropFirstLetter(this.activity.items.keys[i].text)
                }                
            }
        }
    }
}
</script>

<style scoped>

</style>
