<template>
    <div id="bingo">
        <div class="container-fluid">
            <b-row align-v="center">
                <b-col>
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
                        <div v-for="(l, index) in alphabet" :key="index" class="bingo-sorted-letter" :class="{'is-sorted': l.sorted}">
                            {{ l.text }}
                        </div>
                    </div>
                </b-col>
                <b-col cols="9">
                    <div class="bingo-opponents container-fluid">
                        <ls-card-display bg-color="#FFB147">
                            Sua Cartela
                            <div v-for="key in getKeys" :key="key.id" class="row bingo-player-letters">
                                <div v-for="(l, index) in splitLetters(key.text)" :key="index.toString()" class="bingo-player-letter">
                                    <div class="item">
                                        <div class="letra texto medium">
                                            <div :id="`input-${index}`" class="card-input card--radio-input">
                                                <b-card 
                                                    no-body
                                                    :class="{ 'invalid': getLetter(l).invalid, 'valid': getLetter(l).valid }"
                                                    @click.stop="validateLetter(l)"
                                                >
                                                    <b-card-body>
                                                        {{ getLetter(l).text }}
                                                    </b-card-body>
                                                </b-card>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </ls-card-display>
                        
                        <ls-card-display v-for="value in opponents" :key="value.id"> 
                            <div class="row bingo-opponents-letters">
                                <div v-for="(l, index) in splitLetters(value.text)" :key="index.toString()" class="bingo-opponents-letter">
                                    <div class="item">
                                        <div class="letra texto medium">
                                            <ls-card-display :valid="getLetter(l).sorted">
                                                {{ getLetter(l).text }}
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
import { mapActions } from 'vuex'
import { 
    find, 
    flattenDeep, 
    sample, 
    debounce, 
    pick, 
    uniq, 
    deburr, 
    clone,
    range
} from 'lodash'

import  { alphabet, alphabet_with_acents } from '@/constants'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'

import ui from '@/components/ui'

const TIMEOUT = 5

export default {
    components: {
        ...ui
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            sorting: true,
            sorted: null,
            sorter: null,
            countDown: TIMEOUT,
            countDownId: null,
            balls: range(0, 6),
            alphabet: alphabet.map((l, index) => {
                return {
                    id: index,
                    text: l
                }
            })
        }
    },
    computed: {
        sortLetters(){
            const keyLetters = this.getKeys.map(({ text }) => {
                return deburr(text).split('')
            })

            const valueLetters = this.getValues.map(({ text }) => {
                return deburr(text).split('')
            })

            const flattenValues = flattenDeep(valueLetters)
            const flattenKeys = flattenDeep(keyLetters)

            const letters = uniq([...flattenKeys, ...flattenValues])
            
            return this.alphabet.filter(({ text }) => {
                return letters.includes(text)
            })
        },
        playerLetters() {
            return this.getKeys.map((l) => l.text)
        },
        opponents() {
            return this.getValues.filter((value) => !value.key_id)
        }
    },
    watch: {
        sortLetters: {
            handler(letters) {
                this.handlerSortLetters(letters)
            },
            immediate: true
        }
    },
    created() {
        this.mapKeyLetters()
        this.mapValueLetters()
        this.createAnswersArray()
        this.sorter = setTimeout(this.start, 3000)
    },
    beforeDestroy(){
        this.clearAll()
    },
    methods: {
        sort() {
            let letters
            
            // Recebendo todas as letras do jogador
            letters = this.sortLetters.filter(l => {
                return this.playerLetters.includes(l.text) && !l.sorted
            })
            

            // Caso todas de seu nome já tenha sido sorteada
            if (letters.every(l => l.sorted)) {
                letters = this.sortLetters.filter(l => !l.sorted) // sorteia as demais
            }
            
            const sorted = sample(letters)

            if (!sorted) {
                return
            }

            sorted.sorted = true

            this.sorted = sorted.text
            this.$set(this.alphabet, sorted.id, sorted)

            // Verificando se algum oponente já ganhou
            const isOpponentWon = this.validateOpponent()

            if (isOpponentWon) {
                setTimeout(() => {
                    // Exibindo o alerta de questão não resolvida
                    this.$store.dispatch('Activity/triggerSuccess', 0)
                }, 1000)

                // Matando Threads
                this.clearAll()

                return
            }
        },
        countdown(){
            if (!this.sorting) {
                return
            }

            if (this.countDown <= 1) {
                // reniciando contador
                this.countDown = TIMEOUT
                // sorteando letra
                this.sort()
                // matando threads
                this.clear()                
                return
            }

            this.countDown--
        },
        clear() {
            if (!this.sorting) {
                return
            }

            clearInterval(this.countDownId)

            this.sorting = false
            // reniciando sorteio
            this.sorter = setTimeout(this.start, 3000)
        },
        clearAll() {
            // Limpando Thread contador e sorteio em andamento
            clearInterval(this.countDownId)
            clearTimeout(this.sorter)

            this.sorting = false
            this.sorter = null
            this.countDownId = null
        },
        start() {
            this.sorting = true
            this.sorted = null
            this.countDownId = setInterval(this.countdown, 1000)
        },
        
        mapKeyLetters() {
            this.activity.items.keys.forEach(key => {
                const { letters } = key
                this.alphabet.forEach(letter => {
                    const isPresent = letters.map(l =>  l.text).includes(letter.text)
                    letter.key = isPresent ? true : false
                })
            })
        },
        mapValueLetters() {
            this.activity.items.values.forEach(value => {
                const { letters } = value
                this.alphabet.forEach(letter => {
                    const isPresent = letters.map(l =>  l.text).includes(letter.text)
                    letter.value = isPresent ? true : false
                })
            })
        },
        splitLetters (text) {
            return deburr(text).split('')
        },
        getLetterIndexOf(text) {
            return this.alphabet.findIndex(l => {
                return l.text === text
            })
        },
        getLetter(text) {
            const indexOf = this.getLetterIndexOf(text)
            return this.alphabet[indexOf] || {}
        },
        validateLetter(text) {
            let valid = []
            const letter = this.getLetter(text)
            const alphabet = clone(this.alphabet)
            
            this.getKeys.forEach((key) => {
                valid.push(letter.sorted)
            })

            const indexOf = this.getLetterIndexOf(text)

            if (valid.every(i => !!i)) {
                alphabet[indexOf].valid = true
            } else {
                alphabet[indexOf].invalid = true
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: {}
                })
            }


            this.$set(this, 'alphabet', alphabet)

            setTimeout(() => {
                if (alphabet[indexOf].invalid) {
                    delete alphabet[indexOf].invalid
                }
            }, 1000)
        },
        validateOpponent(){
            const opponents = this.opponents.map((o) => {
                return this.splitLetters(o.text).map((l) => this.getLetter(l))
            })

            return opponents.some((o) => {
                return o.every((l) => l.sorted)
            })
        },
        handlerSortLetters(letters) {
            const keyLetters = this.getKeys.map(({ text }) => {
                return deburr(text).split('')
            })

            const flattenKeys = flattenDeep(keyLetters)

            const keys = letters.filter(l => {
                return flattenKeys.includes(l.text)
            })

            const isValid = keys.every(({ valid }) => valid)

            if (isValid) {
                const correctValue = find(this.getValues, (v) => v.key_id)
                this.setAnswer({
                    type: 'value',
                    data: correctValue.id,
                    vm: {}
                })
                this.clearAll()
            }
        },
        ...mapActions('Activity', ['setAnswer'])
    }
}
</script>

<style lang="scss">
@import '~animate-scss/_properties';
@import '~animate-scss/_attention-seekers/attention-seekers';

#bingo {
    height: 100%;
    >.container-fluid, > .container-fluid > .row {
        height: 100%;
    }
    .bingo {
        &-opponents, &-player {
            &-letters {
                justify-content: center;
            }
            &-letter {
                padding-right: $gutter-size;
                padding-left: $gutter-size;
            }
            .card .card-body {
                .card:hover, .card:active {
                    cursor: pointer;
                }
                .card-body {
                    color: $text-color !important;
                }
            }
        }
        &-glob {
            position: relative;
            width: 100%;
            &-glass {
                display: block;
                background: url('~@/assets/images/components/bingo/globo-bingo.png') no-repeat;
                background-size: contain;
                background-position: center;
                width: 100%;
                height: 100%;
                padding-top: 100%;
            }
            &-painel {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                background: url('~@/assets/images/components/bingo/painel-bingo.png') no-repeat;
                background-position: center;
                background-size: contain;
                z-index: 2;
                span {
                    margin: auto;
                    font-size: 24px;
                }
                &-sorted-letter{
                    @include pulse(
                        $duration: 1s,
                        $count: 3
                    )
                }
            }
            &-balls {
                position: absolute;
                width: 110px;
                height: 110px;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
            &-ball {
                position: absolute;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/components/bingo/bola-bingo.png') no-repeat;
                background-position: center;
                background-size: contain;
                opacity: 0;
                z-index: 1;
                @for $i from 0 through 10  {
                    transition: all 1s;
                    &:nth-child(#{$i}) {                        
                        animation: molecules-balls-animation-#{$i} 5s ( $i * 0.1s ) ease alternate-reverse infinite;
                    }
                }                
            }
        }
        &-sorted-letters {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            margin: 2rem 0px;
        }
        &-sorted-letter {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background-color: #ccc;
            color: white;
            margin: 0.25rem;
            border-radius: 50%;
            box-sizing: border-box;
            &.is-word {
                display: inline-flex;
                width: auto;
                padding-left: 8px;
                padding-right: 8px;
                border-radius: 1rem;
            }
            &.is-sorted {
                background-color: cyan;   
            }
        }
    }    
}
</style>