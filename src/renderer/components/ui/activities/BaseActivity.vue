<template>           
    <div id="base">        
        <div v-if="types.activity === activity.type.slug" class="activity">        
            <ls-activity-default 
                v-if="activitySubtypes.row === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-default 
                v-else-if="activitySubtypes.rowReverse === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :reverse="true"
            />
            <ls-activity-default 
                v-else-if="activitySubtypes.column === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
            />
            <ls-activity-default
                v-else-if="activitySubtypes.columnReverse === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
                :reverse="true"
            />
        </div>
        <div v-else-if="types.game === activity.type.slug" class="game"> 
            <!-- <ls-activity-number-letter 
                v-if="subtypes.column === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            /> -->
            <ls-activity-half 
                v-if="gameSubtypes.hideHalf === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-unscramble 
                v-if="gameSubtypes.unscramble === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-rearrange-name 
                v-if="gameSubtypes.rearrangeName === activity.subtype.slug" 
                :value-col-size="valueColSize" 
                :key-col-size="keyColSize"
            />
            <ls-activity-jigsaw 
                v-if="gameSubtypes.jigsaw === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-match-friends-initial 
                v-if="gameSubtypes.matchFriendsInitial === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
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
        keyColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.key.total_per_line)
        },
        valueColSize(){
            console.log(this.activity.item_template.value.total_per_line)
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        ...mapState('Activity', ['activity'])
    }
}
</script>
