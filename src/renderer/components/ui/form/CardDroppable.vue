<template>
    <drop :expected="item" @ondropEvent="onDrop">
        <div class="card-input card--droppable">
            <b-card no-body :class="{ invalid: invalid, valid: valid }">
                <b-card-body>
                    <slot name="transfer-data">
                        <div>{{ transferDataText }}</div>
                    </slot>
                </b-card-body>
            </b-card>
        </div>
    </drop>
</template>

<script>
// import { Drop } from 'vue-drag-drop'
import Vue from 'vue'
import Drop from '@ui/items/Drop'
import RadioInput from './RadioInput.vue'

export default {
    components: { Drop },
    mixins: [RadioInput],
    props: {
        defaultAttr: {
            type: String,
            default: 'text'
        },
        customValidate: Function
    },
    data() {
        return {
            transferData: {}
        }
    },
    computed: {
        transferDataText() {
            return this.transferData[this.defaultAttr]
        }
    },
    created() {
        this.transferData = this.item
    },
    methods: {
        onDrop(nativeElement, expected, dropped) {
            if (this.valid) return

            let transferData = nativeElement.dragEvent.dataTransfer
            if (!this.customValidate) {
                this.transferData = transferData
                Vue.set(transferData, 'snapOn', 'dropzone')
                Vue.set(transferData, 'dropped', false)
                if (this.item.value_ids.includes(transferData.id)) {
                    this.setAnswer({
                        type: 'value',
                        data: transferData.id,
                        vm: this
                    })
                    Vue.set(transferData, 'dropped', true)
                } else {
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: this
                    })
                    Vue.set(transferData, 'dragging', false)
                    Vue.set(transferData, 'dropped', true)
                    setTimeout(() => {
                        Vue.set(transferData, 'snapOn', 'self')
                    }, 600)
                    setTimeout(() => {
                        Vue.set(transferData, 'snapOn', 'none')
                        Vue.set(transferData, 'dropped', false)
                        dropped.length = 0
                    }, 700)
                }
            } else {
                this.customValidate(transferData, nativeElement, this)
            }
        },
        showKeys(searchedObject, searchedKey) {
            const hasKey = searchedObject.hasOwnProperty(searchedKey)
            const keys = Object.keys(searchedObject)
            return { hasKey, keys }
        }
    }
}
</script>

<style></style>
