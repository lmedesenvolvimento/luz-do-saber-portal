<template>
    <div>
        <p v-for="(item, index) in aux" :key="index">{{ item }}</p>
        <p>{{ aux }}</p>
    </div>
</template>

<script>
import { ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [ListMixin, CreateAnswersMixins],
    data(){
        return {
            aux: []
        }
    },
    created(){
        this.ActivityToArray(this.activity)
    },
    mounted(){
        
    },
    methods: {
        ActivityToArray(o){
            console.log(o, 'atividade')
            console.log(o.items, 'items')

            let count = Object.keys(o.items.keys)

            for (let i = 0; i < count.length; i++){
                this.aux[i] = o.items.keys[i].text
            }

            console.log(this.aux, 'auxaaa')
        }
    },
}
</script>