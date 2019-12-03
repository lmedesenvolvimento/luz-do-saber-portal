<template>
    <div class="container-fluid">
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in shuffleValues" :key="position" cols="6" class="blocks-container">
                        <div class="blocks">
                            <b-row class="letras-key">
                                <b-col v-for="(item2, position2) in item.syllables" :key="position2" class="item" cols="6" :class="activity.item_template.key.font_size">
                                    <ls-card-display
                                        v-if="answers"
                                        :item="item2"
                                        :bg-color="item.color"
                                    >
                                        {{ item2.text }}
                                    </ls-card-display>
                                </b-col>
                            </b-row>
                            <div :class="activity.item_template.value.font_size">
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
                            </div>
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
    components: { ...FormProps },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            shuffleValues: [],
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
                    let rnd = this.getRndInteger(1, i)
                    let temp = e.syllables[i]
                    e.syllables[i] = e.syllables[rnd]
                    e.syllables[rnd] = temp
                }
            }
        })
    },
    mounted() {
        this.createAnswersArray()
        if (this.shuffleValues[0].type === 'substantivo_comum')
            this.addColorsToType('substantivo_comum')
        else if (this.shuffleValues[0].type === 'substantivo_proprio')
            this.addColorsToType('substantivo_proprio')
    },
    methods: {
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min
        },
        checkAwnser(event, item, position) {
            const updates = clone(this.shuffleValues)
            if (event.target.value === ''){
                return
            }
            if (event.target.value.toLowerCase() === item.text.toLowerCase()){
                this.setAnswer({
                    type: item.type,
                    data: item.id,
                    vm: {}
                })
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

<style lang="scss" scoped>
.activity-keys{
    margin: 0 10rem !important;
    height: auto !important;
}
.blocks-container{
    display: flex;
    justify-content: center;
    .blocks{
        max-width: 220px;
    }
}

.letras-key{
    .item{
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }
}
#input-name{
    padding: 0.7rem !important;
    height: 26px;
}
</style>


