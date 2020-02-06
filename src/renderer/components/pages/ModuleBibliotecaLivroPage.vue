<template>
    <div id="escrever" class="fill container biblioteca" :class="{fullscreen}">
        <div class="page-container">
            <navbar :navbar-title="book.title" :navbar-subtitle="''" />
            <div class="gameplay">
                <div v-if="fullscreen" class="btn icon-close" @click.stop="maximize"></div>
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
                                    <div v-if="image.loaded" class="lazy-load" :class="{'division' : !notSingle(image)}">
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
                    <div v-if="!fullscreen" class="footer-info">
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
            Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen
        }
        if (!document.exitFullscreen) {
            document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen
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

<style lang="scss" scoped></style>
