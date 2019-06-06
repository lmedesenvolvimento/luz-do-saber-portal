<template>
    <div>
        <ls-card-audio-listen
            v-if="template.custom === Types.custom.audioPlayer"
            :type="type"
            :item="item"
            :template="template"
        ></ls-card-audio-listen>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps],
    mounted() {
    }
}
</script>
