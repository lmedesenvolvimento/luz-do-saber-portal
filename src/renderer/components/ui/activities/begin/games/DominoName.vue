<template>
    <div class="container-fluid game-domino-name">
        <b-row
            v-if="keys.length && values.length"
            class="reverse"
            align-v="center"
        >
            <b-col v-if="hasKeys" class="activity-keys flex-2">
                <b-card class="domino fill">
                    <b-container class="fill d-flex column" fluid>
                        <b-row class="domino-top">
                            <b-col
                                v-for="item in getTopKeys"
                                :key="item.id"
                                cols="4"
                                class="item"
                            >
                                <drop
                                    class="droppable substantivo_proprio texto medium"
                                    :expected="item"
                                    :objects="getAllValues"
                                    @ondropEvent="onDrop"
                                >
                                    <ls-card-display
                                        class="fill"
                                        :class="{ empty: !item.valid }"
                                        :invalid="item.invalid"
                                        :bg-color="item.color"
                                    >
                                        {{ item.$next_letter }} |
                                        {{ item.text }}
                                    </ls-card-display>
                                </drop>
                            </b-col>
                        </b-row>
                        <b-row class="domino-middle">
                            <b-col class="item item-vertical">
                                <drop
                                    class="droppable texto medium"
                                    :expected="getLeftKey"
                                    :objects="getAllValues"
                                    @ondropEvent="onDrop"
                                >
                                    <ls-card-display
                                        :class="{ empty: !getLeftKey.valid }"
                                        :invalid="getLeftKey.invalid"
                                        :bg-color="getLeftKey.color"
                                    >
                                        <div class="writing-vertical">
                                            {{ getLeftKey.text }} |
                                            {{ getLeftKey.$next_letter }}
                                        </div>
                                    </ls-card-display>
                                </drop>
                            </b-col>
                            <b-col>
                                <b-card class="fill domino-divider"></b-card>
                            </b-col>
                            <b-col
                                class="item item-vertical d-flex justify-content-end"
                            >
                                <drop
                                    class="droppable texto medium"
                                    :expected="getRightKey"
                                    :objects="getAllValues"
                                    @ondropEvent="onDrop"
                                >
                                    <ls-card-display
                                        :class="{ empty: !getRightKey.valid }"
                                        :invalid="getRightKey.invalid"
                                        :bg-color="getRightKey.color"
                                    >
                                        <div class="writing-vertical">
                                            {{ getRightKey.$next_letter }} |
                                            {{ getRightKey.text }}
                                        </div>
                                    </ls-card-display>
                                </drop>
                            </b-col>
                        </b-row>
                        <b-row class="domino-bottom">
                            <b-col
                                v-for="item in getBottomKeys"
                                :key="item.id"
                                cols="4"
                                class="item"
                            >
                                <drop
                                    class="droppable texto medium"
                                    :expected="item"
                                    :objects="getAllValues"
                                    @ondropEvent="onDrop"
                                >
                                    <ls-card-display
                                        class="fill card-sm"
                                        :class="{ empty: !item.valid }"
                                        :invalid="item.invalid"
                                        :bg-color="item.color"
                                    >
                                        {{ item.text }} |
                                        {{ item.$next_letter }}
                                    </ls-card-display>
                                </drop>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>
            <b-col class="activity-values">
                <b-row>
                    <b-col class="items" md="8" align-self="center">
                        <b-row>
                            <b-col
                                v-for="item in getValuesItems"
                                :key="item.id"
                                :md="valueColSize"
                                class="item"
                                align-self="center"
                            >
                                <!-- :class="{
                                        dropped: item.dropped,
                                        dragging: item.dragging
                                    }" -->
                                <drag
                                    class="draggable texto medium"
                                    empty-class="dragging"
                                    classname="draggable texto medium"
                                    :data-transfer="{ id: item.id }"
                                    :snap-on="item.snapOn"
                                    :dropped="item.dropped"
                                    @onstartEvent="onDrag"
                                    @onendEvent="onDragLeave"
                                >
                                    <ls-card-display
                                        class="fill"
                                        :bg-color="item.color"
                                    >
                                        <div v-if="valueIsTop(item)">
                                            {{ item.$next_letter }} |
                                            {{ item.text }}
                                        </div>
                                        <div v-else>
                                            {{ item.text }} |
                                            {{ item.$next_letter }}
                                        </div>
                                    </ls-card-display>
                                </drag>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="vertical-items">
                        <b-row class="column flex">
                            <b-col
                                class="item item-vertical"
                                align-self="center"
                            >
                                <drag
                                    class="draggable texto medium"
                                    classname="draggable texto medium"
                                    empty-class="dragging"
                                    :data-transfer="{ id: getLeftValue.id }"
                                    :snap-on="getLeftValue.snapOn"
                                    :dropped="getLeftValue.dropped"
                                    :draggable="!getLeftValue.dropped"
                                    @dragstart="onDrag"
                                    @dragend="onDragLeave"
                                >
                                    <ls-card-display
                                        class="fill"
                                        :bg-color="getLeftValue.color"
                                    >
                                        <div class="writing-vertical">
                                            {{ getLeftValue.$next_letter }} |
                                            {{ getLeftValue.text }}
                                        </div>
                                    </ls-card-display>
                                </drag>
                            </b-col>
                            <b-col
                                class="item item-vertical"
                                align-self="center"
                            >
                                <drag
                                    class="draggable texto medium"
                                    classname="draggable texto medium"
                                    empty-class="dragging"
                                    :data-transfer="{ id: getRightValue.id }"
                                    :snap-on="getRightValue.snapOn"
                                    :dropped="getRightValue.dropped"
                                    :draggable="!getRightValue.dropped"
                                    @dragstart="onDrag"
                                    @dragend="onDragLeave"
                                >
                                    <ls-card-display
                                        class="fill"
                                        :bg-color="getRightValue.color"
                                    >
                                        <div class="writing-vertical">
                                            {{ getRightValue.$next_letter }} |
                                            {{ getRightValue.text }}
                                        </div>
                                    </ls-card-display>
                                </drag>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
    MapMixins,
    ListMixin,
    CreateAnswersMixins
} from '@ui/activities/mixins'
import {
    chain,
    take,
    takeRight,
    sortBy,
    map,
    last,
    first,
    findIndex,
    random
} from 'lodash'
import Drag from '@ui/items/Drag'
import Drop from '@ui/items/Drop'
import FormComponents from '@ui/form'

export default {
    components: { ...FormComponents, Drag, Drop },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            values: [],
            keys: []
        }
    },
    computed: {
        getValuesItems() {
            return chain(this.getValuesFirstItems)
                .concat(this.getValuesLastItems)
                .value()
        },
        getAllValues() {
            return chain(this.getValuesItems)
                .concat(this.getLeftValue)
                .concat(this.getRightValue)
                .value()
        },
        getValuesFirstItems() {
            return take(this.values, 3)
        },
        getValuesLastItems() {
            return takeRight(this.values, 3)
        },
        getTopKeys() {
            return take(this.keys, 3).reverse()
        },
        getBottomKeys() {
            return takeRight(this.keys, 3)
        },
        getLeftKey() {
            return this.keys[3]
        },
        getRightKey() {
            return this.keys[4]
        },
        getLeftValue() {
            return this.values[3]
        },
        getRightValue() {
            return this.values[4]
        }
    },
    created() {
        this.addColorsToType('substantivo_proprio')
    },
    mounted() {
        this.keys = this.mapNextLetter(this.getKeys)
        this.values = this.mapNextLetter(this.getValues)

        const randomIndex = random(0, this.keys.length - 1)

        const randomKey = this.keys[randomIndex]
        const randomValues = this.values[randomIndex]

        randomKey.valid = true
        randomValues.dropped = true

        this.createAnswersArray()

        this.setAnswer({
            type: 'value',
            data: randomValues.id,
            vm: {}
        })
    },
    methods: {
        valueIsTop(item) {
            return this.getValuesFirstItems.includes(item)
        },
        onDrag(transferData, nativeElement) {
            setTimeout(() => {
                Vue.set(transferData, 'dragging', true)
            })
        },
        onDragLeave(transferData, nativeElement) {
            setTimeout(() => {
                Vue.set(transferData, 'dragging', false)
            })
        },
        onDrop(nativeElement, item, data) {
            const transferData = data[0]
            if (item.value_ids.includes(transferData.id)) {
                this.setAnswer({
                    type: 'value',
                    data: transferData.id,
                    vm: {}
                })

                Vue.set(item, 'valid', true)
                Vue.set(transferData, 'dropped', true)
                Vue.set(transferData, 'dragging', false)
            } else {
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
                Vue.set(item, 'invalid', true)
                Vue.set(transferData, 'dragging', false)
                Vue.set(transferData, 'dropped', true)
                setTimeout(() => {
                    Vue.set(transferData, 'snapOn', 'self')
                }, 300)
                setTimeout(() => {
                    Vue.set(transferData, 'snapOn', 'none')
                    Vue.set(transferData, 'dropped', false)
                    Vue.set(item, 'invalid', false)
                }, 400)
                setTimeout(() => (data.length = 0), 600)
                // Vue.set(transferData, 'snapOn', 'self')
                // data.length = 0
                // Vue.set(refObject, 'snapOn', 'none')
                // Vue.set(transferData, 'snapOn', 'self')
            }
        },
        mapNextLetter(data) {
            let result = map(data, (item, index, array) => {
                if (index == array.length - 1) {
                    item.$next_letter = array[4].first_letter
                } else if (index === 3) {
                    item.$next_letter = array[5].first_letter
                } else if (index === 4) {
                    item.$next_letter = first(array).first_letter
                } else {
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
