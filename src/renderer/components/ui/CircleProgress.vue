<template>
    <div class="chart-progress">
        <b-card class="shadow">
            <div
                v-if="label"
                :style="{'background-color': color.color, 'color': color.color }"
                :class="{complementar: isComplementar}"
                class="chart-progress-label shitzu-porko p2"
            >
                {{ label }}
                <!-- <p class="complementar">Complementar</p> -->
            </div>

            <div class="radial-container">
                <div class="img-container" :style="{'background-color': color.color }">
                    <figure>
                        <div class="image" :class="slug" :title="label"></div>
                    </figure>
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
import VueCircle from 'vue2-circle-progress'

export default {
    components: {
        VueCircle
    },
    props: {
        label: String,
        slug: String,
        color: Object,
        progress: {
            type: Number,
            default: 0
        }
    },
    computed : {
        isComplementar() {
            if (this.label.includes('complementar')){
                return true 
            } else return false

        }
    }
}
</script>
<style>
.complementar{
    font-size: 18px !important;
    margin-bottom: -13px !important;
}
</style>