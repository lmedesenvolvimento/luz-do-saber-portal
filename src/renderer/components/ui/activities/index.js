import { mapState } from 'vuex'

import ItemComponents from '@/components/ui/items'
import { ActivityTypes } from '@/components/ui/types'


export const ListMixin = {
    components: {
        ...ItemComponents
    },
    data() {
        return {
            ActivityTypes: ActivityTypes
        }
    },
    computed: {
        ...mapState('Activity', ['activity', 'answer'])
    }
}


export default {
    'ls-list-correct-item': require('./ListCorrectItem.vue').default
}