<template>
    <div>
        <ls-card-input-text
            v-if="isInput"
            name="base-input" 
            :value="item"
            type="value"
            :bg-color="fillBackgroundColor"
        />

        <ls-card-draggable
            v-else-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="fillBackgroundColor"
        >
            {{ item.text }}
        </ls-card-draggable>

        <ls-card-droppable
            v-else-if="isDrop"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="fillBackgroundColor"
        >
            {{ item.text }}
        </ls-card-droppable>

        <ls-card-display 
            v-else-if="type === 'key'"
            class="col-sm" 
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="fillBackgroundColor"
        >
            {{ item.text }}
        </ls-card-display>

        <ls-card-input 
            v-else-if="type === 'value'"
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
            :bg-color="fillBackgroundColor"
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