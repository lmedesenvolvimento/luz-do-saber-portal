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
                        <div v-if="isBox" class="caixa">
                            <group-drop
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.key"
                            />
                        </div>
                        <div v-else class="grupo">
                            <card-display class="title-card">
                                <div class="title">
                                    {{ item.text }}
                                </div>
                            </card-display>
                            <card-display
                                label="item.text" 
                                :item="item"
                                :name="activity.type.slug"
                                :bg-color="undefined"
                            >
                                <div class="conteudo">
                                    <group-drop
                                        v-slot:default="slotProps"
                                        :item="item"
                                        :type="'value'"
                                        :template="activity.item_template.key"
                                    >   
                                        <div class="card-input drop-group">
                                            <b-row class="items-container">
                                                <b-col 
                                                    v-for="ans in slotProps.props.answers" 
                                                    :key="ans.id"
                                                    cols="6"
                                                    class="mb-2"
                                                >
                                                    <div class="silaba">
                                                        <b-card
                                                            no-body
                                                            class="drop-group-item"
                                                            :class="{ 'invalid': ans.invalid, 'valid': ans.valid }"
                                                        >
                                                            <b-card-body>
                                                                <div class="icon-img" :style="{backgroundImage: `url('${ans.images[0].url}')`}"></div>
                                                            </b-card-body>
                                                        </b-card>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </group-drop>
                                </div>
                            </card-display>
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
    computed: {
        isBox(){
            return this.activity.item_template.key.custom === 'game-caixa-de-palavras' ? true : false
        },
    },
    created(){
        this.createAnswersArray()
    },
}
</script>

<style>

</style>