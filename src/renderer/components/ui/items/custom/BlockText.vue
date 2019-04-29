<template>
    <b-row
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug" 
    >
        <ls-card-display v-for="index in item.text.length" :key="index">
            {{ item.text[index - 1] }}
        </ls-card-display>        
    </b-row>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>