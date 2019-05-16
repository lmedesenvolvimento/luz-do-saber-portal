<template>
    <div class="container-fluid">
        <b-row>
            <b-col cols="6" md="6">
                <b-col
                    v-for="item in activity.items.values" 
                    :key="item.id"
                    :sm="valueColSize"
                    cols="12"
                    md="4"
                >
                    {{ item.text }}
                </b-col>
            </b-col>
            <b-col cols="6" md="6">
                <b-row
                    v-for="item in activity.items.keys"
                    :key="item.id"
                >
                    <b-col v-if="item.images[0].url !== null" class="key-image" :style="{ 'background-image': 'url(' + item.images[0].url + ')' }">
                        {{ item.images[0].url }}
                    </b-col>
                    <b-col>
                        <b-col 
                            v-for="valueId in item['value_ids']"
                            :key="valueId">
                            {{ getSyllableByValueId(valueId) }}
                        </b-col>
                        <br>
                    </b-col>
                </b-row>
            </b-col>
            <!-- <b-row align-h="center" align-v="center">
                <b-col class="activity-keys">
                    <b-row align-h="center" align-v="center">
                        <b-col
                            v-for="item in activity.items.values" 
                            :key="item.id"
                            :sm="valueColSize"
                            class="item"
                        >
                            <Item
                                v-if="item.hide"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />

                            <Item
                                v-if="!item.hide"
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                            />
                        </b-col>
                    </b-row>
                </b-col>
            </b-row> -->
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import FormProps from '../form'
import { range } from 'lodash'

export default {
    components: {
        ...FormProps
    },
    filters: {
        reverse: function(arr) {
            return arr.reverse();
        }
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    // computed: {
    //     invertedArray(array) {
    //         return array.reverse()
    //     }
    // },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        getSyllableByValueId(valueId) {
            for (let i = 0; i < this.activity.items.values.length; i++) {
                if (valueId == this.activity.items.values[i].id){
                    return this.activity.items.values[i].text;
                }
            }
        }
    },
}
</script>
