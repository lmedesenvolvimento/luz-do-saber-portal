import ItemComponents from '@/components/ui/items'

import { ActivityTypes } from '@/components/ui/types'

export const ListMixin = {
    props: {
        activity: Object,
        answer: Object
    },
    components: {
        ...ItemComponents
    },
    data() {
        return {
            ActivityTypes: ActivityTypes
        }
    }
}


export default {
    'ls-list-correct-item': require('./ListCorrectItem.vue').default
}