<template>
    <div>
        <div v-for="(item, index) in activity.items.keys" :key="index">
            <p v-if="!item.hide">{{ item.text }}</p>
            <p v-if="item.hide">escondido</p>
        </div>

        <b-row>
            <b-col
                v-for="item in activity.items.keys" 
                :key="item.id" 
                cols="2"
            >
                <ls-card-input-text
                    v-if="item.hide"
                    name="base-input" 
                    :value="item" 
                    :max-length="1" 
                    type="value"
                />

                <ls-card-display v-if="!item.hide">{{ item.text }}</ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins } from './mixins'
import { sampleSize, drop } from 'lodash'
import form from '../form'

export default {
    components: { ...form },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    // data(){
    //     return {
    //     }
    // },
    created(){
        let size = (this.activity.items.keys.length % 2 === 0) ? this.activity.items.keys.length / 2 : Math.floor(this.activity.items.keys.length / 2) + 1
        let aux = sampleSize(drop(this.activity.items.keys), size)

        for (let i = 0; i < aux.length; i++){
            for (let item in this.activity.items.keys){
                if (aux[i] === this.activity.items.keys[item]){
                    this.activity.items.keys[item].hide = true
                }
            }
        }
    },
    mounted(){
    },
    // methods: {
    // }
}
</script>

<style>
.omit{
    display: none;
}
</style>
