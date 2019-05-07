<template>
    <b-row
        label="item.text" 
        :type="type"
        :item="item"
        :name="activity.type.slug" 
    >
        <b-col
            v-for="(letter, index) in item.text.split('')" 
            :key="index"
            :sm="1"
            class="item"
        >
            <div class="letra">
                <ls-card-display>{{ letter }}</ls-card-display>
            </div>
        </b-col>
    </b-row>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>