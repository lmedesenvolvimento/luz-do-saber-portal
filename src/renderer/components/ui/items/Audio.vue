<template>
    <ls-card-audio-listen
        v-if="template.slug === Types.slugs.textAudio"
        :type="type"
        :item="item"
        :uri="item.audios.length ? item.audios[0].url : null"
        :template="template"
    ></ls-card-audio-listen>
    <ls-card-audio
        v-else
        :type="type"
        :item="item"
        :uri="item.audios.length ? item.audios[0].url : null"
        :template="template"
    >
    </ls-card-audio>
</template>
<script>
import { ItemProps } from './index.js'

export default {
    mixins: [ItemProps],
}
</script>
