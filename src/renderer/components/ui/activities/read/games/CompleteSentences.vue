<template>
    <div class="container-fluid">
        <b-row class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <div
                        v-for="(item, index) in items"
                        :key="index"
                        :sm="12"
                        class="item"
                    >
                        <Item
                            v-if="typeof item === 'object'"
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        />
                        <div v-else>{{ item }}</div>
                    </div>
                </b-row>
            </b-col>
            <b-col class="activity-keys">
                <b-row class="fill">
                    <b-col 
                        v-for="item in activity.items.keys"
                        :key="item.id"
                        :sm="keyColSize"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'key'"
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

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

import { mapActions } from 'vuex'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            dividers: [],
            newMessages: [],
            items: []
        }
    },
    created(){
        let r, aux = []

        this.createAnswersArray()

        this.addColorsToType('substantivo_comum')

        for (let item of this.activity.items.values) this.dividers.push(item.text)

        r = this.arrayToRegex(this.dividers)

        this.newMessages = this.splitSentence(this.activity.items.keys[0].text, r)

        this.dividers.forEach((item, index) => {
            aux[index] = this.activity.items.values[index]
        })

        this.setAnswersValueArray(aux)
        this.setActivityAttrs({ total_correct_items: 2 })


        this.items = this.joinArrays(this.newMessages, aux)
    },
    methods: {
        arrayToRegex(array){
            return new RegExp(array.toString().replace(',', '|'))
        },
        joinArrays(a1, a2){
            let r = [], l = Math.min(a1.length, a2.length)
                
            for (let i = 0; i < l; i++) r.push(a1[i], a2[i])

            r.push(...a1.slice(l), ...a2.slice(l))

            return r
        },
        splitSentence(sentence, divisor){
            return sentence.split(divisor)
        },
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
    },
}
</script>

<style>

</style>
