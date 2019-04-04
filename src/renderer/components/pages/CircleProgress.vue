<template>
  <div id="app">
      <div class="chart-progress">
        <b-card class="shadow">
            <div class="chart-progress-label shitzu-porko p2" v-if="label" v-bind:style="{'background-color': color, 'color': color }">{{ label }}</div>
          
            <div>
                <div class="img-container" :style="{'background-color': color.color }">
                    <img :src="image" class="img-fluid"/>
                </div>

                <vue-circle 
                    :progress="50"
                    :size="190"
                    :reverse="false"
                    line-cap="round"
                    :fill="color"
                    empty-fill="rgba(0, 0, 0, .1)"
                    :animation-start-value="0.0"
                    :start-angle="0"
                    insert-mode="append"
                    :thickness="12"
                    :show-percent="false">
                </vue-circle>
            </div>
        </b-card>
    </div>
  </div>
</template>

<script>
  import VueCircle from 'vue2-circle-progress'

  export default {
    props: {
      label: String,
      image: String,
      color: Object,
    },
    methods:{
      progress(event,progress,stepValue){
        // console.log(stepValue);
      },
      progress_end(event){
        // console.log("Circle progress end");
      }
    },
    components: { VueCircle }
  }
</script>