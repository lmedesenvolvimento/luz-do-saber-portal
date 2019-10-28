<template>
    <div class="uppercase-letters container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                        <async-image :src="item.images.length ? item.images[0].url : ''" :alt="getKeys[0].text" />
                    </b-col>
                </b-row>
            </b-col>
            
            <b-col
                v-if="hasValues"
                :class="{ 
                    'flex-4': getValues.length >= 12 
                }"
                class="activity-values" 
            >
                <div
                    v-for="(item, position) in alphabet"
                    :key="position"
                    class="item"
                >
                    <div class="letra texto medium">
                        <div class="card-input card--radio-input" :class="$attrs.class">
                            <label>
                                <b-card
                                    no-body
                                    :class="{ 'invalid': item.invalid, 'valid': item.valid }"
                                >
                                    <b-card-body>
                                        {{ item.letter }}
                                    </b-card-body>
                                </b-card>

                                <input
                                    v-model="item.selected"
                                    type="checkbox"
                                    class="invisible"
                                    true-value="valid"
                                    false-value="invalid"
                                    @change.stop="validate(item)"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import AsyncImage from '@ui/AsyncImage'
import { mapState, mapActions } from 'vuex'
import { alphabet } from '@/constants'
import { get } from 'http'
import { chain, take, takeRight, sortBy, map, last, first, findIndex, random } from 'lodash'

export default {
    components: {
        ...ui,
        AsyncImage,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            alphabet: [],
            correctLetters: [],
            ids: [],
        }
    },
    computed: {
        ...mapState('Activity', ['answers']),
    },
    mounted() {
        for (let i = 0; i < this.activity.items.values.length; i++) {
            const id = this.activity.items.values[i].id
            const text = this.activity.items.values[i].text

            this.ids.push({text, id})
        }
        
        this.getValues.forEach((item, index) => {
            this.correctLetters.push(item.text)
        })

        alphabet.forEach((letter, index) => {
            if (this.searchLetter(this.correctLetters, letter)) {
                const id = _.find(this.ids, function(o) { return o.text === letter ? o.id : '' })

                this.alphabet.push({letter, id})
                
            } else {
                this.alphabet.push(Object.assign({}, {letter}))
            }
        })

        
        this.createAnswersArray()
    },
    methods: {
        validate(item) {
            if(item.valid || item.invalid) return
            if(this.searchLetter(this.correctLetters, item.letter)){
                item.valid = true
                this.setAnswer({
                    type: 'value',
                    data: item.id.id,
                    vm: this
                })

                this.ids.pop()
            } else {
                item.invalid = true
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
            }
        },
        searchLetter(arr, str) {
            for(let i = 0; i < arr.length;i++){
                if (arr[i].match(str)) return true
            }
            return false
        },
        ...mapActions('Activity', ['setActivityAttrs','setAnswer']) 
    }
}
</script>

<style lang="scss">
    .uppercase-letters{
        .image img {
            max-width: inherit;
            width: 400px;
        }
        .image {
            width: 300px;
        }
        .activity-values {
            flex-wrap: wrap;
            justify-content: end !important;
            height: 80% !important;
        }
        .item {
            padding-right: 10px;
        }
    }
</style>
