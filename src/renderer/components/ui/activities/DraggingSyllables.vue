<template>
    <div id="dragging-syllables" class="container-fluid">
        <b-row align-h="center" class="reverse">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" cols="12" md="12" class="item"> 
                        <b-row class="my-2" align-v="center">
                            <b-col class="image-col" cols="12" md="3" sm="6">
                                <ls-card-display v-if="item.images[0].url !== null" class="key-image">
                                    <div class="image" :style="{ 'background-image': 'url('+ baseUrl + item.images[0].url + ')' }" />
                                </ls-card-display>
                            </b-col>
                            <b-col cols="12" md="9" sm="6" class="syllables-row">
                                <b-row>
                                    <b-col v-for="(syllable, index) in item.syllables" :key="index" cols="12" lg="3" :md="4" :sm="6" class="key-syllables">
                                        <ls-card-droppable
                                            v-if="answers"
                                            :item="item"
                                            :type="'key'"
                                            :template="activity.item_template.key"
                                            :custom-validate="validateBySyllabe"
                                        >
                                            <template slot="transfer-data">
                                                {{ syllable.text }}
                                            </template> 
                                        </ls-card-droppable>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="activity-values" cols="12" lg="5" md="5">
                <ls-card-display>
                    <b-row align-v="center" align-h="center" class="values-container">
                        <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="6" :md="6" lg="4" class="item"> 
                            <ls-card-draggable 
                                v-if="answers"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            >
                                {{ item.text }}
                            </ls-card-draggable>
                        </b-col>                    
                    </b-row>
                </ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import FormProps from '../form'
import { range } from 'lodash'
import Item from '@/components/ui/items/Item'



export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            correctAnswers: [],
            teste: String,
        }
    },
    computed: {
        baseUrl() {
            return process.env.BASE_API_URL
        }
    },
    mounted() {
        this.createAnswersArray()
        for (let i = 0; i < this.activity.items.keys.length; i++) {
            this.correctAnswers.push({word: this.activity.items.keys[i].text, syllables:[], rightAnswers: []})
            // console.log(this.correctAnswers[i].word)         
            for (let j = 0; j < this.activity.items.keys[i].syllables.length; j++){
                this.correctAnswers[i].syllables[j] = this.activity.items.keys[i].syllables[j].text
                this.correctAnswers[i].rightAnswers[j] = false
                // console.log(this.correctAnswers[i].syllables)        
            }
        }
    },
    methods: {
        validateBySyllabe(transferData, nativeElement, vm){
            var syllable = vm.$el.innerText.substring(0, vm.$el.innerText.length-1)
            if (transferData.text === syllable){
                transferData.valid = true
                vm.valid = true
                this.addAwnser(syllable);
                this.checkWords()
            } else {
                vm.valid = false
                vm.invalid = true
            }
        },
        addAwnser(text){
            for (let i = 0; i < this.correctAnswers.length; i++) {
                for (let j = 0; j < this.correctAnswers[i].syllables.length; j++) {
                    if (text === this.correctAnswers[i].syllables[j]){
                        this.correctAnswers[i].rightAnswers[j] = true;
                    }               
                }
            }
            console.log(this.correctAnswers);
        }
        ,
        checkWords(){
            var numRightSyllables = 0;
            for (let i = 0; i < this.correctAnswers.length; i++) {
                for (let j = 0; j < this.correctAnswers[i].rightAnswers.length; j++) {
                    if (this.correctAnswers[i].rightAnswers[j] === true){
                        numRightSyllables++;
                        console.log('Num silabas certas ' + numRightSyllables)
                    }               
                }
                var numRightWords = 0;
                console.log('Num silabas', this.correctAnswers[i].rightAnswers.length)
                if (numRightSyllables == this.correctAnswers[i].rightAnswers.length)
                {
                    numRightWords++;
                    console.log('terminei '+ numRightWords +' palavra(s)');
                }
            }
        }
        
    },
}
</script>
<style lang="scss">

    #dragging-syllables
    {
        .card-display .card .card-body{
            font-size: 18px !important;
        }
        .card-input.card-draggable .card .card-body{
            font-size: 18px !important;
        }
        .card-input.card-droppable .card .card-body
        {
            font-size: 18px !important;
        }
        .image{
            width: 100%;
            min-height: 50px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        .values-container
        {  
            padding: 10px;
        }
        .key-syllables, .syllables-row, .activity-keys .card-display, .item, .image-col{
            padding-right: 10px;
            padding-left: 10px;
        }
    }

</style>
