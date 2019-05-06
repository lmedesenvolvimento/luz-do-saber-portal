<template>
    <ls-card-display        
        label="item.text" 
        :name="activity.type.slug"
        :type="type"
        :item="item"
    >
        {{ answers ? 'answer': 'no answer' }} 
    </ls-card-display>
</template>
<script>
import { find, values } from 'lodash'
import { ItemProps } from '../index.js'

export default {
    mixins: [ItemProps],
    created(){
        console.log('created')
        console.log('item', this.item)
    },
    watch: {
        answers(data){
            let res = find(values(this.answers), (value) => value.key.data === this.item.id )
        }
    }
}
</script>
