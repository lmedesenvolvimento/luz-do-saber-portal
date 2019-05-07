<template>
    <div>
        <ls-card-draggable
            v-if="type === 'value'"
            label="item.text" 
            name="card-input"
            type="value"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>

        <ls-card-droppable
            v-if="type === 'key'"
            label="item.text" 
            name="card-input"
            type="key"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-droppable> 
    </div>
</template>

<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>

<style>

</style>
