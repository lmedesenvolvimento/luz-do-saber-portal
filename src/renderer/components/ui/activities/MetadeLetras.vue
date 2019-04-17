<template>
    <div>
        <b-row>
            <b-col
                v-for="item in activity.items.keys" 
                :key="item.id" 
                cols="2"
            >
                <ls-card-input-text
                    v-if="item.hide"
                    name="base-input" 
                    :value="item" 
                    :max-length="1" 
                    type="value"
                />

                <ls-card-display v-if="!item.hide">{{ item.text }}</ls-card-display>
            </b-col>
        </b-row>

        <p v-for="(item, id) in answers" :key="id">{{ item }}</p>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import { sampleSize, drop, range } from 'lodash'
import form from '../form'

export default {
    components: { ...form },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            answers: []
        }
    },
    created(){
        //definindo quantidade de respostas. se par, 50% das letras somem, se impar 50% arredondado pra baixo + 1
        let size = (this.activity.items.keys.length % 2 === 0) ? this.activity.items.keys.length / 2 : Math.floor(this.activity.items.keys.length / 2) + 1
        // cria um array de respostas/letras que somem. drop usado por primeira letra nunca pode sumir
        let aux = sampleSize(drop(this.activity.items.keys), size)

        // percorre todo o tamanho de respostas
        range(0, aux.length).forEach(i => {
            for (let item in this.activity.items.keys){
                if (aux[i] === this.activity.items.keys[item])
                    // esconde as letras selecionadas
                    this.activity.items.keys[item].hide = true
            }
        })

        //guardando pra poder exibir como debug na tela 
        this.answers = aux

        //seta as respostas
        this.setAnswersArray(this.answers)
    },
    mounted(){
    },
    methods: {
        setAnswersArray(a){
            let answers = []

            a.forEach(a => {
                let aux = createAnswer(a, a.value_ids[0])
                answers.push(aux)
            })

            this.setAnswers(answers)
            console.log('respostas', answers)
        }
    }
}
</script>

<style>
</style>
