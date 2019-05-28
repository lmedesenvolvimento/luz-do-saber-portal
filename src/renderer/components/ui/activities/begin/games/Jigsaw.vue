<template>
    <div class="jigsaw container-fluid">
        <b-row class="jigsaw-container" align-h="center" align-v="center">
            <b-col class="dragzone">
                <b-row align-h="center" align-v="center">
                    <ls-card-display>
                        <div class="drag-container">
                            <div v-for="key in activeCards" :key="key.id" :style="cards[key.id].style" class="draggable">
                                <drag :transfer-data="key" :image-x-offset="cards[key.id].offsetX" :image-y-offset="cards[key.id].offsetY" :draggable="!dragging" @drag="onDrag(key.id, ...arguments)" @dragend="onDragEnd(key.id, ...arguments)">
                                    <template slot="image">
                                        <div class="peca">
                                            <div class="total" :class="'p'+key.id">
                                                <div class="inicial">{{ inicial }}</div>
                                                <div class="name">{{ name }}</div>
                                            </div>                                            
                                        </div>
                                    </template>
                                    <div class="peca">
                                        <div class="total" :class="'p'+key.id">
                                            <div class="inicial">{{ inicial }}</div>
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
                        <div v-for="(key, index) in cards" :key="index" class="drop-container" :class="[cards[index].class, 'p'+key.id]">
                            <drop @drop="onDrop(key, index,...arguments)">
                                <div class="peca">
                                    <div class="total" :class="'p'+key.value_ids">
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
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import { Drag, Drop } from 'vue-drag-drop'
import ui from '@/components/ui'

import { mapActions } from 'vuex'

export default {
    components: { 
        Drag,
        Drop,
        ...ui,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            cards: [
                { 
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {left: 0, top: 0},
                    offsetX: 35,
                    offsetY: 35,
                    id:0, 
                    value_ids: 0
                },
                { 
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {left: '190px', top: '190px'},
                    offsetX: 215,
                    offsetY: 35,
                    id:1, 
                    value_ids: 1
                },
                { 
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {left: '190px', top: '40px'},
                    offsetX: 35,
                    offsetY: 155,
                    id:2, 
                    value_ids: 2
                },
                { 
                    class: 'static',
                    dragging: false,
                    dropped: true,
                    style: {left: 0, top: '150px'},
                    offsetX: 215,
                    offsetY: 155,
                    id:3, 
                    value_ids: 3
                }
            ],
            dragging: false
        }
    },
    computed: {
        activeCards: function() {
            return this.cards.filter(function(c) {
                return !c.dropped
            })
        }
    },
    created(){
        // cria um array de respostas/letras que somem. drop usado por primeira letra nunca pode sumir
        this.inicial = this.activity.items.keys[0].text;
        this.name = this.activity.items.values[0].text;
        setTimeout(()=> {
            let cards = this.cards
            for(let i = 0; i< cards.length; i++){
                setTimeout( function timer(){
                    cards[i].class = 'droppable'
                    cards[i].dropped = false
                }, i*300 )
                
            }
        },1800)

        //seta as respostas
        this.setAnswersArray()
        this.setActivityAttrs({ total_correct_items: 1 })
    },
    methods: {
        setAnswersArray(){
            let answers = []
            let key = {
                id: 1
            }
            let value = 1

            answers[0] = createAnswer(key, value)

            this.setAnswers(answers)
        },


        onDrag(index, transferData, nativeElement){
            let card = this.cards[index]
            card.dragging = true
        },
        onDragEnd(index, transferData, nativeElement){
            let card = this.cards[index]

            if (transferData.valid) {
                card.dropped = true
                if(every(this.cards, 'dropped'))
                    setTimeout(() =>
                        this.setAnswer({ 
                            type: 'value',
                            data: 1,
                            vm: this
                        }))
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
        onDrop(key, index, transferData, nativeElement){
            let card = this.cards[index]
            if (card.dropped) 
                return false
            this.transferData = transferData
            this.dragging = true

            if ( key.id === transferData.id ) {
                card.class='success'                
                transferData.valid = true
                this.dragging = false
            } else {          
                key.value_ids = transferData.id
                card.class='fail'
                setTimeout(() => {
                    card.class='droppable'
                    key.value_ids = key.id
                    this.dragging = false
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

<style>
</style>
