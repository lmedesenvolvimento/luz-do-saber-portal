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
            return item_template.key.total_per_line ? true : false
        },
        getKeys() {
            return this.activity.items.keys
        },
        getValues() {
            return this.activity.items.values
        },
        getColorsArray() {
            let c = ['cc7200', 'c30374', '8c2db4', '454ebc', '3875c1', '028d8b', 'ffb151', 'f766ae', 'ae67e0', '757bfa', '75c0ff', '64cbc2']
            let r = []
            let aux = 0

            for (let i = 0; i < 100; i++) {
                if (aux < c.length - 1) {
                    //r.push(c[aux])
                    aux++
                }
                else {
                    aux = 0
                    //r.push(c[aux])
                }

                r.push(c[aux])
            }

            return r
        }
    }
}

export { CreateAnswersMixins, MapMixins, createAnswer } from './answers'