<template>
    <div id="base">        
        <div v-if="types.activity === activity.type.slug" class="activity">        
            <ls-activity-default v-if="activitySubtypes.default === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-default>
        </div>
        <div v-else-if="types.game === activity.type.slug" class="game">        
            <ls-activity-half v-if="gameSubtypes.hideHalf === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-half>
            <ls-activity-unscramble v-if="gameSubtypes.unscramble === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-unscramble>
            <ls-activity-jigsaw v-if="gameSubtypes.jigsaw === activity.subtype.slug" :value-col-size="valueColSize"></ls-activity-jigsaw>
        </div>
    </div>
</template>
<script>
import { clone } from 'lodash'
import { mapState, mapActions } from 'vuex'

import { TOTAL_COLUMNS } from '@/index.const'
import { BaseTypes, ActivitySubtypes, GameSubtypes } from '@/components/ui/types'

import ActitivitiesComponents from './index'

export default {
    components: {        
        ...ActitivitiesComponents
    },
    computed: {
        gameSubtypes(){
            return GameSubtypes
        },
        activitySubtypes(){
            return ActivitySubtypes
        },
        types(){
            return BaseTypes
        },
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        ...mapState('Activity', ['activity'])
    }
}
</script>
