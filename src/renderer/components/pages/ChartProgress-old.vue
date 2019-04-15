<template>
    <div class="chart-progress">
        <b-card class="shadow">
            <div class="chart-progress-label shitzu-porko p2" v-if="label" v-bind:style="{'background-color': color, 'color': color }">{{ label }}</div>
            
            <div v-bind:class="{ 'custom-content': customContent }" v-if="customContent">
                <slot></slot>
            </div>

            <div v-bind:class="{ 'custom-content-front': customContent }">                                
                <div class="img-container" v-bind:style="{'background-color': color }">
                    <img :src="image" class="img-fluid"/>
                </div>

                <radial-progress-bar 
                    :diameter="diameter || 200"
                    :strokeWidth="strokeWidth || 12.5"
                    :completedSteps="totalCompleted"
                    :innerStrokeColor="innerStrokeColor"
                    :startColor="color"
                    :stopColor="color"
                    :totalSteps="totalSteps">
                </radial-progress-bar>
            </div>
        </b-card>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
    props: {
        label: String,
        image: String,
        color: String,
        diameter: Number,
        strokeWidth: Number,
        customContent: Boolean,
        totalCompleted: Number
    },
    data () {
        return {
            innerStrokeColor: "#dddddd",
            totalSteps: 100
        }
    },
    components: { RadialProgressBar }
}
</script>
<style lang="scss" scoped></style>