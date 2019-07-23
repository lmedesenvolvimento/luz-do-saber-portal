<template>
    <div class="image" :class="$attrs.class">
        <transition name="fade" mode="out-in">
            <facebook-loader v-if="!ready" primary-color="#999999" :speed="1" :animate="true"></facebook-loader>
            <div v-else>
                <viewer v-if="!disableZoom" :options="viewerOpts">
                    <slot name="image">
                        <img :src="src" :alt="[alt ? altImage(alt) : altImage(src)]" />
                    </slot>
                </viewer>
                <slot v-else name="image">
                    <img :src="src" />
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import { FacebookLoader } from 'vue-content-loader'
import { viewerOpts } from '@/constants'
export default {
    components: {
        FacebookLoader
    },
    inheritAttrs: false,
    props: {
        src: String,
        disableZoom: Boolean,
        alt: String
    },
    data(){
        return {
            ready: false,
            viewerOpts
        }
    },      
    mounted(){
        const image = new Image()
        image.onload = event => {
            return this.ready = true
        }
        image.src = this.src
    },
    methods: {
        altImage: function(src){
            return src.split('/')[src.split('/').length - 1].split('.')[0]
        }
    }
}
</script>

<style lang="scss">
.image{
    display: block;
    margin: auto;
    img {
        display: inline-block;
        max-width: 100%;
        margin: auto;
    }
    > svg{
        display: block;
        margin: auto;
        max-width: 80%;
    }
}
</style>
