<template>
    <div id="find-the-word" class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col class="activity-keys">
                <b-row>
                    <b-col v-for="(line, position) in lines" :key="position" cols="12">
                        <b-row align-h="center" align-v="center">
                            <b-col v-for="(item, position2) in line" :key="position2" align-self="center" class="item" :md="getItemSize(item)">
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
                                                        maxlength="11"
                                                        autocomplete="off"
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
        let line = []
        this.getValues.forEach((e, index, values)=>{
            e.isInput = false
            let awnser = this.awnsers.find(el => el.id === e.key_id)
            // create line
            if (e.type === 'substantivo_proprio' || e.type === 'substantivo_comum'){
                line.push(e)
                // add equals in array
                line.push({text:'=', type:'caractere_especial', isInput: false})
                awnser.isInput = true
                // add awnser in array with correct key
                line.push(awnser)
                // add full line in the array lines, this array going to call when mount lines in template
                this.lines.push(line)
                // clean the line for create new line
                line = []
            }
            else {
                if (index === values.length-1) {
                    line.push(e)
                    line.push({text:'=', type:'caractere_especial', isInput: false})
                    awnser.isInput = true
                    line.push(awnser)
                    this.lines.push(line)
                }
            }
        })
    },methods: {
        getItemSize(item){
            if (item.isInput)
                return 4
            else
                return 1
        },
        checkAwnser(event, item, linePosition, itemPosition) {
            const updates = clone(this.lines)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase()){
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
