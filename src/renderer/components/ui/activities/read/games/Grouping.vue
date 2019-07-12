<template>
    <div class="container-fluid">
        <b-row id="grouping-activity" class="column" align-v="center" align-h="center">
            <b-col class="activity-keys">
                <b-row class="fill">
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        :sm="keyColSize"
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
                            <div class="title">
                                {{ item.text }}
                            </div>
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
                            :class="isBox ? 'text-grouping' : 'img-grouping'"
                        />
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

<style lang="scss">
    #grouping-activity{

        .activity-keys{
            flex-grow: 1.3;
        }

        .activity-values{
            flex-grow: 0.7;
        }

        .icon-img{
            height: 50px;
            width: 50px;
            margin: auto;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        .item{
            width: 100%;
        }

        .texto{
            max-width: none !important;
        }

        .drop-group .drop-group-item{
            margin: 0 auto !important;
        }

        .card-input.drop-group{
            display: flex;
            flex-direction: column;
            max-height: none !important;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            text-align: center;
        }

        .title{
            color: transparentize($color: #222, $amount: 0.6)
        }

        .caixa{
            .card-input.drop-group{
                height: 280px;
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
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-top: 3.5rem;
                justify-content: space-evenly;

            }
            .title{
                padding-top: 7%;
            }
        }
        
        .grupo{
            .title{
                font-size: 18px;
                margin: auto;
                text-align: center;
            }
            .conteudo{
                .card-input.drop-group{
                    height: 160px;

                    .card-body{
                        font-size: 18px;
                        padding: 5px;
                    }
                }
            }
        }

        .text-grouping{
            * .draggshadow{
                height: 100%;
            }
        }

        .img-grouping{
            * .card--draggable{
                padding: 0;

                * .card-body{
                    padding: 5px !important;
                }
            }

            * .draggshadow{
                width: 70px;
                height: 70px;

                .card-body{
                    padding: 5px 0 !important;
                }
            }
        }
    }
</style>
