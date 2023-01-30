<template>
    <div class="container-fluid numeric-sentence">
        <b-row align-h="center" class="column">
            <b-col v-if="hasKeys" class=" activity-keys">
                <b-row align-v="center" align-h="center" :class="{'my-3': isPredecessor }">
                    <b-row class="row-container-key">
                        <b-col
                            v-for="(number, index) in incompleteSequence"
                            :key="index"
                            :md="1"
                            class="key-pieces item"
                        >
                            <div
                                :class="[
                                    'numero',
                                    'texto',
                                    'big'
                                ]"
                            >
                                <ls-card-display
                                    :item="number"
                                    :valid="number.valid"
                                >
                                    {{ number.text }}
                                </ls-card-display>
                            </div>
                        </b-col>
                    </b-row>
                </b-row>
            </b-col>
            <b-col
                v-if="hasValues" 
                class="activity-values" 
            >
                <b-row>
                    <b-col 
                        v-for="(item, position) in getValues" 
                        :key="position" 
                        align-self="center" 
                        :md="2" 
                        :sm="6" 
                        @click="triggerFocus(item)"
                    > 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                            :size="'big'"
                        />
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
// script
import {
    MapMixins,
    ListMixin,
    CreateAnswersMixins
} from '@ui/activities/mixins'
import { cloneDeep } from 'lodash'
import { mapState, mapActions } from 'vuex'
import FormProps from '@ui/form'

export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    props: { type: String },
    data() {
        return {
            incompleteSequence: [],
            selectItem: null,
            correctIndex: -1,
            isPredecessor: false
        }
    },
    computed: {
        ...mapState('Activity', ['answers'])
    },
    watch: {
        selectItem(value) {
            let sequence = this.incompleteSequence
           
            if(value.key_id){
    
                let keyId = value.key_id
                let correctText = value.text

                sequence.map((item, index)=>{
                    if(item.id === keyId){
                        item.text = correctText
                        item.valid = true
                    }
                })
            }

            this.incompleteSequence = sequence
        }
    },
    created() {
        this.incompleteSequence = cloneDeep(this.getKeys)    
        this.correctNumbers = this.getValues.filter((value) => value.key_id)

        this.clearIncompleteWord(this.correctNumbers)
    },
    mounted() {
        this.createAnswersArray(),
        this.isSequencePredecessor()
    },
    methods: {
        isSequencePredecessor() {
          
            if (this.activity.subtype.slug === 'sequencia-antecessor'){
                return this.isPredecessor = true
            }
        },
        triggerFocus(item) {
            this.selectItem = item
        },
        clearIncompleteWord(arr) {
            let correct = cloneDeep(arr)
            let pieces = this.incompleteSequence

            pieces.map((p) => {
                p.template = cloneDeep(this.activity.item_template.key)
                if (!(p.value_ids)) {
                    p.template.tags = null
                } else {                   
                    p.text = ''             
                }
            })
            this.incompleteSequence = pieces
           
        },
        ...mapActions('Activity', ['setAnswer'])
    }
}
</script>
<style lang="scss">
.numeric-sentence {

    color: rgb(26, 25, 25);

    .row{
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .my-3 .row {
        z-index: 99
    }

    .my-3 .row {
        &::after{
            content: '';
            position: absolute;
            bottom: 143px;
            left: 350px;
            width: 200px;
            height: 5px;
            background: black;
            z-index: -5;
        }
    }

    .key-pieces {
        padding-right: 0.6rem !important;
        padding-left: 0.6rem !important;

        .card {
        
            &.valid,
            &.invalid {
                &::after {
                    content: none !important;
                }
            }
        }
    }

    .itemValue {
        pointer-events: none;

            .card,.label{
                width: 70px;

                // &.input_custom {
                // font-size: 10px;
                // }
            }
    }

    .image {
        img {
            max-width: 400px;
            max-height: 220px;
        }
    }

    .card-input {
        pointer-events: all;
    }

    .selection {
        min-width: 100px;
    }

    .numero {
        .card-body {
            min-height: 60px;
        }
    }
}
</style>
