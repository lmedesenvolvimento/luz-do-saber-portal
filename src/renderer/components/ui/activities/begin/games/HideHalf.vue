<template>
    <b-container fluid class="activity">
        <b-row align-h="center" align-v="center">
            <b-col class="activity-keys">
                <b-row align-h="center" align-v="center">
                    <b-col
                        v-for="item in activity.items.values" 
                        :key="item.id"
                        :sm="valueColSize"
                        class="item"
                    >
                        <Item
                            v-if="notImage && item.hide"
                            :item="item"
                            :type="'value'"
                            :focus="item.focus"
                            :template="activity.item_template.value"
                        />
                        <Item
                            v-if="notImage && !item.hide"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import { sampleSize, drop, range, filter } from 'lodash'

import Item from '@/components/ui/items/Item'

import { mapActions } from 'vuex'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    computed: {
        notImage(){
            return this.activity.item_template.key.type !== 'imagem'
        }
    },
    created(){
        if (this.notImage) this.dropLetters()
        else console.log('owo')
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
        dropLetters(){
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

            let values = filter(this.activity.items.values, v => v.hide)

            values[0].focus = true
            //seta as respostas

            this.setAnswersArray(keys)
            this.setActivityAttrs({ total_correct_items: keys.length })
        },
        dropLettersImage(){
            
        },
        ...mapActions('Activity', ['setActivityAttrs']),
    }
}
</script>

<style>
</style>
