<template>
    <div>
        <p v-for="(item, index) in activity.items.keys" :key="index">{{ item.text }}</p>
    </div>
</template>

<script>
import { ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [ListMixin, CreateAnswersMixins],
    mounted(){
        console.log(this.activity, 'atividade')
        console.log(this.activity.items, 'items')

        let count = Object.keys(this.activity.items.keys)
        
        // let count = 0

        // for (let item in this.activity.items){
        //     aux.push(item)
        //     count++
        // }

        console.log(aux, 'aux')
    }
}
</script>