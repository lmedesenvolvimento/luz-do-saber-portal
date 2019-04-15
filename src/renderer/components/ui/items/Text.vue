<template>
    <div>
        <ls-card-display 
            v-if="type === 'key'"
            class="col-sm" 
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
        >
            {{ item.text }}
        </ls-card-display>

        <ls-card-input 
            v-if="type === 'value'"
            class="col-sm" 
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
        >
            {{ item.text }}
        </ls-card-input>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps]
}
</script>
