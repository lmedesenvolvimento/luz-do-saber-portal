<template>
    <div class="container-fluid">        
        <b-row id="grouping-activity" class="row" align-v="center" align-h="center">            
            <b-col
                v-if="hasValues" 
                class="activity-values"
                cols="6"                 
            >      
                <card-display>
                    <b-row style="margin: 5px">
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :md="valueColSize" class="item"> 
                            <Item 
                                v-if="answers"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />
                        </b-col>                    
                    </b-row> 
                </card-display>  
            </b-col>
            <b-col class="activity-keys">
                <b-row>
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        class="item"
                    >
                        <div class="caixa">
                            <group-drop
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.key"
                            />
                        </div>                        
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

import groupDrop from '@/components/ui/form/CardGroupDroppable'
import cardDisplay from '@/components/ui/form/CardDisplay'

import { mapState, mapActions } from 'vuex'

export default {
    components: { Item, groupDrop, cardDisplay },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],    
    created(){
        this.createAnswersArray()
    },
}
</script>

<style>

</style>