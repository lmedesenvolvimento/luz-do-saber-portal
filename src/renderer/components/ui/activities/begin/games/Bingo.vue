<template>
    <div v-if="ready" id="bingo">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <p>
                        Bingo! 
                        <span class="countdown" :class="{'is-sorting': sorting}">{{ countDown }}s</span>
                    </p>
                    <p>
                        Alphabet: <br>
                        {{ alphabet.map(l => l.text).join(', ') }}
                    </p>
                </div>
                <div class="col">
                    <div class="bingo-opponents container-fluid">
                        bingo-opponents
                        <div v-for="value in getValues" :key="value.id" class="row">
                            <div v-for="(l, index) in value.text.split('')" :key="index.toString()" class="col-1">
                                <div class="bingo-opponent" :class="{'is-sorted': getLetter(l).sorted}">
                                    {{ getLetter(l).text }}
                                </div>
                            </div>
                        </div>                            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { find, flattenDeep, sample, debounce, pick, uniq } from 'lodash'
import  { alphabet, alphabet_with_acents } from '@/constants'

import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'

const TIMEOUT = 5

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            ready: false,
            sorting: true,
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
        sorted() {
            return this.alphabet.filter(l => l.sorted)
        },
        sortLetters(){
            const keyLetters = this.getKeys.map(({ letters }) => {
                return letters.map(l => l.text)
            })

            const valueLetters = this.getValues.map(({ letters }) => {
                return letters.map(l => l.text)
            })

            const flattenValues = flattenDeep(valueLetters)
            const flattenKeys = flattenDeep(keyLetters)

            const letters = uniq([...flattenKeys, ...flattenValues])
            
            return this.alphabet.filter(({ text }) => {
                return letters.includes(text)
            })
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

            sorted.sorted = true
            this.$set(this.alphabet, sorted.id, sorted)
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
        getLetter(text) {
            const indexOf = this.alphabet.findIndex(l => {
                return l.text === text
            })
            return this.alphabet[indexOf] || {}
        }
    }
}
</script>

<style lang="scss">
#bingo {
    .countdown:not(.is-sorting) {
        color: red;
    }
    .bingo-opponents {
        .bingo-opponent {
            &.is-sorted {
                color: green !important;
            }
        }
    }
}
</style>

