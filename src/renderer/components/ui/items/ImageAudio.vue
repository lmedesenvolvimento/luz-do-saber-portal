<template>
    <div>
        <b-row class="direcao-change">
            <b-col class="item">
                <ls-card-audio-listen-with-player
                    :item="item"
                    :uri="item.audios.length ? item.audios[0].url : ''"
                    :template="activity.item_template.key"
                    proportion="16:9"
                >
                    <async-image :src="item.images.length ? item.images[0].url : ''" />
                </ls-card-audio-listen-with-player>
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
    mixins: [ItemProps],
    mounted() {
        console.log(this.item)
    },
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
    padding-top: 8px;
}
.direcao-change {
    flex-direction: column;
}
</style>