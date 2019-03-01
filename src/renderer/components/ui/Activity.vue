<template>
    <div class="activity">
        <List v-if="activity.type === ActivityTypes.types.lista" :activity="activity" :answer="answer"></List>
    </div>
</template>
<script>
import { ActivityTypes } from '@/components/ui/types'

import List from '@/components/ui/activities/List'

export default {
    props: {
        activity: Object
    },
    components: { List },
    data(){
        return {
            ActivityTypes: ActivityTypes,
            answer: {
                value: null,
                isValid: false,
                dirty: false
            }
        }
    }
}
</script>
