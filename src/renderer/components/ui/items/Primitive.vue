<template>
    <ls-item-text-image
        v-if="template.slug === Types.slugs.textImage"
        :item="item"
        :size="size"
    >
    </ls-item-text-image>
    <ls-item-image-audio
        v-else-if="template.slug === Types.slugs.imageAudio"
        :type="type"
        :item="item"
        :size="size"
        :template="template"
    ></ls-item-image-audio>
    <ls-item-video
        v-else-if="template.slug === Types.slugs.textVideo"
        :type="type"
        :item="item"
        :size="size"
        :template="template"
    ></ls-item-video>
    <ls-item-text
        v-else-if="template.type === Types.primitive.text"
        :type="type"
        :item="item"
        :size="size"
        :focus="focus"
        :group="group"
        :template="template"
    ></ls-item-text>
    <ls-item-image
        v-else-if="template.type === Types.primitive.image"
        :type="type"
        :item="item"
        :size="size"
        :template="template"
    ></ls-item-image>
    <ls-item-audio
        v-else-if="template.type === Types.primitive.audio"
        :type="type"
        :item="item"
        :size="size"
        :template="template"
    ></ls-item-audio>
</template>

<script>
import ItemComponents, { ItemProps } from './index.js'
export default {
    components: { ...ItemComponents },
    mixins: [ItemProps]
}
</script>

<style></style>
