import { mapState } from 'vuex'

import Item from '@/components/ui/items/Item'
import { ActivityTypes } from '@/components/ui/types'

export const ListMixin = {
    components: {
        Item
    },
    props: {
        valueColSize: Number
    },
    data() {
        return {
            ActivityTypes: ActivityTypes,
        }
    },
    computed: {
        hasKeys() {
            let { item_template } = this.activity
            return item_template.key.total_per_line ? true : false
        },
        getKeys() {
            return this.activity.items.keys
        },
        getValues() {
            return this.activity.items.values
        },        
        ...mapState('Activity', ['activity', 'answer'])
    }
}

export { CreateAnswersMixins } from './answers'