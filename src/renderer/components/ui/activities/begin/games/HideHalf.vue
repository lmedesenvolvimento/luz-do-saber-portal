<template>
    <div class="container-fluid">
        <b-row v-if="notImage" class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.values"
                        :key="item.id"
                        :sm="valueColSize"
                        class="item"
                    >
                        <Item
                            v-if="item.hide"
                            :item="item"
                            :type="'value'"
                            :focus="item.focus"
                            :template="activity.item_template.value"
                        />
                        <Item
                            v-if="!item.hide"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-if="!notImage" class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.values"
                        :key="item.id"
                        :sm="valueColSize"
                        class="item"
                    >
                        <Item
                            v-if="item.hide"
                            :item="item"
                            :type="'value'"
                            :focus="item.focus"
                            :template="activity.item_template.value"
                        />
                        <Item
                            v-if="!item.hide"
                            :item="item"
                            :type="'value'"
                            :template="newTemplate"
                        />
                    </b-col>
                </b-row>
            </b-col>
            <b-col v-if="!notImage" class="activity-keys">
                <b-row class="fill" align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        :sm="keyColSize"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'key'"
                            :focus="item.focus"
                            :template="activity.item_template.key"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import { sampleSize, drop, range, filter } from 'lodash'

import Item from '@/components/ui/items/Item'

import { mapActions } from 'vuex'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            newTemplate: Object
        }
    },
    computed: {
        notImage(){
            return this.activity.item_template.key.type !== 'imagem'
        }
    },
    created(){
        if (this.notImage) this.dropLetters()
        else this.dropLettersImage()
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
        setAnswersValueArray(a){
            let answers = []

            a.forEach(a => {
                let key = createAnswer(a, a.id)
                answers.push(key)
            })

            console.log(answers)

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
            let size = (this.activity.items.values.length % 2 === 0) ? this.activity.items.values.length / 2 : Math.floor(this.activity.items.values.length / 2) + 1
            let keys = sampleSize(drop(this.activity.items.values), size)

            this.newTemplate = JSON.parse(JSON.stringify(this.activity.item_template.value))
            this.newTemplate.tags = ''

            range(0, keys.length).forEach(i => {
                for (let item in this.activity.items.values){
                    if (keys[i] === this.activity.items.values[item])
                        this.activity.items.values[item].hide = true
                }
            })

            let values = filter(this.activity.items.values, v => v.hide)

            console.log(values)

            values[0].focus = true

            this.setAnswersValueArray(keys)
            this.setActivityAttrs({ total_correct_items: keys.length })
        },
        ...mapActions('Activity', ['setActivityAttrs']),
    }
}
</script>

<style>
</style>
