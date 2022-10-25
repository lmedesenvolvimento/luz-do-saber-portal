<template>
    <div class="image" :class="$attrs.class">
        <transition name="fade" mode="out-in">
            <ImageLoader v-if="!ready" :color="color" />
            <div v-else class="img-flex">
                <viewer v-if="!disableZoom" :options="viewerOpts">
                    <slot name="image">
                        <img :src="computedSrc" :alt="[alt ? altImage(alt) : altImage(src)]" />
                    </slot>
                </viewer>
                <slot v-else name="image">
                    <img :src="computedSrc" />
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import ImageLoader from './ImageLoader'
import { viewerOpts } from '@/constants'
export default {
    components: {
        ImageLoader
    },
    inheritAttrs: false,
    props: {
        color: String,
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
    computed: {
        computedSrc() {
            if(this.$isProduction)
                return this.src
            else return this.src.split('/')[1] === 'system' ? `http://localhost:3000${this.src}` : this.src
        }
    },
    mounted(){
        const image = new Image()
        image.onload = event => {
            return this.ready = true
        }
        image.src = this.computedSrc
    },
    methods: {
        altImage: function(src){
            if(src != null){
                return src.split('/')[src.split('/').length - 1].split('.')[0]
            }else {
                return 'default'
            }            
        }
    }
}
</script>

<style lang="scss" scoped>
.image{
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 100%;
    margin: auto;
    img {
        display: inline-block;
        max-width: 100%;
        max-height: 250px;
        margin: auto;
    }
    > svg{
        display: block;
        margin: auto;
        max-width: 80%;
    }
    .img-flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
