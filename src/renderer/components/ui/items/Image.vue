<template>
    <div>
        <ls-card-image-display
            v-if="type === 'key'"
            class="col-sm"
            label="item.text"
            :item="item"
            :name="activity.type.slug"
            :template="template"
        >
        </ls-card-image-display>

        <ls-card-draggable
            v-else-if="isDrag"
            label="item.text"
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            <div class="icon-img" :style="{backgroundImage: `url('${item.images[0].url}')`}"></div>

            <template slot="transfer-data">
                <div class="icon-img" :style="{backgroundImage: `url('${item.images[0].url}')`}"></div>
            </template>
        </ls-card-draggable>

        <ls-card-input
            v-else-if="type === 'value'"
            label="item.text"
            :type="type"
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            <async-image 
                :src="item.images[0].url" 
                :alt="item.text" 
                :disable-zoom="true" 
            />
        </ls-card-input>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
import AsyncImage from '@ui/AsyncImage'

export default {
    components: { AsyncImage },
    mixins: [ItemProps],
    mounted() {
    },
}
</script>
