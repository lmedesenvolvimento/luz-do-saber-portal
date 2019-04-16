<template>
    <div>
        <p v-for="(item, index) in activity.items" :key="index">{{ item }}, {{ index }}</p>
    </div>
</template>

<script>
import { ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [ListMixin, CreateAnswersMixins],
    mounted(){
        console.log(this.activity, 'atividade')
        console.log(this.activity.items, 'items')
    }
}
</script>