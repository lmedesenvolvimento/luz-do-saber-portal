<template>
    <ls-card-display
        
        label="item.text" 
        :name="activity.type.slug"
        :type="type"
        :item="item"
    >
        {{ item.text }} 
    </ls-card-display>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
