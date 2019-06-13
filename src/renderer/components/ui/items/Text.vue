<template>
    <div>
        <ls-card-input-text
            v-if="isInput"
            name="base-input" 
            :value="item"
            :focus="focus"
            type="value"
            :bg-color="item.color"
        />

        <ls-card-draggable
            v-else-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>

        <ls-card-droppable
            v-else-if="isDrop && !group"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-droppable>  

        <ls-card-group-droppable
            v-else-if="isDrop && group"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-group-droppable>        

        <ls-card-input 
            v-else-if="type === 'key' && isJoinInput"
            label="item.text" 
            :item="item"
            :type="type"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input>

        <ls-card-display 
            v-else-if="type === 'key'"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-display>

        <ls-card-input 
            v-else-if="type === 'value'"
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps],
}
</script>
