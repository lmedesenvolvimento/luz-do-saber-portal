<template>
    <div id="escrever" class="fill container biblioteca">
        <div class="page-container">
            <navbar :navbar-title="book.title" :navbar-subtitle="''" />
            <div class="gameplay">
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
                            <transition-group name="fade">
                                <div v-for="image in images" v-show="isVisible(image)" :key="image.key" class="img-wrap fill">
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
                    <div class="footer-info">                        
                        <div v-b-tooltip="{ title:'Capa do Livro', container: '.footer-info'}" class="btn-book cover" @click.stop="toPage(0)"></div>
                        <div v-b-tooltip="{ title:'Informações', container: '.footer-info'}" class="btn-book info" @click.stop="toPage(images.length-1)"></div>
                        <a v-b-tooltip="{ title:'Download', trigger: 'hover click', container: '.footer-info'}" :href="book.pdf_url" :download="book.title" class="btn-book download"></a>
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
        console.log(this.book)
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
        isVisible( image ){
            return image === this.images[this.getPosition]
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
        download() {

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
.gameplay-body{
    height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
    max-height: calc(#{ $gameplay-height} + #{$gameplay-header-height });
}

.gameplay-footer{
    display: flex;
    align-items: center;
    max-height: 70px;
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
        span{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            // &::after{
            //     background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 45%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0) 100%);
            //     content: "";
            //     height: 74%;
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
