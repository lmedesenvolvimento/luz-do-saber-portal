<template>
    <div v-bind:class="activity.type">
        <ls-list-correct-item v-if="activity.subtype === ActivityTypes.subtypes.itemsCorretos" :activity="activity" :answer="answer" :valueColSize="valueColSize"></ls-list-correct-item>
    </div>
</template>
<script>
import { TOTAL_COLUMNS } from '@/index.const'

import ActitivitiesComponents, { ListMixin } from './index'

export default {
    mixins: [ListMixin],
    components:{
        ...ActitivitiesComponents
    },
    computed: {
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        }
    }
}
</script>
