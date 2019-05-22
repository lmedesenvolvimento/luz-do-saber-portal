<template>
    <div class="container-fluid">
        <b-row align-h="center" class="reverse">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in getValues" :key="position" :sm="keyColSize" class="item"> 
                        <ls-card-droppable
                            v-if="answers"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        />
                        <!-- <b-col cols="12" md="4">
                            <ls-card-display v-if="item.images[0].url !== null" class="key-image">
                                <div class="image" :style="{ 'background-image': 'url('+ baseUrl + item.images[0].url + ')' }">
                                </div>
                            </ls-card-display>
                        </b-col>
                        <b-col cols="12" md="8">
                            <b-row>
                                <b-col class="col-droppable-syllables" v-for="valueId in item['value_ids']" :key="valueId">
                                    <ls-card-display class="droppable-syllables">
                                        {{ getSyllableByValueId(valueId) }}
                                    </ls-card-display>
                                </b-col>
                            </b-row>
                        </b-col> -->
                    </b-col>
                </b-row>
            </b-col>
            <b-col 
                :class="{ 
                    'flex-4': getValues.length >= 12 
                }"
                class="activity-values" 
            >
                <b-row align-v="center" align-h="center">
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :md="4" :sm="6" class="item"> 
                        <ls-card-draggable
                            v-if="answers"
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        >
                            {{ item.text }}
                        </ls-card-draggable>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
    <!-- <div>
        <b-row align-h="center">
            <b-col cols="12" md="4">
                <ls-card-display>
                    <b-row>
                        <b-col
                            v-for="item in activity.items.values" 
                            :key="item.id"
                            cols="12"
                            md="6"
                        >
                            <ls-card-draggable :item="item">
                                {{ item.text }}
                            </ls-card-draggable>
                        </b-col>
                    </b-row>  
                </ls-card-display>            
            </b-col>
            <b-col cols="12" md="8">
                <b-row
                    v-for="item in activity.items.keys"
                    :key="item.id"
                    align-v="center"
                >
                    <Item
                        :item="item"
                        :type="'value'"
                        :group="true"
                        :template="activity.item_template.value"
                    />
                    <b-col cols="12" md="4">
                        <ls-card-display v-if="item.images[0].url !== null" class="key-image">
                            <div class="image" :style="{ 'background-image': 'url('+ baseUrl + item.images[0].url + ')' }">
                            </div>
                        </ls-card-display>
                    </b-col>
                    <b-col cols="12" md="8">
                        <b-row>
                            <b-col class="col-droppable-syllables" v-for="valueId in item['value_ids']" :key="valueId">
                                <ls-card-display class="droppable-syllables">
                                    {{ getSyllableByValueId(valueId) }}
                                </ls-card-display>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div> -->
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'
import FormProps from '../form'
import { range } from 'lodash'
import Item from '@/components/ui/items/Item'



export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    computed: {
        baseUrl() {
            return process.env.BASE_API_URL 
        }
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        getSyllableByValueId(valueId) {
            for (let i = 0; i < this.activity.items.values.length; i++) {
                if (valueId == this.activity.items.values[i].id){
                    // console.log('Sílaba: '+ this.activity.items.values[i].text)
                    return this.activity.items.values[i].text;
                }
            }
        },
        teste(val){
            let a = JSON.parse(JSON.stringify(this.activity.items.values));

            for (let i = 0; i < a.length; i++){
                a[i].text = this.activity.items.values[i].text
            }

            for( let i = 0; i < this.activity.items.keys.length; i++){
                // console.log('entrei i '+ i)
                for(let j = 0; j < this.activity.items.keys[i].value_ids.length; j++){
                    // console.log('entrei j '+j)
                    //if (this.activity.items.keys[i].value_ids.includes(a[i].key_id)){
                    //    console.log(a[i].text)
                    //}
                    this.getSyllableByValueId(this.activity.items.keys[i].value_ids[j])
                }  
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    // .col-droppable-syllables
    // {
    //     // flex-grow: 0;
    // }
    // .droppable-syllables
    // {
    //     // width: 100px;
    // }
    .image
    {
        width: 150px;
        height: 100px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
