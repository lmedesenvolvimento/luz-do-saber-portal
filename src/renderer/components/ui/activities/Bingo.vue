<template>
    <div class="container-fluid">
        <b-row>
            <b-col align-v="center" align-h="center">
                <div>                   
                    <div v-for="bingoLetter in alphabet" :key="bingoLetter" class="bingoLetter">
                        {{ bingoLetter }}
                    </div>
                </div>
            </b-col>
            <b-col align-v="center" align-h="center">
                <b-row v-for="item in getValues" :key="item" :sm="valueColSize">
                    <ls-card-display>
                        <b-row v-if="item === getValues[0]" align-v="center" align-h="center" style="margin: 10px">
                            <p>sua cartela</p>
                        </b-row>
                        <b-row> 
                            <b-col>
                                <b-row v-if="item === getValues[0]" class="bingoCard" align-v="center" align-h="center">
                                    <ls-card-input v-for="letter in item.text" :key="letter.id" style="margin-left: 10px">
                                        {{ letter }}
                                    </ls-card-input>                                    
                                </b-row>
                                <b-row v-else class="bingoCard" align-v="center" align-h="center">
                                    <ls-card-display v-for="letter in item.text" :key="letter.id" style="margin-left: 10px">
                                        {{ letter }}
                                    </ls-card-display>                                    
                                </b-row>                       
                            </b-col> 
                        </b-row>
                    </ls-card-display>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {    
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins], 
    data() {
        return {
            alphabet: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        }
    },   
    mounted() {
        this.createAnswersArray()
    },
    methods: {        
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>

<style>
    .bingoCard{
        width: 600px;
        padding: 0 10px 0 10px;
    }
    .bingoLetter{
        display: inline-grid;
        text-align: center;
        padding-top: 3px;
        color: white;
        background-color: #ccc;
        border-radius: 13px;
        width: 25px;
        height: 25px;
        margin: 2px;
    }
</style>

