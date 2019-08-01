<template>
    <div class="chart-progress">
        <b-card class="shadow">
            <div
                v-if="label"
                :style="{'background-color': color.color, 'color': color.color }"
                class="chart-progress-label shitzu-porko p2"
            >
                {{ label }}
            </div>

            <div class="radial-container">
                <div class="img-container" :style="{'background-color': color.color }">
                    <img :src="image" class="img-fluid" :alt="label">
                </div>

                <vue-circle
                    :progress="progress"
                    :size="190"
                    :reverse="false"
                    line-cap="round"
                    :fill="color"
                    empty-fill="rgba(0, 0, 0, .1)"
                    :animation-start-value="0.0"
                    :start-angle="30"
                    insert-mode="append"
                    :thickness="12"
                    :show-percent="false"
                />
            </div>
        </b-card>
    </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress';

export default {
    components: {
        VueCircle
    },
    props: {
        label: String,
        image: String,
        color: Object,
        progress: {
            type: Number,
            default: 0
        }
    }
};
</script>