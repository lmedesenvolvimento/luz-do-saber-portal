<template>
    <div></div>
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