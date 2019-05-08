<template>
    <div>
        <ls-card-draggable
            v-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>
        
        <ls-card-input
            v-else
            :type="'value'"
            :item="item"
            :template="template"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input>
    </div>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps],
    
}
</script>
