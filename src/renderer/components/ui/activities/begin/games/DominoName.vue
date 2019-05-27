<template>
    <div class="container-fluid game-domino-name">
        <b-row class="reverse" align-v="center">
            <b-col v-if="hasKeys" class="activity-keys flex-2" />
            <b-col 
                class="activity-values" 
            >
                <b-row>
                    <b-col class="flex-3" align-self="center">
                        <b-row>
                            <b-col v-for="(item, position) in getValuesFirstItems" :key="position" :md="valueColSize" class="item">
                                <ls-card-display class="fill card-sm">
                                    {{ item.text }}
                                </ls-card-display>
                            </b-col>                    
                        </b-row>
                    </b-col>
                    <div class="d-flex">
                        <b-row class="column flex">
                            <b-col v-for="(item, position) in getValuesLastItems" :key="position" class="item item-vertical"> 
                                <ls-card-display class="fill card-sm">
                                    <div class="writing-vertical">{{ item.text }}</div>
                                </ls-card-display>
                            </b-col>                    
                        </b-row>
                    </div>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import FormComponents from '@ui/form';

import { take, takeRight } from 'lodash'

export default {
    components: { ...FormComponents },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    computed: {
        getValuesFirstItems(){
            return take(this.getValues, 6)
        },
        getValuesLastItems(){
            return take(this.getValues, 2)
        }
    },
    mounted() {
        this.createAnswersArray()
        console.log(this.activity)
    },
}
</script>
<style lang="scss">
.game-domino-name{
    .item-vertical{
        flex: 1;
        .card-display, .card-display .card{
            height: 100%;
            .bg-color, .card-body{
                height: 100%;
            }
            .card-body{
                display: flex;
                align-items: center;
                .writing-vertical{
                    writing-mode: vertical-rl;
                    text-align: center;
                }
            }
        }
    }
}
</style>