<template>
    <div>
        <b-row class="direcao-change">
            <b-col class="text">
                {{ item.text }}
            </b-col>
            <b-col>
                <async-image
                    :src="srcImage"
                    :alt="item.text"
                    :disable-zoom="true"
                />
            </b-col>
        </b-row>
    </div>
</template>
<script>
/* eslint-disable*/
import { ItemProps } from "./index.js";
import AsyncImage from "@ui/AsyncImage";
export default {
    components: {
        AsyncImage,
    },
    computed: {
        srcImage() {
            return this.item.images[0] ? this.item.images[0].url : ''
        }
    },
    mixins: [ItemProps],
};
</script>
<style lang="scss" scoped>
.text {
    display: flex;
    font-size: 34px;
    justify-content: center;
    padding-bottom: 16px;
}
.image {
    width: 240px;
    padding-top: 8px;
    /deep/img {
        display: flex;
        max-height: 220px;
    }
}
.direcao-change {
    flex-direction: column;
}
</style>


