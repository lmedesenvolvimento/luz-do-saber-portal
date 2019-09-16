<template>
    <div class="journal">        
        <b-row class="journal-container">
            <b-col>
                <div id="journalCanvas" class="journal-box">
                    <div v-show="pageName=='capa'" class="journal-page-container journal-single-page">
                        <div class="journal-page journal-cover">
                            <div class="journal-decoration-1" />
                            <div class="journal-decoration-2" />
                            <div class="journal-content">
                                <journal-page 
                                    :have-title="false"
                                    :have-story-title="true"
                                />
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
                            <b-button v-b-modal.modal-center class="btn-journal" @click="printPDF()">
                                <img :src="prevPage" alt="Página anterior">
                            </b-button>
                            <b-button v-b-modal.modal-center class="btn-journal" @click="newJournal()">
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
            doc: new jsPDF({
                orientation: 'landscape'
            }),
            pageName: 'capa',
            coverTitle: '',
            coverImage: null,
            coverStoryLeftTitle: '',
            coverStoryLeftText: '',
            coverStoryRightTitle: '',
            coverStoryRightText: '',
            page1Title: '',
            page1Subtitle: '',
            page1Image: null,
            page1StoryLeftTitle: '',
            page1StoryLeftText: '',
            page1StoryRightTitle: '',
            page1StoryRightText: '',
            page2StoryTitle: '',
            page2ImageTop: null,
            page2StoryText1: '',
            page2StoryText2: '',
            page2StoryText3: '',
            page2ImageBottom: null,
            page2FooterText: '',
            backCoverStoryLeftTitle: '',
            backCoverStoryLeftText: '',
            backCoverStoryRightTitle: '',
            backCoverStoryRightText: '',
            backCoverImage: null,
            backCoverFooterText: '',
            isPrinting: false,
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
    methods: {
        // Placeholders
        placeholderStory(i, j){
            if (i == 1){
                if (j == 1){
                    return 'Titulo do lado esquerdo';
                } else {
                    return 'Insira o conteúdo da matéria do lado esquerdo';
                }
            } else {
                if (j == 1){
                    return 'Titulo do lado direito';
                } else {
                    return 'Insira o conteúdo da matéria do lado direito';
                }
            }
        },   
        placeholderTitle(i){
            if(i == 1) return 'Matéria de destaque';
            else return 'Subtítulo da matéria'
        },
        numberCols(j){
            if(j == 1) return 17;
            else return 20;
        },
        numberRows(j){
            if(j == 1) return 2;
            else return 7;
        },         
        onFileSelectedCover(event) {
            const file = event.target.files[0]
            this.coverImage = URL.createObjectURL(file);
        },
        onFileSelectedPage1(event) {
            const file = event.target.files[0]
            this.page1Image = URL.createObjectURL(file);
        },
        onFileSelectedPage2Top(event) {
            const file = event.target.files[0]
            this.page2ImageTop = URL.createObjectURL(file);
        },
        onFileSelectedPage2Bottom(event) {
            const file = event.target.files[0]
            this.page2ImageBottom = URL.createObjectURL(file);
        },
        onFileSelectedBackCover(event) {
            const file = event.target.files[0]
            this.backCoverImage = URL.createObjectURL(file);
        },
        newJournal(){
            this.pageName = 'capa',
            this.coverTitle = '',
            this.coverImage = null,
            this.coverStoryLeftTitle = '',
            this.coverStoryLeftText = '',
            this.coverStoryRightTitle = '',
            this.coverStoryRightText = '',
            this.page1Title = '',
            this.page1Subtitle = '',
            this.page1Image = null,
            this.page1StoryLeftTitle = '',
            this.page1StoryLeftText = '',
            this.page1StoryRightTitle = '',
            this.page1StoryRightText = '',
            this.page2StoryTitle = '',
            this.page2ImageTop = null,
            this.page2StoryText1 = '',
            this.page2StoryText2 = '',
            this.page2StoryText3 = '',
            this.page2ImageBottom = null,
            this.page2FooterText = '',
            this.backCoverStoryLeftTitle = '',
            this.backCoverStoryLeftText = '',
            this.backCoverStoryRightTitle = '',
            this.backCoverStoryRightText = '',
            this.backCoverImage = null,
            this.backCoverFooterText = '',
            this.isPrinting = false
        },
        printPDF(){
            if(this.isPrinting == false){
                this.isPrinting = true;
                this.pageName = 'capa';
                this.genPDF();
            }
        },
        genPDF(){  
            this.toNextPage();            
            html2canvas(document.getElementById('journalCanvas')).then((canvas) => {                                     
                let img = canvas.toDataURL('image/png');
                this.doc.addImage(img, 'PNG', 0, 0); 
                if(!this.isPrinting){
                    this.doc.save('test.pdf');
                    this.doc = new jsPDF({
                        orientation: 'landscape'
                    })
                }
                if((this.pageName == 'verso') && (this.isPrinting)){
                    this.isPrinting = false;
                    this.genPDF();
                }
                this.doc.addPage(); 
                if(this.pageName != 'verso'){
                    this.genPDF();
                }
            });  
             
        },
        toPrevPage() {
            switch(this.pageName){
            case '1 - 2':
                this.pageName = 'capa'
                break;
            case 'verso':
                this.pageName = '1 - 2'
                break;
            default:
                break;
            }
        },
        toNextPage() {
            switch(this.pageName){
            case 'capa':
                this.pageName = '1 - 2'
                break;
            case '1 - 2':
                this.pageName = 'verso'
                break;
            default:
                break;
            }
        }
    }
}
</script>

<style lang="scss">
    
</style>