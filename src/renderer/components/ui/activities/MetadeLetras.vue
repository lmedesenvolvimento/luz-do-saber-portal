<template>
    <div>
        <b-row>
            <b-col
                v-for="item in activity.items.values" 
                :key="item.id" 
                cols="2"
            >
                <ls-card-input-text
                    v-if="item.hide"
                    name="base-input" 
                    :value="item"
                    type="value"
                />

                <ls-card-display v-if="!item.hide">{{ item.text }}</ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import { sampleSize, drop, range } from 'lodash'
import form from '../form'

import { mapActions } from 'vuex'

export default {
    components: { ...form },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    created(){
        //definindo quantidade de respostas. se par, 50% das letras somem, se impar 50% arredondado pra baixo + 1
        let size = (this.activity.items.keys.length % 2 === 0) ? this.activity.items.keys.length / 2 : Math.floor(this.activity.items.keys.length / 2) + 1
        // cria um array de respostas/letras que somem. drop usado por primeira letra nunca pode sumir
        let keys = sampleSize(drop(this.activity.items.keys), size)

        // percorre todo o tamanho de respostas
        range(0, keys.length).forEach(i => {
            for (let item in this.activity.items.keys){
                if (keys[i] === this.activity.items.keys[item])
                    // esconde as letras selecionadas
                    this.activity.items.values[item].hide = true
            }
        })

        //seta as respostas
        this.setAnswersArray(keys)
        // atualiza total de respostas válidas
        this.setActivityAttrs({ total_correct_items: keys.length })
    },
    mounted(){
    },
    methods: {
        setAnswersArray(a){
            let answers = []

            a.forEach(a => {
                let key = createAnswer(a, a.value_ids[0])
                answers.push(key)
            })

            this.setAnswers(answers)
        },
        ...mapActions('Activity', ['setActivityAttrs'])
    }
}
</script>

<style>
</style>
