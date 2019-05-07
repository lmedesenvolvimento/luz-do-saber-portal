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
            let c = [/*'cc7200', 'c30374', '8c2db4', '454ebc', '3875c1', '028d8b', */'ffb151', 'f766ae', 'ae67e0', '757bfa', '75c0ff', '64cbc2']
            let r = []
            let aux = 0

            for (let i = 0; i < 100; i++) {
                r.push(`#${c[aux]} !important`)

                aux = (aux < c.length - 1) ? aux + 1 : 0
            }

            return r
        }
    },
    created(){
        this.addColors()
    },
    methods: {
        addColors(){
            for (var key in this.activity.items.values) {
                if (this.activity.items.values.hasOwnProperty(key)) {
                    if (this.activity.items.values[key].type === 'letra' || this.activity.items.values[key].type === 'caractere_especial' || this.activity.items.values[key].type === 'numero'){
                        this.activity.items.values[key].color = this.getColorsArray[key]
                    }
                    else {
                        this.activity.items.values[key].color = null
                    }
                }
            }
            for (var key in this.activity.items.keys) {
                if (this.activity.items.keys[key].type === 'letra' || this.activity.items.keys[key].type === 'caractere_especial' || this.activity.items.keys[key].type === 'numero') {
                    this.activity.items.keys[key].color = this.getColorsArray[key]
                }
                else {
                    this.activity.items.keys[key].color = null
                }
            }
        }
    }
}

export { CreateAnswersMixins, MapMixins, createAnswer } from './answers'