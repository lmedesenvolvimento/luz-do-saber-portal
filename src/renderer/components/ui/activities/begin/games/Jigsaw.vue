<template>
    <div class="jigsaw container-fluid">
        <b-row class="jigsaw-container" align-h="center" align-v="center">
            <b-col class="dragzone">
                <b-row align-h="center" align-v="center">
                    <ls-card-display>
                        <div class="drag-container">
                            <div
                                v-for="key in activeCards"
                                :key="key.id"
                                :style="key.style"
                                class="draggable"
                            >
                                <drag
                                    :data-transfer="key"
                                    :snap-on="key.snapOn"
                                    :dropped="key.dropped"
                                >
                                    <div class="peca">
                                        <div
                                            class="total"
                                            :class="'p' + key.id"
                                        >
                                            <div class="inicial">
                                                {{ inicial }}
                                            </div>
                                            <div class="name">{{ name }}</div>
                                        </div>
                                    </div>
                                </drag>
                            </div>
                        </div>
                    </ls-card-display>
                </b-row>
            </b-col>
            <b-col class="dropzone">
                <b-row align-h="center" align-v="center">
                    <div class="pecas">
                        <div
                            v-for="(key, index) in cards"
                            :key="index"
                            class="drop-container"
                            :class="[cards[index].class, 'p' + key.id]"
                        >
                            <drop
                                :expected="key"
                                @ondropEvent="onDrop"
                                @onhoverEvent="lightEl"
                                @onhoverEndEvent="darkEl"
                            >
                                <div class="peca">
                                    <div
                                        class="total"
                                        :class="'p' + key.value_ids"
                                    >
                                        <div class="inicial">{{ inicial }}</div>
                                        <div class="name">{{ name }}</div>
                                    </div>
                                </div>
                            </drop>
                        </div>
                    </div>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// import Item from '@/components/ui/items/Item'
import { every } from 'lodash'
import {
    ListMixin,
    MapMixins,
    CreateAnswersMixins,
    createAnswer
} from '@ui/activities/mixins'
import Drag from '@ui/items/Drag'
import Drop from '@ui/items/Drop'
import interact from 'interactjs'
import ui from '@/components/ui'

import { mapActions } from 'vuex'

export default {
    components: {
        Drag,
        Drop,
        ...ui
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data() {
        return {
            cards: [
                {
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {
                        left: 0,
                        top: 0,
                        'z-index': 0,
                        transform: 'translate(465.25px, 41.25px)'
                    },
                    snapOn: '',
                    id: 0,
                    value_ids: 0
                },
                {
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {
                        left: '190px',
                        top: '190px',
                        'z-index': 0,
                        transform: 'translate(457.75px, -148.75px)'
                    },
                    snapOn: '',
                    id: 1,
                    value_ids: 1
                },
                {
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {
                        left: '190px',
                        top: '40px',
                        'z-index': 0,
                        transform: 'translate(275.25px, 123.75px)'
                    },
                    snapOn: '',
                    id: 2,
                    value_ids: 2
                },
                {
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {
                        left: 0,
                        top: '150px',
                        'z-index': 0,
                        transform: 'translate(647.75px, 13.75px)'
                    },
                    snapOn: '',
                    id: 3,
                    value_ids: 3
                }
            ],
            dragging: false
        }
    },
    computed: {
        activeCards: function() {
            return this.cards
        }
    },
    created() {
        // cria um array de respostas/letras que somem. drop usado por primeira letra nunca pode sumir
        this.inicial = this.activity.items.keys[0].text
        this.name = this.activity.items.values[0].text
        setTimeout(() => {
            let cards = this.cards
            for (let i = 0; i < cards.length; i++) {
                setTimeout(function timer() {
                    cards[i].class = 'droppable'
                    cards[i].dropped = false
                    cards[i].snapOn = 'self'
                    cards[i].style.transform = 'translate(0,0)'
                }, i * 300)
            }
        }, 1800)

        //seta as respostas
        this.setAnswersArray()
        this.setActivityAttrs({ total_correct_items: 1 })
    },
    methods: {
        setAnswersArray() {
            let answers = []
            let key = {
                id: 1
            }
            let value = 1

            answers[0] = createAnswer(key, value)

            this.setAnswers(answers)
        },

        onDrag(index, transferData, nativeElement) {
            let card = this.cards[index]
            card.dragging = true
        },
        onDragEnd(index, transferData, nativeElement) {
            let card = this.cards[index]

            if (transferData.valid) {
                if (every(this.cards, 'dropped'))
                    setTimeout(() =>
                        this.setAnswer({
                            type: 'value',
                            data: 1,
                            vm: this
                        })
                    )
            }
            if (transferData.invalid) {
                setTimeout(() => {
                    card.dragging = false
                    transferData.invalid = false
                }, 600)
            } else {
                card.dragging = false
            }
        },
        lightEl(event, isFull) {
            let parent = event.currentTarget.parentElement
            parent.style.filter = 'grayscale(50%)'
            parent.style.opacity = 0.6
            if (isFull === 'full') {
                parent.style.filter = 'grayscale(0%)'
                parent.style.opacity = 1
            }
        },
        darkEl(event) {
            let parent = event.currentTarget.parentElement
            parent.style.filter = 'grayscale(100%)'
            parent.style.opacity = 0.3
        },
        onDrop(event, correct, dropped) {
            let card = correct
            let transferData = this.cards.find((c) => c.id === dropped[0].id)
            if (card.dropped) return false
            console.log(this.cards.filter((c) => c.dropped))
            this.lightEl(event, 'full')
            this.dragging = true
            transferData.dropped = true
            transferData.snapOn = 'dropzone'

            if (correct.id === transferData.id) {
                card.class = 'success'
                transferData.valid = true
                this.dragging = false
                this.onDragEnd(
                    transferData.id,
                    transferData,
                    event.relatedTarget
                )
            } else {
                // correct.value_ids = transferData.id
                card.class = 'fail'
                setTimeout(() => {
                    card.class = 'droppable'
                    // correct.value_ids = correct.id
                    this.darkEl(event)
                    transferData.snapOn = 'self'
                    transferData.dropped = false
                    this.dragging = false
                    dropped.length = 0
                }, 1200)
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })

                transferData.invalid = true
            }
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    }
}
</script>

<style></style>
