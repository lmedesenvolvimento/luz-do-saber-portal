<template>
    <ls-card-display
        label="item.text" 
        :name="activity.type.slug"
        :type="type"
        :item="item"
        bg-color="#02CCC3"
    >
        <div>{{ item.value }}</div>
    </ls-card-display>
</template>
<script>
import { find, values } from 'lodash'
import { ItemProps } from '../index.js'

export default {
    mixins: [ItemProps],
    data() {
        return {
            isValid: false
        }
    },
    watch: {
        answers(data){
            let res = find(values(this.answers), (value) => value.key.data === this.item.id && value.valid === true)

            if( res ){
                this.isValid = true;
            }
        }
    }

}
</script>