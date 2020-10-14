<template>
    <drop :max-items="10" @ondropEvent="onDrop">
        <slot :props="{ answers }">
            <div
                v-if="answers.length && template.custom_image_full_url"
                class="card-input drop-group"
                :style="{
                    'background-image': `url(${template.custom_image_full_url})`
                }"
            >
                <div class="title">
                    {{ item.text }}
                </div>
                <div
                    v-if="
                        answers[0].type == 'letra' ||
                            answers[0].type == 'numero'
                    "
                    class="items-container"
                >
                    <b-row align-h="center">
                        <b-col cols="6">
                            <b-row align-h="center">
                                <b-col
                                    v-for="item in answers"
                                    :key="item.id"
                                    cols="4"
                                >
                                    <div class="item">
                                        <div class="texto letra medium">
                                            <div class="card--drop-group-item">
                                                <b-card
                                                    no-body
                                                    :class="{
                                                        invalid: invalid,
                                                        valid: valid
                                                    }"
                                                >
                                                    <b-card-body>
                                                        <slot
                                                            name="transfer-data"
                                                        >
                                                            <div>
                                                                {{ item.text }}
                                                            </div>
                                                        </slot>
                                                    </b-card-body>
                                                </b-card>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <div v-else class="items-container">
                    <b-row align-h="center" align-v="center" class="h-100">
                        <b-col cols="6" class="h-100"> 
                            <b-row align-h="center" class="h-100 vertical-center"> 
                                <b-col
                                    v-for="item in answers"
                                    :key="item.id"
                                    cols="12"
                                >
                                    <div class="texto" :class="fontSize">
                                        <div class="item">
                                            <b-card
                                                no-body
                                                class="drop-group-item"
                                                :class="{
                                                    invalid: invalid,
                                                    valid: valid
                                                }"
                                            >
                                                <b-card-body>
                                                    <slot name="transfer-data">
                                                        <div>
                                                            {{ item.text }}
                                                        </div>
                                                    </slot>
                                                </b-card-body>
                                            </b-card>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div v-else-if="answers.length" class="card-input drop-group">
                <div class="title">
                    {{ item.text }}
                </div>
                <div class="items-container">
                    <div v-for="item in answers" :key="item.id" class="item">
                        <div class="texto medium">
                            <b-card
                                no-body
                                class="drop-group-item"
                                :class="{ invalid: invalid, valid: valid }"
                            >
                                <b-card-body>
                                    <slot name="transfer-data">
                                        <div>{{ item.text }}</div>
                                    </slot>
                                </b-card-body>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else
                class="card-input drop-group"
                :style="[item.text === 'MAIÚSCULAS' ? 
                    {'background-image': `url(https://i.ibb.co/6v1mK8S/caixa-2.png)`} : 
                    {'background-image': `url(${template.custom_image_full_url})`}]"
            >
                <div class="title">
                    {{ item.text }}
                </div>
            </div>
        </slot>
    </drop>
</template>

<script>
import Vue from 'vue'
import Drop from '@ui/items/Drop'
import RadioInput from './RadioInput.vue'

export default {
    components: { Drop },
    mixins: [RadioInput],
    props: {
        template: Object
    },
    data() {
        return {
            transferData: {},
            answers: []
        }
    },
    computed: {
        isBox() {
            return this.template.custom === 'game-caixa-de-palavras'
                ? true
                : false
        },
        fontSize(){
            return this.template.font_size ? this.template.font_size : ''
        }
    },
    created() {
        this.transferData = this.item
    },
    methods: {
        onDrop(nativeElement, expected, dropped) {
            let transferData = nativeElement.dragEvent.dataTransfer

            this.transferData = transferData
            Vue.set(transferData, 'snapOn', 'dropzone')
            if (this.item.value_ids.includes(transferData.id)) {
                Vue.set(transferData, 'valid', true)
                Vue.set(transferData, 'dropped', true)
                this.answers.push(transferData)
            } else {
                this.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
                Vue.set(transferData, 'invalid', true)
                Vue.set(transferData, 'dragging', true)
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

            if (transferData.valid) {
                for (let i = 0; i < this.answers.length; i++) {
                    this.setAnswer({
                        type: 'value',
                        data: this.answers[i].id,
                        vm: this
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.vertical-center{
    padding: 25px 12px 12px 12px;
    align-content: space-evenly;
}
.card-input .card .card-body{
    padding: 0.8rem;
}
</style>
