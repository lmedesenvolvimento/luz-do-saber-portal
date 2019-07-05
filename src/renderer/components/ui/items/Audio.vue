<template>
    <div>
        <ls-card-audio-listen
            v-if="template.custom === Types.custom.audioPlayer"
            :type="type"
            :item="item"
            :template="template"
        ></ls-card-audio-listen>
        <ls-card-audio-image-listen
            v-else-if="template.slug === Types.slugs.audioImage"
            :type="type"
            :item="item"
            :template="template"
        >
        </ls-card-audio-image-listen>
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
