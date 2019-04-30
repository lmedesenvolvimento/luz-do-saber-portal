<template>
    <ls-card-input-cracha 
        class="col-sm" 
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug"
    >
        {{ item.text }}
    </ls-card-input-cracha>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
