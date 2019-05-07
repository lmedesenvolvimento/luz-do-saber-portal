<template>
    <div class="container-fluid">
        <b-row align-h="center" align-v="center">
            <b-col
                v-for="item in activity.items.values" 
                :key="item.id"
                :sm="valueColSize"
                class="item"
            >
                <div v-for="key in keys" :key="key.id" class="peca">                
                    <div class="total" :class="'p'+key.id">
                        <div class="inicial">{{ inicial }}</div>
                        <div class="name">{{ name }}</div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
// import { sampleSize, drop, range } from 'lodash'

// import Item from '@/components/ui/items/Item'

import { mapActions } from 'vuex'

export default {
    // components: { Item },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    created(){
        console.log(this.activity.items.keys[0].text)
        // cria um array de respostas/letras que somem. drop usado por primeira letra nunca pode sumir
        let keys = [{id:0, value_ids: 0},{id:1, value_ids: 1},{id:2, value_ids: 2},{id:3, value_ids: 3}];
        this.keys = [{id:1, value_ids: 1},{id:2, value_ids: 2},{id:3, value_ids: 3},{id:4, value_ids: 4}];
        // this.inicial = this.activity.items.keys[0].text;
        this.inicial = 'R';
        // this.name = this.activity.items.values[0].text;
        this.name = 'RONALDO';

        //seta as respostas
        this.setAnswersArray(keys)
        this.setActivityAttrs({ total_correct_items: keys.length })
    },
    methods: {
        setAnswersArray(a){
            let answers = []

            a.forEach(a => {
                let key = createAnswer(a, a.value_ids[0])
                answers.push(key)
            })

            this.setAnswers(answers)
        },
        ...mapActions('Activity', ['setActivityAttrs'])
    }
}
</script>

<style>
.total{
    width: 200px;
    height: 200px;
    background-image: url('../../../assets/images/components/navbar/navbar-bg.png');
    background-color: #C72929;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.total .inicial{
    font-size: 98px;
}
.total .name{
    font-size: 24px;
}
.peca{
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
}

.peca .p1{
  position: absolute;
  left: 0;
  top: 0;
}
.peca .p2{
  position: absolute;
  right: 0;
  top: 0;
}
.peca .p3{
  position: absolute;
  left: 0;
  bottom: 0;
}
.peca .p4{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
