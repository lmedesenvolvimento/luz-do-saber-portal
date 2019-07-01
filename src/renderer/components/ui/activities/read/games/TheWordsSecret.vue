<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="px-5 activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in shuffleValues" :key="position" cols="6" class="px-5">
                        <b-row class="px-5">
                            <b-col v-for="(item2, position2) in item.syllables" :key="position2" class="item" cols="6">
                                <ls-card-display 
                                    v-if="answers"
                                    :item="item2"
                                    :bg-color="item.color"
                                >
                                    {{ item2.text }}
                                </ls-card-display>
                            </b-col>
                        </b-row>
                        <div class="card-input card-input-text ">
                            <label>
                                <b-card 
                                    no-body
                                    :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                >
                                    <b-card-body>
                                        <input
                                            id="input-name"
                                            :ref="position"
                                            type="text"
                                            maxlength="11"
                                            @blur="checkAwnser(...arguments, item, position)"
                                            @keydown="checkAwnserAfterTime(...arguments, item, position, 2)"
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
import Vue from 'vue'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import { mapActions } from 'vuex'
import { clone, shuffle } from 'lodash'
import FormProps from '@ui/form'
import { constants } from 'http2';

export default {
    components: { ...FormProps },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            shuffleValues: [],
            timeoutId: null,
            $refsInput: []
        }
    },
    created () {
        this.shuffleValues = shuffle(this.getValues)
        this.shuffleValues.forEach(e => {
            e.valid = false
            e.invalid = false
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
        this.addColorsToType('substantivo_comum')
    },
    methods: {
        checkAwnserAfterTime(event, item, position, time){
            if (this.timeoutId) clearTimeout(this.timeoutId)
            if (event.keyCode === 13) this.checkAwnser(event, item, position)
            else{
                this.timeoutId = setTimeout(()=> {
                    this.checkAwnser(event, item, position)
                }, time * 1000)
            } 
        },
        checkAwnser(event, item, position) {
            const updates = clone(this.shuffleValues)
            if (this.timeoutId) clearTimeout(this.timeoutId)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase()){
                this.setAnswer({ 
                    type: item.type, 
                    data: item.id,
                    vm: {}
                })
                console.log(this.$refs[position+1][0])
                if (this.$refs[position+1]!=null)
                    this.$refs[position+1][0].focus()
                updates[position].valid = true
                event.target.disabled = true
            } else {
                this.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: {}
                })
                updates[position].invalid = true
                this.removeInvalid(item, 1, position)
            }            
            Vue.set(this, 'shuffleValues', updates)
        },
        removeInvalid(item, time, position){
            setTimeout(()=> {
                const updates = clone(this.shuffleValues)
                updates[position].invalid = false
                Vue.set(this, 'shuffleValues', updates)
            }, time * 1000)
        }
        ,
        ...mapActions('Activity', ['setAnswer'])
    },

}
</script>

<style>

</style>
