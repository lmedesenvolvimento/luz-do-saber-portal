<template>
    <div class="container-fluid">
        <b-row align-h="center">
            <b-col>
                <img 
                    :src="getKeys[0].images[0].url" 
                    alt=""
                >
            </b-col>
            <b-col
                v-for="(letter, index) in getKeys[0].text" 
                :key="index"
                :sm="1"
                class="item"
            >
                <div class="letra">
                    <ls-card-display>
                        {{ letter }}
                    </ls-card-display>
                </div>
            </b-col>  
        </b-row>
        <b-row
            sm="1"
        >
            <b-col
                v-for="(letter, position) in alphabet"
                :key="position"  
                :sm="1"
                class="item"
            >
                <div class="letra">
                    <ls-card-input>
                        {{ letter }}
                    </ls-card-input>
                </div> 
            </b-col>
        </b-row>        
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ui from '@/components/ui'
export default {
    components: { 
        ...ui
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        }
    },
    mounted() {
        this.createAnswersArray()
        this.addColorsToType('substantivo_comum')
    },    
}
</script>

<style>

</style>


