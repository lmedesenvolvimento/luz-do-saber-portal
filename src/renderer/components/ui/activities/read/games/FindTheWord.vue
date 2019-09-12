<template>
    <div id="find-the-word" class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col
                class="activity-values" 
            >
                <b-row>
                    <b-row v-for="(item, position) in newValues" :key="position">
                        <b-col v-for="(item2, position2) in item" :key="position2" align-self="center" :md="valueColSize" :sm="6" class="item">
                            <div v-if="item2.type !=='caractere_especial'">
                                <ls-card-display>
                                    {{ item2.text }}
                                </ls-card-display>
                            </div>
                            <div v-else class="special-char">
                                {{ item2.text }}
                            </div>
                        </b-col>
                    </b-row> 
                </b-row>
            </b-col>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in newArray" :key="position" :sm="keyColSize" class="item"> 
                        <div class="card-input card--input-text">
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
                                            autocomplete="off"
                                            @blur="checkAwnser(...arguments, item, position)"
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


export default {
    components: {
        ...FormProps
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            newArray: [],
            $refsInput: [],
            newValues: []
        }
    },
    created () {
        this.newArray = this.getKeys
        this.newArray.forEach(e => {
            e.valid = false
        });
    },
    mounted() {
        this.createAnswersArray()
        let count = 0
        this.newValues.push([])
        this.getValues.forEach((e, index, values)=>{
            if (index !== 0){
                if (e.type === 'substantivo_proprio'){
                    this.newValues[count].push({text:'=', type:'caractere_especial'})
                    count++;
                    this.newValues.push([])
                }
                this.newValues[count].push(e)
            }
            else{
                if (values[index+1].type !== 'caractere_especial' && values[index+1].type !== 'silaba'){
                    this.newValues[count].push(e)
                    this.newValues[count].push({text:'=', type:'caractere_especial'})
                    count++;
                    this.newValues.push([])
                }else{
                    this.newValues[count].push(e)
                }
                
            }
        })
        this.newValues[count].push({text:'=', type:'caractere_especial'})
    },methods: {
        checkAwnser(event, item, position) {
            const updates = clone(this.newArray)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase()){
                this.setAnswer({
                    type: 'value',
                    data: item.value_ids[0],
                    vm: {}
                })
                if (this.$refs[position+1]!=null)
                    this.$refs[position+1][0].focus()
                updates[position].valid = true
                event.target.disabled = true
            } 
            else {
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: {}
                })
                updates[position].invalid = true
                this.removeInvalid(item, 1, position)
            }
            Vue.set(this, 'newArray', updates)
        },
        removeInvalid(item, time, position){
            setTimeout(()=> {
                const updates = clone(this.newArray)
                updates[position].invalid = false
                Vue.set(this, 'newArray', updates)
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
    .activity-values{
        padding: 0;
        .row{
            width: 100%;
            margin: 0;
            justify-content: flex-end;
        }
    }
    .activity-keys{
        padding: 0;
    }
    .card--input-text{
        max-width: 260px;
    }
}
</style>
