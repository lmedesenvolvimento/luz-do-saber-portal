<template>
    <div>
        Bingo! {{ countDown }}s <br>
        
        Alphabet: <br>
        [{{ alphabet.map(l => l.letter).join(', ') }}] <br>

        Sorted: <br>
        [{{ sorted.map(l => l.letter).join(', ') }}]
    </div>
</template>
<script>
import { sample, debounce } from 'lodash'
import  { alphabet } from '@/constants'

const TIMEOUT = 5

export default {
    data(){
        return {
            sorting: true,
            countDown: TIMEOUT,
            countDownId: null,
            alphabet: alphabet.map((l, index) => {
                return {
                    id: index,
                    letter: l
                }
            })
        }
    },
    computed: {
        sorted() {
            return this.alphabet.filter(l => l.sorted)
        }
    },
    mounted() {
        this.start()
    },
    destroyed(){
        clearInterval(this.countDownId)
    },
    methods: {
        sort() {
            const letters = this.alphabet.filter(l => !l.sorted)
            const sorted = sample(letters)
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
        }, 3000)
    }
}
</script>

<style>
</style>

