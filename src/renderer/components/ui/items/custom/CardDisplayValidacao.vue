<template>
    <ls-card-display
        label="item.text" 
        :name="activity.type.slug"
        :type="type"
        :item="item"
        :valid="isValid"
    >
        <div :class="{'invisible':!isValid}">{{ item.text }} </div>
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