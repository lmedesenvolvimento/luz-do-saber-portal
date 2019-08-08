<template>
    <div id="escrever" class="fill container biblioteca" :class="{fullscreen}">
        <div class="page-container">
            <navbar :navbar-title="book.title" :navbar-subtitle="''" />
            <div class="gameplay">
                <div class="btn icon-close" v-if="fullscreen" @click.stop="maximize"></div>
                <div class="step-bars">
                    <div
                        v-for="(value, index) in images"
                        :key="index"
                        class="bar"
                        :class="{ 'complete': index -1 < getPosition}"
                    ></div>
                </div>
                <div class="gameplay-body">
                    <div class="col-flow image-viewer">
                        <figure class="image fill">
                            <transition-group class="transition-span" name="fade">
                                <div v-for="image in images" v-show="isVisible(image)" :key="image.key" class="img-wrap fill">
                                    <div class="lazy-load" v-if="image.loaded" :class="{'division' : !notSingle(image)}">
                                        <viewer :options="viewerOpts">
                                            <slot name="image">
                                                <img :src="image.source">
                                            </slot>
                                        </viewer>
                                    </div>
                                    <b-spinner v-else label="Carregando..." variant="warning"></b-spinner>
                                </div>
                            </transition-group>
                        </figure>
                    </div>
                </div>
                <div class="gameplay-footer">
                    <div class="footer-navigation">
                        <b-btn variant="link" @click.stop="prev">
                            <div class="icon-prev"></div>
                        </b-btn>
                        <div class="page-card">
                            <div>{{ page }}</div>                            
                        </div>
                        <b-btn variant="link" @click.stop="next">
                            <div class="icon-next"></div>
                        </b-btn>
                    </div>
                    <div class="footer-info" v-if="!fullscreen">                        
                        <div v-b-tooltip="{ title:'Capa do Livro', container: '.footer-info'}" class="btn-book cover" @click.stop="toPage(0)"></div>
                        <div v-b-tooltip="{ title:'Informações', container: '.footer-info'}" class="btn-book info" @click.stop="toPage(images.length-1)"></div>
                        <a v-b-tooltip="{ title:'Download', trigger: 'hover', container: '.footer-info'}" :href="book.pdf_url" :download="book.title" class="btn-book download"></a>
                        <div v-b-tooltip="{ title:'Tela Cheia', container: '.footer-info'}" class="btn-book maximize" @click.stop="maximize"></div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { VBTooltip } from 'bootstrap-vue'

import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    data(){
        return{
            images: [],
            getPosition: 0,
            fullscreen: '',
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
        book(){
            const id = parseInt(this.$route.params.livro_id)
            const book = this.$store.getters['Books/getBookById'](id)
            return book || {}
        },
        page(){            
            if(this.getPosition===0)
                return 'Capa'
            else if(this.getPosition===this.images.length-1)
                return 'Verso'
            else
                return (this.getPosition*2-1)+' - '+(this.getPosition*2)
        }
    },
    created() {
        for (let i = 0; i < this.book.pages.length; i++) {
            let image = {
                key: 'imagem ' + (i + 1),
                source: this.book.pages[i].url,
                loaded: false
            }
            this.images.push(image)

            let picture =  new Image()
            
            picture.onload = () => {
                image.loaded = true
            }

            picture.src = this.book.pages[i].url
        }
        this.getPosition = this.book.lastPage || 0
        this.image = this.images[this.getPosition]
        this.image.visible = true
        if (!Element.prototype.requestFullscreen) {
            Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
        }
        if (!document.exitFullscreen) {
            document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        }
    },
    methods: {
        isVisible( image ){
            return image === this.images[this.getPosition]
        },
        notSingle( image ){
            return image === this.images[0] || image === this.images[this.images.length-1]
        },
        next () {
            if (this.getPosition < this.images.length - 1) {
                this.getPosition++
                this.image = this.images[this.getPosition]
            }
            this.setBook({...this.book, lastPage: this.getPosition})
        },
        prev () {
            if (this.getPosition !== 0) {
                this.getPosition--
                this.image = this.images[this.getPosition]
            }
        },
        toPage (index) {
            this.getPosition = index
            this.image = this.images[this.getPosition]
        },
        maximize() {
            var elem = document.querySelector('body')

            if(this.fullscreen===''){
                this.fullscreen = 'fullscreen'
                elem.requestFullscreen()
            }
            else{
                this.fullscreen = ''
                document.exitFullscreen()
            }
            
        },
        ...mapActions('Books',['setBook'])
    }
}
</script>

<!-- tooltip style -->
<style lang="scss">
.footer-info{
    .tooltip{
        filter: drop-shadow(0 2px 0.7rem #AEAEAE);
        .tooltip-inner{
            @include itim_regular;
            background-color: #FDFDFD;
            color: #676767;
            font-size: 1rem;      
            text-transform: uppercase;
            padding: 8px 20px;
            border-radius: 20px;
        }
        .arrow{
            &::before{
                border-width: 0.8rem 0.5rem 0;
                border-top-color: #fff;                
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.biblioteca{
    &.fullscreen{
        z-index: 999; 
        width: 100vw;
        height: 100vh; 
        max-width: 100vw;
        max-height: 100vh;
        padding: 0;
        position: fixed; 
        top: 0; 
        left: 0;
        .navbar{
            display: none;
        }
        .gameplay{
            z-index: 9999; 
            width: 100%; 
            height: 100%; 
            max-width: 100%;
            max-height: 100%;
            margin: 0;
            position: fixed; 
            top: 0; 
            left: 0;
        }
        .btn{
            &.icon-close{
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                padding: 0;
                cursor: pointer;
                @include embed_image("~@/assets/images/icons/biblioteca/icon-close.png", 56px, 59px);
            }
        }
        .step-bars{
            margin: 3% 15%;
            width: 70%;
        }
        .gameplay-body{
            height: 70vh;
            max-height: 70vh;
            margin-top: 10vh;
            margin-bottom: 4vh;
            border: none;
            .img-wrap div{
                height: 100%;
            }
        }
        .image-viewer{
            .image{
                .transition-span{
                    height: 100%;
                }
            }
        }
    }
}



.gameplay-body{
    height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
    max-height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
}

.gameplay-footer{
    display: flex;
    align-items: center;
    max-height: 90px;
}

.bar{
    margin-right: 0 !important;
}

.btn-book{
    &.cover{
        @include embed_image("~@/assets/images/icons/btn-book-cover.png", 62px, 62px);
    }
    &.info{
        @include embed_image("~@/assets/images/icons/btn-book-info.png", 62px, 62px);
    }
    &.maximize{
        @include embed_image("~@/assets/images/icons/btn-book-maximize.png", 62px, 62px);
    }
    &.download{
        @include embed_image("~@/assets/images/icons/btn-download.png", 62px, 62px);
    }
    max-height: 62px;
    user-select: none;
    outline: none;
    &:hover,
    &:focus,
    &:active {
        cursor: pointer;
    }
}
.footer-navigation{
    margin-right: auto;
    margin-left: auto;
}

.footer-info{
    position: absolute;
    right: 1em;
}

.footer-navigation,
.footer-info{
    display: flex;
    align-items: center;
    justify-content: center;
    .page-card{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        color: #0B7DA2;
        width: 120px;
        height: 3rem;
        background-color: #EAE9E9;
        border: 2px #00CCC2 solid;
        box-shadow: inset 0px 0px 0px 4px #FFFFFF;
        border-radius: 10px;
    }    
}

.image-viewer{
    .image{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .transition-span{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 70%;
            position: relative;
            .division::after{
                background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
                content: "";
                height: 100%;
                width: 10em;
                position: absolute;
                mix-blend-mode: multiply;
            }
        }
        .img-wrap{
            position: absolute;
            justify-content: center;
            align-items: center;
            display: flex;
            div{
                width: auto;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            img {
                height: 100%; 
                width: 100%; 
                object-fit: contain;
                filter: drop-shadow(rgba(132, 132, 132, 0.8) -10px 0px 1rem);
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
