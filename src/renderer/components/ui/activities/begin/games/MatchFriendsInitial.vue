<template>
    <div class="container-fluid">
        <b-row class="m-5" align-v="center" align-h="center">
            <b-row class="activity-keys" align-v="center" align-h="center">
                <b-col
                    v-for="(item) in activity.items.keys"
                    :key="item.id"
                    class="my-3 item"
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <b-col class="drop-and-name">
                        <ls-card-droppable
                            class="drop"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        >
                        </ls-card-droppable>
                        <ls-card-display class="name"> 
                            {{ dropFirstLetter(item.text) }}
                        </ls-card-display>
                    </b-col>
                </b-col>
            </b-row>
            <b-row class="pb-4 activity-values" align-v="center" align-h="center">
                <ls-card-display>
                    <b-row>
                        <b-col 
                            v-for="item in newArrayValues"
                            :key="item.id"
                            class="item"
                            cols="12"
                            md="3"
                            sm="6"
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
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
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
    computed: {
        newArrayValues() {
            return shuffle(this.activity.items.values)
        }
    },
    created()
    {
        console.log(shuffle(this.activity.items.values));
    },
    mounted(){
        this.createAnswersArray()
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

<style lang="scss">
    .activity-values{
        .item{
            .drop-and-name{
                align-items: center;
                padding: 0 !important;
                .name{
                    justify-content: center;
                    position: relative;
                    right: 2rem;
                    .card-body{
                        padding-left: 1.4rem;
                        text-align: left;
                        font-size: 18px;
                    }
                }
                .drop{
                    width: 100px;
                    z-index: 1;
                }

            }
        }          
        
    }
    .activity-keys{
        // flex-grow: 1;
        .card-display{
            width: 100%;
            padding: 0 20px 0 20px;
        }
    }
    
   
</style>
