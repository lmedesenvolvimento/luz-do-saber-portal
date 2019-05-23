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

        <!-- <ls-card-input-image
            v-else-if="isInput"
            name="base-input" 
            :value="item"
            type="value"
            :bg-color="item.color"
        /> -->

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
            class="col-sm" 
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
            class="col-sm" 
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-display>

        <div v-else-if="type === 'value'">
            <ls-checkmark
                :type="type"
                :item="item"
                :bg-color="item.color"
            >
            </ls-checkmark>

            <ls-card-input 
                label="item.text" 
                :type="type"
                :item="item"
                :name="activity.type.slug"
                :bg-color="item.color"
            >
                {{ item.text }}
            </ls-card-input>
        </div>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps],
}
</script>