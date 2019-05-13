<template>
    <div class="container-fluid">
        yeye
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
    created(){
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {        
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>
