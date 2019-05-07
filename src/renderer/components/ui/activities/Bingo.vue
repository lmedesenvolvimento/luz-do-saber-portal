<template>
    <div class="container-fluid">
        <b-col cols="9" align-v="center" align-h="center">
            <b-row v-for="item in getValues" :key="item" :sm="valueColSize">
                <ls-card-display>
                    <b-row align-v="center" align-h="center"> 
                        <b-col>
                            <b-row style="padding: 0 20px 0 10px">
                                <ls-card-input v-for="letter in item.text" :key="letter.id" style="margin-left: 10px">
                                    {{ letter }}
                                </ls-card-input> 
                            </b-row>                            
                        </b-col> 
                    </b-row>
                </ls-card-display>
            </b-row>
        </b-col>
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
    mounted() {
        this.createAnswersArray()
    },
    methods: {        
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>

<style>
    .aaaaa{
        border: solid 1px;
        display: inline;
    }
</style>

