<template>
    <div class="activity">
        <ls-activity-default v-if="subtypes.default === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-default>
        <ls-activity-half v-if="subtypes.hideHalf === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-half>
        <ls-activity-unscramble v-if="subtypes.unscramble === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-unscramble>
        <ls-activity-rearrange-name v-if="subtypes.rearrangeName === activity.subtype.slug" :value-col-size="valueColSize" :key-col-size="keyColSize"></ls-activity-rearrange-name>
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
        keyColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.key.total_per_line)
        },
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        ...mapState('Activity', ['activity'])
    }
}
</script>
