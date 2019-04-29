<template>
    <div id="app">
        <div class="circle-and-box">
            <b-col class="container-circle">
                <div class="img-container" :style="{'background-color': color.color }">
                    <vue-circle class="circle"
                                :progress="50"
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
                    <img :src="image" class="img-fluid">
                </div>
            </b-col>
            <b-col v-if="label" class="my-3 title-container">
                {{ label }}
            </b-col>
        </div>
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
        color: Object
    },
    methods: {
        progress(event, progress, stepValue) {
            // console.log(stepValue);
        },
        progress_end(event) {
            // console.log("Circle progress end");
        }
    }
};
</script>