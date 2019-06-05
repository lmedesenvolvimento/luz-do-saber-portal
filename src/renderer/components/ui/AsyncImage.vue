<template>
    <div class="image" :class="$attrs.class">
        <transition name="fade" mode="out-in">
            <facebook-loader v-if="!ready" primary-color="#999999" :speed="1" :animate="true"></facebook-loader>
            <slot v-else name="image">
                <img :src="src" />
            </slot>
        </transition>
    </div>
</template>

<script>
import { FacebookLoader } from 'vue-content-loader'
export default {
    components: {
        FacebookLoader
    },
    inheritAttrs: false,
    props: {
        src: String
    },
    data(){
        return {
            ready: false
        }
    },
    mounted(){
        const image = new Image()
        image.onload = event => {
            return this.ready = true
        } 
        image.src = this.src
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
