<template>
    <ls-card-input 
        class="col-sm" 
        v-model="input.value" 
        label="item.text" 
        :value="item.id" 
        :hasError="hasError" 
        :hasSuccess="hasSuccess" 
        :name="activity.type.slug">
        <b-card-text>{{ item.text }}</b-card-text>
        <template slot="img">
            <b-card-img :src="require('@/assets/images/components/examples/cracha-1.png')" />
        </template>
    </ls-card-input>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
