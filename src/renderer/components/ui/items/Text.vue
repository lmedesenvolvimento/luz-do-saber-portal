<template>
    <ls-card-input 
        class="col-sm" 
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug"
    >
        {{ item.text }}
    </ls-card-input>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps]
}
</script>
