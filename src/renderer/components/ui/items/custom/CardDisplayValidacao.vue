<template>
    <b-container fluid>
        <b-col >
            <b-row v-if="isValid"> X</b-row>
            <b-row>
                <ls-card-display
                    label="item.text" 
                    :name="activity.type.slug"
                    :type="type"
                    :item="item"
                >
                    <div :class="{'invisble':!isValid}">{{ item.text }} </div>
                </ls-card-display>
            </b-row>
            
        </b-col>
    </b-container>
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
<style>
.invisble{
    visibility: hidden;
}
</style>
