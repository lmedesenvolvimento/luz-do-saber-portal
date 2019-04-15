<template>
    <div class="activity">
        <List></List>
    </div>
</template>
<script>
import { ActivityTypes } from '@/components/ui/types'

import List from '@/components/ui/activities/List'

export default {
    components: { List },
    props: {
        activity: Object
    },
    data(){
        return {
            ActivityTypes: ActivityTypes            
        }
    }
}
</script>
