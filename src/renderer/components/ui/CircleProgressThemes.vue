<template>
    <div id="app">
        <b-row class="circle-and-box">
            <b-col class="container-circle">
                <vue-circle class="circle"
                            :progress="50"
                            :size="130"
                            :reverse="false"
                            line-cap="round"
                            :fill="color"
                            empty-fill="rgba(10, 10, 10, .2)"
                            :animation-start-value="0.0"
                            :start-angle="30"
                            insert-mode="append"
                            :thickness="8"
                            :show-percent="false"
                >
                    <div class="img-container" :style="{'background-color': color.color }">
                        <img :src="image" class="img-fluid">
                    </div>
                </vue-circle>
            </b-col>
            <b-col v-if="label" class="my-3 title-module-container">
                <h3>{{ label }}</h3>
            </b-col>
        </b-row>
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
};
</script>