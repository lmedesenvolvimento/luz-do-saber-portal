<template>
    <ls-card-input-cracha 
        class="col-sm" 
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug"
    >
        <div class="cracha-text">
            <p>{{ item.text }}</p>
        </div>
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
