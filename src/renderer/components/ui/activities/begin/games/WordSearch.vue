<template>
    <div class="word-search container-fluid">
        <b-row class="word-container" align-h="center" align-v="center">
            <b-col class="word-canvas" @mouseleave="allowPainting(false)">
                <b-row align-h="center" align-v="center">
                    <ls-card-display>
                        <div class="grid">
                            <div
                                v-for="(r, index) in grid"
                                :key="index"
                                class="letters"
                            >
                                <div
                                    v-for="(l, letterIndex) in r"
                                    :key="letterIndex"
                                    :class="l.class"
                                    class="letter"
                                    :data-row="index"
                                    :data-letter="letterIndex"
                                    @mousedown="allowPainting(true)"
                                    @touchstart="allowPainting(true)"
                                    @mouseup="allowPainting(false)"
                                    @touchend="allowPainting(false)"
                                    @mousemove="paint(index, letterIndex)"
                                    @touchmove="(event) => touchPaint(event)"
                                >
                                    {{ l.value }}
                                </div>
                            </div>
                        </div>
                    </ls-card-display>
                </b-row>
            </b-col>
            <b-col class="clues">
                <b-row
                    v-for="(value, index) in items"
                    :key="index"
                    align-h="center"
                    align-v="center"
                >
                    <ls-card-display :valid="value.valid">
                        <div class="clue">
                            {{ value.text }}
                        </div>
                    </ls-card-display>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
// import Item from '@/components/ui/items/Item'
import { find } from 'lodash'
import {
    ListMixin,
    MapMixins,
    CreateAnswersMixins,
    createAnswer
} from '@ui/activities/mixins'
import ui from '@/components/ui'

import { mapState, mapActions } from 'vuex'

export default {
    components: { ...ui },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data() {
        return {
            grid: [],
            directions: [],
            allowPaint: false,
            actualWord: [],
            mouseDirection: '',
            previousI: 0,
            previousJ: 0,
            items: []
        }
    },
    computed: {
        ...mapState('Activity', ['activity', 'answers'])
    },
    created() {
        this.grid = this.createGrid(this.getValues)
        this.setActivityAttrs({ total_correct_items: this.getValues.length })
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        allowPainting(bool) {
            this.allowPaint = bool
            if (!bool && this.actualWord.length > 0) {
                let wordStr = this.actualWord.reduce(
                    (str, w) => `${str}${w.value}`,
                    ''
                )
                let answer = this.checkIfBelongs(wordStr)
                if (answer !== '') {
                    let rightItem = find(this.items, ['id', answer.id])
                    this.actualWord.map((w) => (w.class = 'valid'))
                    rightItem.valid = true
                    this.setAnswer({
                        data: answer.id,
                        type: 'value',
                        vm: answer
                    })
                    this.actualWord = []
                } else {
                    this.cleanActualWord()
                    this.setAnswer({
                        data: '',
                        type: 'value',
                        vm: this
                    })
                }
            }
        },
        checkIfBelongs(word) {
            let answer = ''
            for (let i = 0; i < this.getValues.length; i++) {
                if (
                    this.getValues[i].text === word ||
                    this.getValues[i].text === this.reverseString(word)
                ) {
                    answer = this.getValues[i]
                    break
                } else continue
            }
            return answer
        },
        touchPaint(event) {
            if (event.type === 'touchmove') {
                const element = document.elementFromPoint(
                    event.touches[0].pageX,
                    event.touches[0].pageY
                )
                this.paint(element.dataset.row, element.dataset.letter)
            }
        },
        paint(index, letter) {
            let srcElement = { indexi: index, indexj: letter }
            if (
                srcElement.indexi !== undefined ||
                srcElement.indexj !== undefined
            ) {
                let i = srcElement.indexi
                let j = srcElement.indexj
                let pi = this.previousI
                let pj = this.previousJ
                if (
                    this.grid[i][j].class !== 'painted' &&
                    this.grid[i][j].class !== 'valid'
                ) {
                    if (this.allowPaint) {
                        this.grid[i][j].class = 'painted'
                        this.actualWord.push(this.grid[i][j])
                        if (this.actualWord.length === 2) {
                            this.mouseDirection = this.checkMouseDirection(i, j)
                        } else if (this.actualWord.length > 2)
                            if (
                                this.mouseDirection !==
                                this.checkMouseDirection(i, j)
                            ) {
                                this.allowPainting(false)
                                this.cleanActualWord()
                            }
                        this.previousI = i
                        this.previousJ = j
                    }
                }
            }
        },
        createGrid(words) {
            let gridAux = []
            for (let i = 0; i < 11; i++) {
                gridAux[i] = []
                for (let j = 0; j < 11; j++) {
                    gridAux[i].push({
                        value: this.randomChar(),
                        class: '',
                        free: true
                    })
                }
            }
            for (let i = 0; i < words.length; i++) {
                this.items.push({
                    text: words[i].text,
                    valid: false,
                    id: words[i].id
                })
                this.putWord(words[i].text, gridAux)
            }

            return gridAux
        },
        cleanActualWord() {
            this.actualWord.map((w) => (w.class = ''))
            this.actualWord = []
        },
        checkMouseDirection(i, j) {
            let pI = this.previousI
            let pJ = this.previousJ
            if (i + 1 === pI && j === pJ) return 'up'
            else if (i - 1 === pI && j === pJ) return 'down'
            else if (j + 1 === pJ && i === pI) return 'left'
            else if (j - 1 === pJ && i === pI) return 'right'
            else return false
        },
        reverseString(str) {
            let splitString = str.split('')
            let reverseArray = splitString.reverse()
            let joinArray = reverseArray.join('')
            return joinArray
        },
        checkIfFits(g, b, t, w, d) {
            if (d === 'hor') {
                for (let l = 0; l < w.length; l++) {
                    if (!g[t][b + l].free) {
                        return false
                    }
                }
            } else if (d === 'ver') {
                for (let l = 0; l < w.length; l++) {
                    if (!g[b + l][t].free) {
                        return false
                    }
                }
            }
            return true
        },
        putWord(word, grid) {
            let dir = this.randomDirection()
            let check,
                maxIndex,
                beginIndex,
                transversal,
                tries = 0,
                maxTries = 10,
                reversed = false
            while (!check) {
                if (tries < maxTries) {
                    maxIndex = this.limit(grid, word)
                    beginIndex = this.getRandomInt(0, maxIndex)
                    transversal = this.getRandomInt(0, grid.length)
                    tries++
                    check = this.checkIfFits(
                        grid,
                        beginIndex,
                        transversal,
                        word,
                        dir
                    )
                } else if (!reversed) {
                    if (dir === 'hor') dir = 'ver'
                    else if (dir === 'ver') dir = 'hor'
                    tries = 0
                    reversed = true
                } else {
                    check = true
                }
            }
            if (check) {
                if (dir === 'hor') {
                    for (let l = 0; l < word.length; l++) {
                        let g = grid[transversal][beginIndex + l]
                        g.value = word[l]
                        g.free = false
                    }
                } else if (dir === 'ver') {
                    for (let l = 0; l < word.length; l++) {
                        let g = grid[beginIndex + l][transversal]
                        g.value = word[l]
                        g.free = false
                    }
                }
            }
        },
        limit(grid, word) {
            return grid.length - word.length
        },
        randomChar() {
            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let randomIndex = this.getRandomInt(0, alphabet.length)
            return alphabet[randomIndex]
        },
        getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min
        },
        randomDirection() {
            return Math.floor(Math.random() * 2) ? 'hor' : 'ver'
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    }
}
</script>
<style></style>
