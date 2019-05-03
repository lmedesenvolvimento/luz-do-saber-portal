import { mapState } from 'vuex'

import Item from '@/components/ui/items/Item'

export const ListMixin = {
    components: {
        Item
    },
    props: {
        valueColSize: Number,
        keyColSize: Number,
        horizontal: {
            type: Boolean,
            default: true
        },
        reverse: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasKeys() {
            let { item_template } = this.activity
            console.log(item_template)
            return item_template.key.total_per_line ? true : false
        },
        getKeys() {
            return this.activity.items.keys
        },
        getValues() {
            return this.activity.items.values
        }
    }
}

export { CreateAnswersMixins, MapMixins, createAnswer } from './answers'