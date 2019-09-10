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
                        <span v-for="word in wrongWords" :key="word">{{ word }}</span>
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
import { clearInterval, setTimeout, clearTimeout } from 'timers';

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
        }
    },
    computed: {
        ...mapState('Activity', ['answers']),
    },
    mounted() {
        this.totalLetters = this.activity.items.values[0].total_letters; // Campo input tem o tamanho da palavra correta
        this.createAnswersArray();

    },
    destroyed() {
        this.wrongWords.length = 0; // Zera o array de palavras erradas
    },
    methods: {
        checkAnswer() {
            if (this.answer.text != '' && this.answer.text != null) {
                if (this.answer.text === this.getValues[0].text.toLowerCase()) {
                    Vue.set(this.answer, 'valid', true)
                    
                    setTimeout(() => {
                        this.setAnswer({
                            type: 'value',
                            data: this.getValues[0].id,
                            vm: this.answer
                        })
                    }, 2000)

                } else if (!this.wrongWords.includes(this.answer.text)) {
                    this.wrongWords.push(this.answer.text)
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: this.answer
                    })

                    this.answer.text = ''
                }

            }
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    },
}
</script>

<style lang="scss">
.write-word {
    justify-content: flex-end;
    width: auto;

    .image img{
        width: auto;
        height: 200px;
    }

    .wrong-words-display {
        .card {
            width: 180px;
            height: 350px;
        }

        .card-body {
            height: 340px;
        }
        
        .card-body {
            background-color: #fafafa;
            font-size: 16px;
            
            span {
                margin-top: 5px;
                display: block;
            }
        }
    }
}
</style>