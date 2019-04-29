<template>
    <ls-card-input-cracha 
        class="col-sm" 
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug"
    >
        <b-card-text>{{ item.text }}</b-card-text>
        <template slot="img">
            <b-card-img :src="require('@/assets/images/components/examples/cracha-1.png')" />
        </template>
    </ls-card-input-cracha>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
