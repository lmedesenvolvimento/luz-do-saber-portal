<template>
    <div id="escrever" class="fill container biblioteca">
        <div class="page-container">
            <navbar :navbar-title="book.title" :navbar-subtitle="''"/>
            <div class="gameplay">
                <div class="step-bars">
                    <div
                        v-for="(value, index) in images"
                        :key="index"
                        class="bar"
                        :class="{'active': getPosition == index, 'complete': index -1 < getPosition}"
                    ></div>
                </div>
                <div class="gameplay-body">
                    <div class="col-flow image-viewer">
                        <figure class="image fill">
                            <transition-group name="fade">
                                <div v-for="image in images" v-show="image.visible" :key="image.key" class="img-wrap fill">
                                    <viewer :options="viewerOpts">
                                        <slot name="image">
                                            <img :src="image.source">
                                        </slot>
                                    </viewer>
                                </div>
                            </transition-group>
                        </figure>
                    </div>
                </div>
                <div class="gameplay-footer">
                    <b-button @click="prev">
                        prev
                    </b-button>
                    <b-button @click="next">
                        next
                    </b-button>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
Vue.use(Viewer)

import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    data(){
        return{
            images: [],
            getPosition: 0,
            viewerOpts: {
                'inline': false,
                'button': false,
                'navbar': false,
                'title': false,
                'toolbar': false,
                'tooltip': false,
                'movable': true,
                'zoomable': true,
                'rotatable': false,
                'scalable': false,
                'transition': true,
                'fullscreen': false,
                'keyboard': false,
                'url': 'data-source'
            }
        }
    },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-write.png')
        },
        book(){
            const id = parseInt(this.$route.params.livro_id)
            const book = this.$store.getters['Books/getBookById'](id)
            return book || {}
        }
    },
    created() {
        for (let i = 0; i < this.book.pages.length; i++) {
            this.images.push({
                key: 'imagem ' + (i + 1),
                source: this.book.pages[i].url,
                visible: false
            })
        }
        this.image = this.images[this.getPosition]
        this.image.visible = true
    },
    methods: {
        next () {
            this.image.visible = false
            if (this.getPosition < this.images.length - 1) {
                this.getPosition++
                this.image = this.images[this.getPosition]
            }
            this.image.visible = true
        },
        prev () {
            this.image.visible = false
            if (this.getPosition !== 0) {
                this.getPosition--
                this.image = this.images[this.getPosition]
            }
            this.image.visible = true
        },
    }
}
</script>

<style lang="scss" scoped>
.gameplay-body{
    height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
    max-height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
}
.image-viewer{
    .image{
        position: relative;
        span{
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            // &::after{
            //     background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 45%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0) 100%);
            //     content: "";
            //     height: 100%;
            //     width: 2em;
            //     position: absolute;
            // }
        }
        .img-wrap{
            position: absolute;
            justify-content: center;
            align-items: center;
            display: flex;
            div{
                width: auto;
                height: 80%;
            }
            img {
                height: 100%; 
                width: 100%; 
                object-fit: contain;
                filter: drop-shadow(0 0 0.75rem #252525);
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
