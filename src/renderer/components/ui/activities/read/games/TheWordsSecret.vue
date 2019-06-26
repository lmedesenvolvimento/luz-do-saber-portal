<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in newArrayAwnsers" :key="position" cols="6">
                        <b-row>
                            <b-col v-for="(item2, position2) in item.syllables" :key="position2" class="item" cols="6">
                                <Item 
                                    v-if="answers"
                                    :item="item2"
                                    :type="'key'"
                                    :template="activity.item_template.key"
                                />
                            </b-col>
                        </b-row>
                        <div class="card-input card-input-text ">
                            <label>
                                <b-card 
                                    no-body
                                >
                                    <b-card-body>
                                        <input
                                            id="input-name"
                                            v-model="awnsers[position].text"
                                            type="text"
                                            maxlength="11"
                                            @blur="checkAwnser(awnsers[position],position)"
                                        />
                                    </b-card-body>
                                </b-card>
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import { shuffle } from 'lodash'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            awnsers: []
        }
    },
    computed: {
        newArrayAwnsers() {
            return shuffle(this.activity.items.values)
        }
    },
    created () {
        this.awnsers = this.newArrayAwnsers;
        this.awnsers.forEach(e => {
            e.text = ''
        });
        this.newArrayAwnsers.forEach(e => {
            let pos0 = e.syllables[0]
            let pos1 = e.syllables[e.syllables.length-1]
            e.syllables[0] = pos1
            e.syllables[e.syllables.length-1] = pos0 
            if (e.syllables.length > 2){
                for (let i = e.syllables.length - 1; i >= 1; i--)
                {
                    let rnd = Math.random(1, i);
                    let temp = e.syllables[i];
                    e.syllables[i] = e.syllables[rnd];
                    e.syllables[rnd] = temp;
                }
            }
        });
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        checkAwnser(item, position) {
            if (item.text.length == this.newArrayAwnsers[position].text.length){ 
                if (item.text == this.newArrayAwnsers[position].text){
                    console.log(item)
                    item.valid = true
                } else {
                    item.invalid = true
                }
            }
            
        }
    },  
}
</script>

<style>

</style>
