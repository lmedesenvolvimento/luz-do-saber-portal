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
import { find, filter, values, chain } from 'lodash'
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
            let answers = chain(this.answers)
                .values()
                .filter((a) => a.valid)
                .value()

            let res = filter(answers, (a) => {
                const value_id = this.item.value_ids[0]
                return (a.value.data.includes(value_id) && a.valid === true)
            })

            res.forEach(element => {
                this.isValid = true
            })

        }
    }

}
</script>