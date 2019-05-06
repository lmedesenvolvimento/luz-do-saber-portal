<template>
    <ls-card-display        
        label="item.text" 
        :name="activity.type.slug"
        :type="type"
        :item="item"
    >
        {{ letter }} 
    </ls-card-display>
</template>
<script>
import { find, values } from 'lodash'
import { ItemProps } from '../index.js'
import Activity from '../../../../store/modules/Activity';

export default {
    mixins: [ItemProps],
    data() {
        return {
            letter: '__'
        }
    },
    watch: {
        answers(data){
            let res = find(values(this.answers), (value) => value.key.data === this.item.id && value.valid === true)

            if( res ){
                
                let l = find(this.activity.items.keys, (value => { return value.id === res.key.data }))
                console.log('letter', l.text)
                console.log('res key data', res.key.data)
                this.letter = l.text
            
            }
        }
    }

}
</script>
