<template>
    <div class="container-fluid letter-group">
        <b-row align-v="center" align-h="center">
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(group, index) in groups" :key="index" class="group-holder">
                        <ls-card-display
                            label="group" 
                            :type="'text'"
                            class="group"
                        >
                            <div v-for="(letter, lIndex) in group" :key="lIndex" class="letters" @click="checkLetter(letter, group)">
                                <ls-card-display
                                    label="group" 
                                    :type="'text'"
                                    :item="letter"
                                    :valid="letter.valid"
                                    :invalid="letter.invalid"
                                    :class="'card'+lIndex"
                                >
                                    <div :class="'letter'+lIndex"> {{ letter.text }} </div>
                                </ls-card-display>
                            </div>
                        </ls-card-display>
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

import ItemComponents from '@ui/form/index.js'

import { shuffle } from 'lodash'

import { mapState, mapActions } from 'vuex'

export default {
    components: { ...ItemComponents },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data(){
        return {
            groups: [],
        }
    },
    created(){
        this.groups = this.setGroup(this.getValues, this.getKeys)
        console.log(this.groups)
        this.createAnswersArray()
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
    },
    methods: {
        setGroup(values, keys){
            let lettersGroup = []
            for(let i = 0; i<values.length; i++ ){
                let group = []
                for(let j = 0; j<3 ; j++)
                    group.push({ id: keys[i].id, personalid: j, text: keys[i].text, valid: false, invalid: false })
                group.push({ id: values[i].id, personalid: 3, text: values[i].text, valid: false, invalid: false }) 
                let groupSuffled = shuffle(group)
                lettersGroup.push(groupSuffled)
            }
            return lettersGroup
        },
        checkLetter(answer, group){
            if(group)
                this.setAnswer({
                    data: answer.id,
                    type: 'value',
                    vm: answer,
                })
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer'])
    }
}
</script>

<style lang="scss">
    
</style>
