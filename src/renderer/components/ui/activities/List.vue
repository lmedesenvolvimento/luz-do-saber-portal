<template>
    <div v-bind:class="activity.type.slug">
        <ls-list-correct-item :valueColSize="valueColSize"></ls-list-correct-item>
    </div>
</template>
<script>
import { clone } from 'lodash'
import { mapState, mapActions } from 'vuex'

import { TOTAL_COLUMNS } from '@/index.const'
import ActitivitiesComponents from './index'
import { CreateAnswersMixins } from './mixins'

export default {
    mixins: [CreateAnswersMixins],
    components:{
        ...ActitivitiesComponents
    },
    mounted() {
        this.createAnswersArray()
    },
    computed: {
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        hasOne(){
            return this.activity.total_correct_items === 1
        },
        ...mapState('Activity', ['activity', 'answer', 'responses'])
    },
    methods: {
        ...mapActions('Activity', ['setAnswers'])
    }
}
</script>
