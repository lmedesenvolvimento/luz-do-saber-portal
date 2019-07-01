<template>
    <div class="container-fluid">
        <b-row class="reverse-column" align-v="center" align-h="center">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col 
                        v-for="item in activity.items.values"
                        :key="item.id"
                        :sm="valueColSize"
                        class="item"
                    >
                        <Item
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        />
                    </b-col>
                </b-row>
            </b-col>
            {{ newMessages }}
            <b-col class="activity-keys">
                <b-row class="fill">
                    <b-col 
                        v-for="(item, index) in teste"
                        :key="index"
                        :sm="keyColSize"
                        class="item"
                    >
                        {{ item }}
                    </b-col>
                </b-row>
            </b-col>
            <!-- <b-col class="activity-keys">
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
            </b-col> -->
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import Item from '@/components/ui/items/Item'

export default {
    components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            dividers: [],
            newMessages: [],
            teste: []
        }
    },
    created(){
        this.createAnswersArray()
        this.addColorsToType('substantivo_comum')

        console.log('--------------------------------------')

        for (let item of this.activity.items.values) this.dividers.push(item.text)

        let r = new RegExp(this.dividers.toString().replace(',', '|'))

        this.newMessages = this.activity.items.keys[0].text.split(r)

        for (let i = 0; i < (this.newMessages.length + this.dividers.length); i++){
            this.teste[i] = i
        }

        console.log(this.teste)
    },
}
</script>

<style>

</style>
