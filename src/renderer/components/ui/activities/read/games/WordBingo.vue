<template>
    <div id="bingo" class="word-bingo">
        <div class="container-fluid">
            <b-row>
                <b-col align-self="center">
                    <div class="bingo-glob">
                        <div class="bingo-glob-glass"></div>
                        <div class="bingo-glob-painel">
                            <span v-if="sorted" class="bingo-glob-painel-sorted-letter">{{ sorted }}</span>
                            <span v-else>{{ countDown }}</span>
                        </div>
                        <div class="bingo-glob-balls">
                            <div v-for="ball in balls" :key="ball" class="bingo-glob-ball"></div>
                        </div>
                    </div>                    
                    <div class="bingo-sorted-letters">
                        <div v-for="(l, index) in alphabet" :key="index" class="bingo-sorted-letter is-word" :class="[{'is-sorted': l.sorted}]">
                            {{ l.text }}
                        </div>
                    </div>
                </b-col>
                <b-col cols="9">
                    <div class="bingo-opponents container-fluid">
                        <ls-card-display bg-color="#FFB147">
                            Sua Cartela
                            <div class="row bingo-player-letters">
                                <div v-for="(key, index) in getKeys" :key="key.id" class="bingo-player-letter">
                                    <div class="item">
                                        <div class="letra texto medium" :class="[key.type]">
                                            <div :id="`input-${index}`" class="card-input card--radio-input">
                                                <b-card 
                                                    no-body
                                                    :class="{ 'invalid': getLetter(key.text).invalid, 'valid': getLetter(key.text).valid }"
                                                    @click.stop="validateLetter(key.text)"
                                                >
                                                    <b-card-body>
                                                        {{ key.text }}
                                                    </b-card-body>
                                                </b-card>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </ls-card-display>
                        
                        <ls-card-display v-for="(opponent, index) in opponents" :key="index.toString()"> 
                            <div class="row bingo-opponents-letters">
                                <div v-for="value in opponent" :key="value.id" class="bingo-opponents-letter">
                                    <div class="item">
                                        <div class="texto medium" :class="[value.type]">
                                            <ls-card-display :valid="getLetter(value.text).sorted">
                                                {{ value.text }}
                                            </ls-card-display>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ls-card-display>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import { 
    chunk,
    flattenDeep, 
    shuffle,
    uniq, 
} from 'lodash'

import Bingo from '@/components/ui/activities/begin/games/Bingo'

export default {
    extends: Bingo,
    data() {
        return {
            alphabet: []
        }
    },
    computed: {
        sortLetters(){                        
            return this.alphabet
        },
        opponents() {
            return this.shuffleOpponentsCard()
        },
        totalOpponentsPerCard() {
            // O número de itens por cartela é baseado no total de itens que o jogador vai ter
            return this.getValues.filter((value) => value.key_id).length
        }
    },    
    created() {
        const keyLetters = this.getKeys.map(({ text }) => {
            return text
        })

        const valueLetters = this.getValues.map(({ text }) => {
            return text
        })

        const flattenValues = flattenDeep(valueLetters)
        const flattenKeys = flattenDeep(keyLetters)

        const letters = uniq([...flattenKeys, ...flattenValues])

        this.alphabet = letters.map((l, index) => {
            return {
                id: index,
                text: l
            }
        })
    },
    methods: {
        handlerSortLetters(letters) {
            const keyLetters = this.getKeys.map(({ text }) => {
                return text
            })

            const flattenKeys = flattenDeep(keyLetters)

            const keys = letters.filter(l => {
                return flattenKeys.includes(l.text)
            })

            const isValid = keys.length && keys.every(({ valid }) => valid)

            if (isValid) {
                const correctValues = this.getValues.filter((v) => v.key_id)
                
                correctValues.forEach(({ id }) => {
                    this.setAnswer({
                        type: 'value',
                        data: id,
                        vm: {}
                    })
                })
                
                this.clearAll()
            }
        },
        shuffleOpponentsCard() {
            // Debug
            // console.log('shuffleOpponentsCard', new Date)

            const shuffleValues = shuffle(this.getValues)

            const opponents = chunk(shuffleValues, this.totalOpponentsPerCard)

            if (this.getValues.length <= this.totalOpponentsPerCard) {
                return opponents
            }

            const hasEqualCard = opponents.some((opponent) => {
                return opponent.map(({ text }) => text) === this.getKeys.map(({ text }) => text)
            })

            if (hasEqualCard) {
                return this.shuffleOpponentsCard()
            }

            return opponents
        }
    },
}
</script>

<style lang="scss">
</style>
