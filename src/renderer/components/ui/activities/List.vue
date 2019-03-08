<template>
    <div v-bind:class="activity.type.slug">
        <ls-list-correct-item v-if="hasOne" :input="input" :valueColSize="valueColSize"></ls-list-correct-item>
    </div>
</template>
<script>
import { clone } from 'lodash'
import { mapState, mapActions } from 'vuex'

import { TOTAL_COLUMNS } from '@/index.const'
import ActitivitiesComponents, { ListMixin } from './index'

export default {
    components:{
        ...ActitivitiesComponents
    },
    data(){
        return {
            input: Object,
        }
    },
    created(){
        this.input = clone(this.answer)
    },
    computed: {
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        hasOne(){
            return this.activity.total_correct_items === 1
        },
        ...mapState('Activity', ['activity', 'answer'])
    }    
}
</script>
