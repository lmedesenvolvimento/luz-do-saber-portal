<template>
    <div v-bind:class="activity.type">
        <ListCorrectItems v-if="activity.subtype === ActivityTypes.subtypes.itemsCorretos" :activity="activity" :valueColSize="valueColSize"></ListCorrectItems>
    </div>
</template>
<script>
import { TOTAL_COLUMNS } from '@/index.const'
import { ActivityTypes } from '@/components/ui/types'

import ListCorrectItems from './ListCorrectItems'

export default {
    props: {
        activity: Object
    },
    components: { ListCorrectItems },
    data(){
        return {
            ActivityTypes: ActivityTypes
        }
    },
    computed: {
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        }
    }
}
</script>
