<template>
    <div>
        <ls-card-image-display
            v-if="type === 'key'"
            class="col-sm" 
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :template="template"
        >
        </ls-card-image-display>

        <ls-card-draggable
            v-else-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            <img :src="item.images[0].url" :alt="item.text">
        </ls-card-draggable>

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
    mounted() {
        // console.log(this.item.images[0].url)
    }
}
</script>
