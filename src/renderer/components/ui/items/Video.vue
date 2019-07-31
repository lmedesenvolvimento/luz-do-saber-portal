<template>
    <div>
        <ls-card-video-youtube
            v-if="type === 'key'"
            class="col-sm"
            label="item.text"
            :item="item"
            :name="activity.type.slug"
            :template="template"
        >
        </ls-card-video-youtube>
    </div>
</template>
<script>
import { ItemProps } from './index.js'

export default {
    mixins: [ItemProps],
    mounted() {
    },
}
</script>
