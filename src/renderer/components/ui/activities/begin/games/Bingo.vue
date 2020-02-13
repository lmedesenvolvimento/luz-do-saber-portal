<template>
    <div v-if="ready" id="bingo">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <p>
                        Bingo! 
                        <span class="countdown" :class="{'is-sorting': sorting}">{{ countDown }}s</span>
                    </p>
                    <h2>
                        {{ sorted }}
                    </h2>
                    <p>
                        Alphabet: <br>
                        {{ alphabet.map(l => l.text).join(', ') }}
                    </p>
                </div>
                <div class="col-9">
                    <div class="bingo-opponents container-fluid">
                        <ls-card-display>
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
                </div>
            </div>
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
    clone
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
            ready: false,
            sorting: true,
            sorted: null,
            countDown: TIMEOUT,
            countDownId: null,
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
        opponents() {
            return this.getValues.filter((value) => !value.key_id)
        }
    },
    created() {
        this.mapKeyLetters()
        this.mapValueLetters()
        this.createAnswersArray()
        this.start()
    },
    mounted() {
        setTimeout(() => {
            this.ready = true
        }, 400)
    },
    destroyed(){
        clearInterval(this.countDownId)
    },
    methods: {
        sort() {
            const letters = this.sortLetters.filter(l => !l.sorted)
            const sorted = sample(letters)
            
            if (!sorted) {
                return
            }

            // console.log(sorted.id)

            this.sorted = sorted.text

            sorted.sorted = true
            this.$set(this.alphabet, sorted.id, sorted)
            // this.$set(this, 'sorted', sorted.id)
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
            clearInterval(this.countDownId)                                    
            this.sorting = false
            // reniciando sorteio
            this.start()
        },
        start: debounce(function(){
            console.log('Sorting...')
            this.sorting = true
            this.sorted = null
            this.countDownId = setInterval(this.countdown, 1000)
        }, 3000),
        
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
        ...mapActions('Activity', ['setAnswer'])
    }
}
</script>

<style lang="scss">
#bingo {
    .countdown:not(.is-sorting) {
        color: red;
    }
    .bingo-opponents, .bingo-player {
        &-letters {
            justify-content: center;
        }
        &-letter {
            padding-right: $gutter-size;
            padding-left: $gutter-size;
        }
    }
}
</style>

