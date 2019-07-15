<template>
    <ls-card-audio-listen
        v-if="template.slug === Types.slugs.textAudio"
        :type="type"
        :item="item"
        :template="template"
    ></ls-card-audio-listen>
    <ls-card-audio
        v-else
        :type="type"
        :item="item"
        :template="template"
    >
    </ls-card-audio>
</template>
<script>
import { ItemProps } from './index.js'

export default {
    mixins: [ItemProps],
    mounted() {
    },
}
</script>
