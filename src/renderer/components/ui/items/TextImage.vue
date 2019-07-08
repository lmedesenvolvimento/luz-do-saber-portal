<template>
    <div>
        <b-row>  
            <b-col class="text">
                {{ item.text }}
            </b-col>
            <b-col>
                <async-image :src="item.images[0].url" :disable-zoom="true" />
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
import AsyncImage from '@ui/AsyncImage'
export default {
    components: {
        AsyncImage,
    },
    mixins: [ItemProps],
}
</script>
<style lang="scss" scoped>
    .text{
        display: flex;
        font-size: 34px;
        justify-content: center;
    }
    .image {
        width: 240px;
    }
</style>


