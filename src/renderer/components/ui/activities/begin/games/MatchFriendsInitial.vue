<template>
    <div class="container-fluid">
        <b-row class="m-5" align-v="center" align-h="center">
            <b-row class="activity-keys" align-v="center" align-h="center">
                <b-col
                    v-for="(item) in activity.items.keys"
                    :key="item.id"
                    class="my-2 item"
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <b-row class="m-1 drop-and-name">
                        <b-col class="drop item" md="1">
                            <ls-card-droppable
                                class="letra texto"
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                            >
                            </ls-card-droppable>
                        </b-col>
                        <b-col class="name-container">
                            <ls-card-display class="name">
                                {{ dropFirstLetter(item.text) }}
                            </ls-card-display>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="py-3 px-5 activity-values" align-v="center" align-h="center">
                <ls-card-display class="display-values">
                    <b-row>
                        <b-col
                            v-for="item in arrayValues"
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
    data() {
        return {
            arrayValues: []
        }
    },
    created () {
        this.arrayValues = shuffle(this.activity.items.values)
        
    },
    mounted(){
        this.createAnswersArray()
    },
    methods: {
        dropFirstLetter(nome){
            return nome.substring(1)
        },
    }
}
</script>

<style lang="scss">
    .activity-keys{
        padding-right: 1.0rem;
        .item{
            .drop-and-name{
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 210px;
                .name-container
                {
                    padding: 0;
                    position: relative;
                    right: 0.9rem;
                    max-width: 200px;
                }
                .name * >{
                    display: flex;
                    justify-content: center;
                    padding: 0 !important;
                    .card-body{
                        padding-left: 2.0rem;
                        text-align: left;
                        flex-grow: 1;
                    }
                }
                .drop{
                    margin-right: -1.5rem;
                    z-index: 1;
                }
            }
        }
    }
    .activity-values{
        width: 100%;
        .display-values{
            width: 100%;
        }
    }
    
</style>
