<template>
    <div class="lottie"></div>
</template>

<script>
import axios from 'axios'

if (process.env.BUILD_TARGET !== 'web') {
    window.lottie = require('lottie-web')
}

else if (process.env.NODE_ENV === 'development') {
    window.lottie = require('lottie-web')
}

const FRAME_PER_SECONDS = 30

export default {
    props: {
        path: null,
        totalSeconds: {
            type: Number,
            default: 0
        },
        animated: {
            type: Boolean,
            default: false 
        }
    },
    data() {
        return {
            animation: null,
            animationData: '',
        }
    },
    watch: {
        animated(isAnimated) {
            if (isAnimated) {
                setTimeout(() => {
                    this.animation.goToAndPlay(0)
                }, 150)
            } else {
                setTimeout(() => {
                    this.jumpToEnd()
                }, 150)
            }
        }
    },
    mounted() {                
        const isDekstop = process.env.NODE_ENV !== 'development' && process.env.BUILD_TARGET !== 'web'
        const path = isDekstop ? 'http://localhost:9000/' + this.path : '/static/' + this.path

        axios.get(path).then(({ data }) => {
            this.animationData = data
        })

        this.animation = lottie.loadAnimation({
            path,
            container: this.$el,
            renderer: 'svg',
            loop: true,
            autoplay: false
        })

        this.animation.addEventListener('DOMLoaded', () => {
            this.jumpToEnd()
        })

    },    
    methods: {
        jumpToEnd() {
            this.animation.goToAndStop(this.totalSeconds * FRAME_PER_SECONDS, true)
        }
    }
}
</script>

<style lang="scss">
.lottie {
    max-width: 440px;
    height: auto;
}
</style>