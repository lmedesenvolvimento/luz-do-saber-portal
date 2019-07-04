<template>
    <div class="container-fluid">
        <b-row class="write-word">
            <b-col class="col-sm-4">
                <b-row v-if="hasKeys" class="activity-keys">
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item">
                        <!-- <Item
                            v-if="answers"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        /> -->
                        <ls-card-audio-listen-with-player
                            :item="item"
                            :template="activity.item_template.key"
                        >
                            <img src="https://picsum.photos/300/200" alt="">
                            <!-- {{ item.letters[0].text }} -->
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
                                            v-model="answer.text"
                                            v-focus="true"
                                            type="text"
                                            :maxlength="totalLetters"
                                            autocomplete="off"
                                            required
                                            @keyup.enter="checkAnswer(...arguments, getValues)"
                                        />
                                    </b-card-body>
                                </b-card>
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="col-sm-4">
                <ls-card-display class="wrong-words-display">
                    <p>palavras erradas:</p>

                    <div class="wrong-words-list">
                        <span v-for="word in wrongWords" :key="word">{{ word }}</span>
                    </div>
                </ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ItemComponents from '@ui/form/index.js'

export default {
    components: {
        ...ItemComponents,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data() {
        return {
            answer: {text: ''},
            wrongWords: [],
            totalLetters: 0,
        }
    },
    mounted() {
        this.totalLetters = this.activity.items.values[0].total_letters;
    },
    destroyed() {
        this.wrongWords.length = 0;
    },
    methods: {
        checkAnswer(event, values) {
            event.preventDefault();

            let answer = this.answer.text.toLowerCase();

            if (answer === values[0].text.toLowerCase()) {
                console.log('Reposta: ' + values[0].text);
            } else if (!this.wrongWords.includes(answer)) {
                this.wrongWords.push(answer);
            }

            this.answer.text = '';

            // this.setAnswer({
            //     data: value.id,
            //     type: 'value',
            //     vm: this.answer
            // })
        }
    },
}
</script>