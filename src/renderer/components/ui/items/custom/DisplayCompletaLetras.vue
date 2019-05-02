<template>

    <ls-card-input
        :type="value"
        :item="item"
        :template="template"
    >{{ item.text }}</ls-card-input>

</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
