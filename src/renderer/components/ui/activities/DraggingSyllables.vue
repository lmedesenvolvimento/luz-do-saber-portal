<template>
    <div>
        <b-row align-h="center">
            <b-col cols="12" md="4">
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
            </b-col>
            <b-col cols="12" md="8">
                <b-row
                    v-for="item in activity.items.keys"
                    :key="item.id"
                    align-v="center"
                >
                    <b-col cols="12" md="4">
                        <ls-card-display v-if="item.images[0].url !== null" class="key-image" :style="{ 'background-image': 'url(' + item.images[0].url + ')' }">
                            imagem 
                            <br>
                            aqui
                        </ls-card-display>
                    </b-col>
                    <b-col cols="12" md="8">
                        <b-row>
                            <ls-card-droppable
                                v-for="valueId in item['value_ids']"
                                :key="valueId"
                                class="drop"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            >
                                {{ getSyllableByValueId(valueId) }}
                            </ls-card-droppable>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
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
    mounted() {
        this.createAnswersArray()
        this.teste()
    },
    methods: {
        getSyllableByValueId(valueId) {
            for (let i = 0; i < this.activity.items.values.length; i++) {
                if (valueId == this.activity.items.values[i].id){
                    console.log('Sílaba: '+ this.activity.items.values[i].text)
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
                console.log('entrei i '+ i)
                for(let j = 0; j < this.activity.items.keys[i].value_ids.length; j++){
                    console.log('entrei j '+j)
                    //if (this.activity.items.keys[i].value_ids.includes(a[i].key_id)){
                    //    console.log(a[i].text)
                    //}
                    this.getSyllableByValueId(this.activity.items.keys[i].value_ids[j])
                }  
            }
            console.log(a);
        }
    },
}
</script>
