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
            Vue.set(transferData, 'snapOn', 'dropzone')
            Vue.set(transferData, 'dropped', true)

            if (!this.customValidate) {
                this.transferData = transferData
                if (this.item.value_ids.includes(transferData.id)) {
                    this.setAnswer({
                        type: 'value',
                        data: transferData.id,
                        vm: this
                    })
                    transferData.valid = true
                } else {
                    this.setAnswer({
                        type: 'value',
                        data: -1,
                        vm: this
                    })
                    transferData.invalid = true
                }
            } else {
                this.customValidate(transferData, nativeElement, this)
            }

            if (transferData.valid) {
                Vue.set(transferData, 'dropped', true)
            } else if (transferData.invalid) {
                Vue.set(transferData, 'dragging', false)
                Vue.set(transferData, 'dropped', true)
                setTimeout(() => {
                    Vue.set(transferData, 'snapOn', 'self')
                }, 600)
                setTimeout(() => {
                    Vue.set(transferData, 'snapOn', 'none')
                    Vue.set(transferData, 'dropped', false)
                    Vue.set(transferData, 'invalid', false)
                    dropped.length = 0
                }, 700)
            }
        }
    }
}
</script>

<style></style>
