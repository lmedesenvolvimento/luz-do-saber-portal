<template>
    <div id="find-the-word" class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col class="activity-keys">
                <b-row>
                    <b-col v-for="(line, position) in lines" :key="position" cols="12">
                        <b-row align-h="center" align-v="center">
                            <b-col v-for="(item, position2) in line" :key="position2" align-self="center" class="item" :md="item.colSize">
                                <b-row v-if="!item.isInput">
                                    <b-col v-if="item.type !=='caractere_especial'">
                                        <ls-card-display>
                                            {{ item.text }}
                                        </ls-card-display>
                                    </b-col>
                                    <b-col v-else class="special-char">
                                        {{ item.text }}
                                    </b-col>
                                </b-row>
                                <b-row v-else>
                                    <b-col class="card-input card--input-text">
                                        <label>
                                            <b-card
                                                no-body
                                                :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                            >
                                                <b-card-body>
                                                    <input
                                                        id="input-name"
                                                        type="text"
                                                        :maxlength="item.text.length"
                                                        autocomplete="off"
                                                        @input="checkAwnserInput(...arguments, item, position, position2)"
                                                        @blur="checkAwnser(...arguments, item, position, position2)"
                                                    />
                                                </b-card-body>
                                            </b-card>
                                        </label>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
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


export default {
    components: {
        ...FormProps
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            awnsers: [],
            newValues: [],
            lines: [],
        }
    },
    created () {
        this.awnsers = this.getKeys
        this.awnsers.forEach(e => {
            e.valid = false
        })
    },
    mounted() {
        this.createAnswersArray()
        this.mountLineQuestion()
    },
    methods: {
        mountLineQuestion() {
            this.awnsers.forEach(a => {
                // Make awnser true for active input type
                a.isInput = true
                a.colSize = 4
                // Search values linked to awnser
                const values = this.getValues.filter(el => el.key_id === a.id)
                // Mount text showed
                let text = values.map(v => v.text).join(' ')
                // Append line to lines
                this.lines.push([
                    { text, type: a.type, isInput: false, colSize: 4 },
                    { text:'=', type:'caractere_especial', isInput: false, colSize: 1 },
                    a
                ])
            })
        },
        checkAwnser(event, item, linePosition, itemPosition) {
            let textItemNormal = item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') //Retirando palavras com acentos
            const updates = clone(this.lines)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase() || event.target.value.toLowerCase() === textItemNormal.toLowerCase()){
                this.setAnswer({
                    type: 'value',
                    data: item.value_ids[0],
                    vm: {}
                })
                updates[linePosition][itemPosition].valid = true
                event.target.disabled = true
            } 
            else {
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: {}
                })
                updates[linePosition][itemPosition].invalid = true
                this.removeInvalid(item, 1, linePosition, itemPosition)
            }
            Vue.set(this, 'lines', updates)
        },
        checkAwnserInput(event, item, linePosition, itemPosition) {
            let textItemNormal = item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') //Retirando palavras com acentos
            if (event.target.value.length >= item.text.length ) {
                const updates = clone(this.lines)
                if (event.target.value === ''){
                    return
                }
            
                if (event.target.value.toLowerCase() === item.text.toLowerCase() || event.target.value.toLowerCase() === textItemNormal.toLowerCase()){
                    this.setAnswer({
                        type: 'value',
                        data: item.value_ids[0],
                        vm: {}
                    })
                    updates[linePosition][itemPosition].valid = true
                    event.target.disabled = true
                } 
                else {
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: {}
                    })
                    updates[linePosition][itemPosition].invalid = true
                    this.removeInvalid(item, 1, linePosition, itemPosition)
                }
                Vue.set(this, 'lines', updates)
            }
            
        },
        removeInvalid(item, time, linePosition, itemPosition){
            setTimeout(()=> {
                const updates = clone(this.lines)
                updates[linePosition][itemPosition].invalid  = false
                Vue.set(this, 'lines', updates)
            }, time * 1000)
        }
        ,
        ...mapActions('Activity', ['setAnswer'])
    },
}
</script>

<style lang="scss">
#find-the-word{
    .special-char{
        font-size: 40px;
    }
}
</style>
