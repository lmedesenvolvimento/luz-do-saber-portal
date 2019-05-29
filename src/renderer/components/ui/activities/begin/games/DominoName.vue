<template>
    <div class="container-fluid game-domino-name">
        <b-row v-if="keys.length && values.length" class="reverse" align-v="center">
            <b-col v-if="hasKeys" class="activity-keys flex-3">
                <b-card class="domino fill">
                    <b-row class="domino-top">
                        <b-col v-for="(item, position) in getTopKeys" :key="position" cols="4" class="item">
                            <drop 
                                class="droppable" 
                                @drop="onDrop(item, ...arguments)"
                            >
                                <ls-card-display 
                                    class="fill card-sm" 
                                    :class="{'invisible': !item.valid}"
                                    :bg-color="item.color"
                                >
                                    {{ item.$next_letter }} | {{ item.text }}
                                </ls-card-display>
                            </drop>
                        </b-col>
                    </b-row>
                    <b-row class="domino-middle">
                        <b-col class="item item-vertical">
                            <drop 
                                class="droppable" 
                                @drop="onDrop(getLeftKey, ...arguments)"
                            >
                                <ls-card-display 
                                    class="card-sm" 
                                    :class="{'invisible': !getLeftKey.valid }"
                                    :bg-color="getLeftKey.color"
                                >
                                    <div class="writing-vertical">
                                        {{ getLeftKey.text }} | {{ getLeftKey.$next_letter }}
                                    </div>                                
                                </ls-card-display>
                            </drop>
                        </b-col>
                        <b-col>
                            <b-card class="fill"></b-card>
                        </b-col>
                        <b-col class="item item-vertical d-flex justify-content-end">
                            <drop 
                                class="droppable" 
                                @drop="onDrop(getRightKey, ...arguments)"
                            >
                                <ls-card-display 
                                    class="card-sm" 
                                    :class="{'invisible': !getRightKey.valid}"
                                    :bg-color="getRightKey.color"
                                >
                                    <div class="writing-vertical">
                                        {{ getRightKey.$next_letter }} | {{ getRightKey.text }}
                                    </div>                                
                                </ls-card-display>
                            </drop>
                        </b-col>
                    </b-row>
                    <b-row class="domino-bottom">
                        <b-col v-for="(item, position) in getBottomKeys" :key="position" cols="4" class="item">
                            <drop 
                                class="droppable" 
                                @drop="onDrop(item, ...arguments)"
                            >
                                <ls-card-display 
                                    class="fill card-sm" 
                                    :class="{'invisible': !item.valid}"
                                    :bg-color="item.color"
                                >
                                    {{ item.text }} | {{ item.$next_letter }}
                                </ls-card-display>
                            </drop>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col class="activity-values">
                <b-row>
                    <b-col class="flex-3" align-self="center">
                        <b-row>
                            <b-col v-for="(item, position) in getValuesFirstItems" :key="position" :md="valueColSize" class="item">
                                <drag 
                                    class="draggable"
                                    :class="{'invisible':item.dropped}"
                                    :transfer-data="item"
                                    :draggable="!item.dropped"                                     
                                >
                                    <ls-card-display 
                                        class="fill card-sm" 
                                        :bg-color="item.color"
                                    >
                                        {{ item.text }}
                                    </ls-card-display>
                                </drag>
                            </b-col>
                            <b-col v-for="(item, position) in getValuesLastItems" :key="position" :md="valueColSize" class="item">
                                <drag 
                                    class="draggable"
                                    :class="{'invisible':item.dropped}"
                                    :transfer-data="item"
                                    :draggable="!item.dropped"                                     
                                >
                                    <ls-card-display 
                                        class="fill card-sm" 
                                        :bg-color="item.color"
                                    >
                                        {{ item.text }}
                                    </ls-card-display>
                                </drag>
                            </b-col>
                        </b-row>
                    </b-col>
                    <div class="d-flex">
                        <b-row class="column flex">
                            <b-col class="item item-vertical"> 
                                <drag 
                                    class="draggable"
                                    :class="{'invisible':getLeftValue.dropped}"
                                    :transfer-data="getLeftValue" 
                                    :draggable="!getLeftValue.dropped"                                     
                                >
                                    <ls-card-display 
                                        class="fill card-sm" 
                                        :bg-color="getLeftValue.color"
                                    >
                                        <div class="writing-vertical">{{ getLeftValue.text }}</div>
                                    </ls-card-display>
                                </drag>
                            </b-col>                    
                            <b-col class="item item-vertical"> 
                                <drag 
                                    class="draggable"
                                    :class="{'invisible':getRightValue.dropped}"
                                    :transfer-data="getRightValue" 
                                    :draggable="!getRightValue.dropped"                                     
                                >
                                    <ls-card-display 
                                        class="fill card-sm" 
                                        :bg-color="getRightValue.color"
                                    >
                                        <div class="writing-vertical">{{ getRightValue.text }}</div>
                                    </ls-card-display>
                                </drag>
                            </b-col>                    
                        </b-row>
                    </div>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import { take, takeRight, sortBy, map, last, first, findIndex, random } from 'lodash'
import { Drag, Drop } from 'vue-drag-drop'
import FormComponents from '@ui/form';

export default {
    components: { ...FormComponents, Drag, Drop },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            keys: [],
            values: []
        }
    },
    computed: {
        getValuesFirstItems(){
            return take(this.values, 3)
        },
        getValuesLastItems(){
            return takeRight(this.values, 3)
        },
        getTopKeys(){
            return take(this.keys, 3).reverse()
        },
        getBottomKeys(){
            return takeRight(this.keys, 3)
        },
        getLeftKey(){
            return this.keys[3]
        },
        getRightKey(){
            return this.keys[4]
        },
        getLeftValue(){
            return this.values[3]
        },
        getRightValue(){
            return this.values[4]
        }
    },
    created(){
        this.addColorsToType('substantivo_proprio')
    },
    mounted() {
        this.keys = this.mapNextLetter(this.getKeys)
        this.values = this.mapNextLetter(this.getValues)

        const randomIndex = random(0, this.keys.length)

        const randomKey = this.keys[randomIndex]
        const randomValues = this.values[randomIndex]
        
        randomKey.valid = true
        randomValues.dropped = true

        console.log(this.keys, this.values)

        this.createAnswersArray()

        this.setAnswer({ 
            type: 'value', 
            data: randomValues.id,
            vm: {}
        })
    },
    methods: {
        onDrop(item, transferData, nativeElement){
            if (item.value_ids.includes(transferData.id)) {
                this.setAnswer({ 
                    type: 'value', 
                    data: transferData.id,
                    vm: {}
                })

                Vue.set(item,'valid', true)
                Vue.set(transferData,'dropped', true)
            } else {
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })
            }
            this.recompileAt = new Date()
        },
        mapNextLetter(data){
            let result = map(data, (item, index, array) => {
                if(index == (array.length - 1)){
                    item.$next_letter = array[4].first_letter
                }
                else if (index === 3){
                    item.$next_letter = array[5].first_letter
                }
                else if (index === 4){
                    item.$next_letter = first(array).first_letter
                } 
                else {
                    item.$next_letter = array[index + 1].first_letter
                }
                return item
            })
            return result
        },
        ...mapActions('Activity', ['setAnswer'])
    }
}
</script>