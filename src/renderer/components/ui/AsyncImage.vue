<template>
    <div class="image" :class="[$attrs.class, fitContainer && 'fit-container']">
        <transition name="fade" mode="out-in">
            <ImageLoader v-if="!ready" :color="color" class="loader" />
            <div v-else class="img-flex">
                <viewer v-if="!disableZoom" :options="viewerOpts">
                    <slot name="image">
                        <img :src="computedSrc" :alt="altImage" />
                    </slot>
                </viewer>
                <slot v-else name="image">
                    <img :src="computedSrc" :alt="altImage" />
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
        color: {
            type: String,
            default: '#fff'
        },
        src: {
            type: String,
            required: true,
        },
        disableZoom: {
            type: Boolean,
            default: true,
        },
        alt: {
            type: String,
            default: ''
        },
        fitContainer: {
            type: Boolean,
            default: false,
        },
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
        },
        altImage(){
            if (this.alt) return this.alt
            else return this.src.split('/').pop().split('.')[0]
        }
    },
    mounted(){
        const image = new Image()
        image.onload = event => {
            this.ready = true
        }
        image.src = this.computedSrc
    },
}
</script>

<style lang="scss" scoped>
.image{
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 100%;
    margin: auto;
    &.fit-container {
        img, .loader {
            max-height: 100%;
            height: 220px;
        }
    }
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
