<template>
    <div class="activity">
        <ls-activity-default v-if="subtypes.default === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-default>
        <ls-activity-half v-if="subtypes.hideHalf === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-half>
        <ls-activity-unscramble v-if="subtypes.unscramble === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-unscramble>
        <ls-activity-number-letter v-if="subtypes.numberLetter === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-number-letter>
    </div>
</template>
<script>
import { clone } from 'lodash'
import { mapState, mapActions } from 'vuex'

import { TOTAL_COLUMNS } from '@/index.const'
import { ActivitySubtypes } from '@/components/ui/types'

import ActitivitiesComponents from './index'

export default {
    components: {        
        ...ActitivitiesComponents
    },
    computed: {
        subtypes(){
            return ActivitySubtypes
        },
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        ...mapState('Activity', ['activity'])
    }
}
</script>
