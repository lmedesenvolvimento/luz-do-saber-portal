<template>
    <div class="journal">        
        <b-row class="journal-container">
            <b-col>
                <div id="journalCanvas" class="journal-box">
                    <div class="journal-page-container journal-single-page">
                        <div class="journal-page journal-cover">
                            <div class="journal-decoration-1" />
                            <div class="journal-decoration-2" />
                            <div class="journal-content">
                                <div v-for="page in pages" :key="page.nameIndex">
                                    <journal-page    
                                        v-if="page.nameIndex == pageName"                                     
                                        :have-title="page.haveTitle"
                                        :have-story-title="page.haveStoryTitle"
                                    />
                                </div>                                
                            </div>
                            <div class="journal-decoration-1" />
                        </div>
                    </div>
                </div>
                <b-row align-h="end" class="journal-footer">
                    <b-col cols="4">
                        <b-row align-h="center">
                            <b-button v-b-modal.modal-center class="btn-journal" @click="toPrevPage">
                                <img :src="prevPage" alt="Página anterior">
                            </b-button>
                            <div class="journal-footer-page-name">
                                <div>
                                    <h3>{{ pageName }}</h3>
                                </div>
                            </div>               
                            <b-button v-b-modal.modal-center class="btn-journal" @click="toNextPage">
                                <img :src="nextPage" alt="Próxima página">
                            </b-button>
                        </b-row>
                    </b-col>  
                    <b-col cols="4">
                        <b-row align-h="end">
                            <b-button v-b-modal.modal-center class="btn-journal">
                                <img :src="prevPage" alt="Página anterior">
                            </b-button>
                            <b-button v-b-modal.modal-center class="btn-journal">
                                <img :src="prevPage" alt="Página anterior">
                            </b-button>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>        
        </b-row>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JournalPage from './JournalPage';
export default {
    components: { 
        JournalPage
    },    
    data(){
        return {
            indexPage: 0,
            pageName: '',
            pages: [{
                nameIndex: 'capa',
                typePage: 'single',
                haveTitle: true,
                haveStoryTitle: false
            },
            {
                nameIndex: '1 - 2',
                typePage: 'dual',
                haveTitle: false,
                haveStoryTitle: true
            }]
        }
    },
    computed: {            
        prevPage() {
            return require('@/assets/images/icons/escrever/icon-prev.png')
        },
        nextPage() {
            return require('@/assets/images/icons/escrever/icon-next.png')
        }
    },
    created() {
        this.pageName = this.pages[0].nameIndex;
    },
    methods: {
        // Placeholders
        onFileSelectedCover(event) {
            const file = event.target.files[0]
            this.coverImage = URL.createObjectURL(file);
        },       
        toPrevPage() {
            if(this.indexPage > 0){
                this.indexPage -= 1;
                this.pageName = this.pages[this.indexPage].nameIndex;
            }
        },
        toNextPage() {
            console.log( this.pages.length)
            if(this.indexPage < this.pages.length - 1){
                this.indexPage += 1;
                this.pageName = this.pages[this.indexPage].nameIndex;
            }
        }
    }
}
</script>

<style lang="scss">
    
</style>