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
                                            id="text-input"
                                            v-model="answer.text"
                                            type="text"
                                            :maxlength="totalLetters"
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

import { mapState, mapActions } from 'vuex'
import { clearInterval, setTimeout, clearTimeout } from 'timers';

export default {
    components: {
        ...ItemComponents,
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
    watch: {
        wrongWords() {
            console.log('Palavra errada');
        },
    },
    mounted() {
        this.totalLetters = this.activity.items.values[0].total_letters; // Campo input tem o tamanho da palavra correta
        this.createAnswersArray();
        
    },
    destroyed() {
        this.wrongWords.length = 0; // Zera o array de palavras erradas
    },
    methods: {
        waitForInput() {
            //* ESTE MÉTODO NÃO ESTÁ SENDO UTILIZADO NO MOMENTO
            //* NÃO APAGAR, AINDA PODE SER UTILIZADO

            // var vm = this;
            // var textInput = document.getElementById('text-input');

            // var timeout = null;

            // // Escutando por digitação no input
            // textInput.onkeyup = function (e) {

            //     // limpa o timeout se existir um, evitando vários timeouts rodando
            //     clearTimeout(timeout);

            //     // chama o método checkAnswer depois 5 mil milissegundos (5 segundos) sem resposta do usuário
            //     timeout = setTimeout(vm.checkAnswer, 5000);
            // };
        },
        checkAnswer() {
            if (this.answer.text != '' && this.answer.text != null) {
                if (this.answer.text === this.getValues[0].text.toLowerCase()) {
                    console.log('Reposta: ' + this.getValues[0].text.toLowerCase());
                    this.setAnswer({
                        type: 'value',
                        data: this.getValues[0].id,
                        vm: this.answer
                    });
                } else if (!this.wrongWords.includes(this.answer.text)) {
                    this.wrongWords.push(this.answer.text);
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: this.answer
                    });
                }
            }

            this.answer.text = '';
            
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    },
}
</script>