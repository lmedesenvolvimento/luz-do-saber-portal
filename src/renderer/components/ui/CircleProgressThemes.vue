<template>
    <div class="circle-and-box">
        <b-col class="container-circle">
            <vue-circle class="circle"
                        :progress="progress"
                        :size="140"
                        :reverse="false"
                        line-cap="round"
                        :fill="color"
                        empty-fill="rgba(0, 0, 0, .1)"
                        :animation-start-value="0.0"
                        :start-angle="30"
                        insert-mode="append"
                        :thickness="8"
                        :show-percent="false"
            >
                <div class="img-container" :style="{'background-color': color.color }">
                    <async-image :src="image" :alt="image" class="img-fluid"></async-image>
                </div>
            </vue-circle>
        </b-col>
        <b-col v-if="label" class="my-3 title-module-container">
            <h3>
                {{ label }}
            </h3>
        </b-col>
    </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import AsyncImage from '@ui/AsyncImage'

export default {
    components: {
        VueCircle,
        AsyncImage
    },
    props: {
        label: String,
        image: String,
        color: Object,
        progress: {
            type: Number,
            default: 5
        },
    },
};
</script>