<template>
    <div class="container-fluid">
        <b-row class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-values">
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
                        />
                    </div>
                </b-col>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

import { mapState, mapActions } from 'vuex'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    created(){
        this.createAnswersArray()
        this.addColorsToType('substantivo_comum')
    }
}
</script>

<style lang="scss">
    .caixa{
        .card-input.drop-group{
            height: 280px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            text-align: center;
        }

        .drop-group .drop-group-item{
            margin: 0 auto !important;
        }

        .card{
            width: 45%;
            border-radius: 0.75rem;
            padding: 0.15rem;
            .bg-color {
                border-radius: 0.6rem !important;
            }
            .card-body{
                font-size: 18px;
                padding: 0.5rem;
                border-radius: 0.6rem !important;
            }
        }

        .items-container{
            padding-top: 17%;
        }

        .title{
            padding-top: 7%;
            color: transparentize($color: #222, $amount: 0.6)
        }
    }
</style>
