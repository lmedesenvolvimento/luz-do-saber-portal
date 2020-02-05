<template>
    <div class="lottie"></div>
</template>

<script>
import lottie from 'lottie-web'

const FRAME_PER_SECONDS = 60

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
            animation: null
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
        this.animation = lottie.loadAnimation({
            path: this.path,
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
            this.animation.goToAndStop(this.totalSeconds * FRAME_PER_SECONDS)
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