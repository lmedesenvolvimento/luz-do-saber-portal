<template>
    <b-container fluid>
        <b-row class="write-word">
            <b-col cols="3" />
            <b-col>
                <b-row v-if="hasKeys" class="activity-keys">
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item">
                        <ls-card-audio-listen-with-player
                            :item="item"
                            :uri="item.audios.length ? item.audios[0].url : ''"
                            :template="activity.item_template.key"
                        >
                            <async-image :src="item.images.length ? item.images[0].url : ''" :alt="getKeys[0].text" />
                        </ls-card-audio-listen-with-player>
                    </b-col>

                    <b-col
                        :class="{
                            'flex-4': getValues.length >= 12
                        }"
                        class="activity-values"
                    >
                        <div class="card-input card--input-text mt-2">
                            <label>
                                <b-card
                                    no-body
                                    class="write-card"

                                    :class="{ 'invalid': answer.invalid, 'valid': answer.valid }"
                                >
                                    <b-card-body>
                                        <input
                                            id="text-input"
                                            v-model="answer.text"
                                            type="text"
                                            :maxlength="totalLetters"
                                            :disabled="answer.valid"
                                            autocomplete="off"
                                            required
                                            @input="checkAnswerInput()"
                                            @keyup.enter="checkAnswer()"
                                            @blur="checkAnswer()"
                                        />
                                    </b-card-body>
                                </b-card>
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </b-col>            
            <b-col>
                <ls-card-display class="wrong-words-display">
                    <p>palavras erradas:</p>

                    <div class="wrong-words-list">
                        <span v-for="word in wrongWords" :key="word.id" class="wrong-word" :class="{ 'minimize' : word.text.length > 6 }">
                            <div class="fail-feedback"></div>
                            <div class="fail-text">{{ word.text }}</div>
                        </span>
                    </div>
                </ls-card-display>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Vue from 'vue'
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ItemComponents from '@ui/form/index.js'
import AsyncImage from '@ui/AsyncImage'
import { mapState, mapActions } from 'vuex'
import { max } from 'moment'

export default {
    components: {
        ...ItemComponents,
        AsyncImage
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data() {
        return {
            answer: {
                text: '',
            },
            wrongWords: [],
            totalLetters: 0,
            initialID: 0,
            maxListLength: 6
        }
    },
    computed: {
        ...mapState('Activity', ['answers']),
    },
    mounted() {
        this.totalLetters = this.activity.items.values[0].total_letters // Campo input tem o tamanho da palavra correta
        this.createAnswersArray()

    },
    destroyed() {
        this.wrongWords.length = 0 // Zera o array de palavras erradas
    },
    methods: {
        checkAnswerInput(){
            let textItemNormal = this.getValues[0].text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            let rxp = /^\S(?!\s*$).+/
            
            if (event.target.value.length >= textItemNormal.length) {
                if (rxp.test(this.answer.text)) {
                    // Checa se a palavra escrita é idêntica a resposta correta
                    if (this.answer.text.toLowerCase() === this.getValues[0].text.toLowerCase() || 
                        this.answer.text.toLowerCase() === textItemNormal.toLowerCase()) {
                        Vue.set(this.answer, 'valid', true)
                        
                        setTimeout(() => {
                            this.setAnswer({
                                type: 'value',
                                data: this.getValues[0].id,
                                vm: {}
                            })
                        }, 1000)

                        return
                    }
                    this.wrongWords.push({ text: this.answer.text, id: this.initialID })
                    this.initialID++
                    const ids = this.wrongWords.map(({ id }) => id)
                    if(this.wrongWords.length > this.maxListLength) {
                        this.wrongWords.shift()
                        if(this.initialID > this.maxListLength) this.initialID = 0
                    }
                    Vue.set(this.answer, 'invalid', true)
                    
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: {}
                    })

                    setTimeout(() => {
                        this.answer.text = ''
                        Vue.set(this.answer, 'invalid', false)
                    }, 1000)

                    return
                } else {
                    this.answer.text = ''
                }
            }
               
        },
        checkAnswer() {
            let textItemNormal = this.getValues[0].text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            let rxp = /^\S(?!\s*$).+/

            if (rxp.test(this.answer.text)) {
                // Checa se a palavra escrita é idêntica a resposta correta
                if (this.answer.text.toLowerCase() === this.getValues[0].text.toLowerCase() || 
                    this.answer.text.toLowerCase() === textItemNormal.toLowerCase()) {
                    Vue.set(this.answer, 'valid', true)
                    
                    setTimeout(() => {
                        this.setAnswer({
                            type: 'value',
                            data: this.getValues[0].id,
                            vm: {}
                        })
                    }, 1000)

                    return
                }
                this.wrongWords.push({ text: this.answer.text, id: this.initialID })
                this.initialID++
                const ids = this.wrongWords.map(({ id }) => id)
                if(this.wrongWords.length > this.maxListLength) {
                    this.wrongWords.shift()
                    if(this.initialID > this.maxListLength) this.initialID = 0
                }
                Vue.set(this.answer, 'invalid', true)
                
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: {}
                })

                setTimeout(() => {
                    this.answer.text = ''
                    Vue.set(this.answer, 'invalid', false)
                }, 1000)

                return
            } else {
                this.answer.text = ''
            }
        },
        ...mapActions('Activity', ['setAnswer'])
    },
}
</script>

<style lang="scss">
.write-word {
    justify-content: flex-end;
    width: auto;

    .write-card{
        .invalid {
            .card-body {
                transition-delay: 5s;
            }
        }
    }

    .image img{
        width: auto;
        height: 200px;
    }

    .wrong-words-display {
        padding-top: 0px;
        .card {
            width: 180px;
            height: 400px;
        }

        .card-body {
            height: 393px;
        }
        
        .card-body {
            background-color: #fafafa;
            font-size: 16px;
            .wrong-word {
                margin-top: 8px;
            }
        }
        .wrong-words-list{
            padding-left: 10px;
        }
        .wrong-word {
            height: 42px;
            position: relative;
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding-left: 17px;
            .fail-feedback {
                display: inline-flex;
                background-image: url('~@/assets/images/icons/fail.png');
                opacity: 0.7;
                background-size: 22px 23px;
                width: 22px;
                height: 23px;
                position: absolute;
                left: 0;
            }
            .fail-text {
                width: 90px;
            }
            &.minimize {
                font-size: 19px;
            }
        }
    }
}
</style>