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
                                <div class="journal-cover-title">
                                    <input 
                                        v-model="coverTitle" 
                                        type="text" 
                                        placeholder="Insira o nome do jornal"
                                    />
                                </div>
                                <div 
                                    class="journal-cover-image"
                                    @click="$refs.coverImageInput.click()"
                                >
                                    <input 
                                        ref="coverImageInput"
                                        style="display: none"                                             
                                        type="file"     
                                        accept="image/gif, image/jpeg, image/png"                                         
                                        @change="onFileSelectedCover"                 
                                    >
                                    <div v-if="coverImage">
                                        <img :src="coverImage" alt="Imagem de capa">
                                    </div>  
                                </div>                                
                                <div>
                                    <div v-for="i in 2" :key="i" :class="{'journal-cover-story-left': i == 1, 'journal-cover-story-right': i == 2}">
                                        <div v-for="j in 2" :key="j" :class="{'journal-story-title': j == 1, 'journal-story-subtitle': j == 2}">
                                            <textarea 
                                                :v-model="{coverStoryLeftTitle: i == 1 && j == 1, coverStoryRightTitle: i == 2 && j == 1,
                                                           coverStoryLeftText: i == 1 && j == 2, coverStoryRightText: i == 2 && j == 2}" 
                                                :cols="numberCols(j)" 
                                                :rows="numberRows(j)" 
                                                :class="{'journal-input-story-title': j == 1, 'journal-input-story-text': j == 2}" 
                                                type="text" 
                                                :placeholder="placeholderStory(i, j)"
                                            />
                                        </div>                                        
                                    </div> 
                                </div>
                            </div>
                            <div class="journal-decoration-1" />
                        </div>
                    </div>
                    <div v-show="pageName=='1 - 2'" class="journal-page-container">
                        <b-row>
                            <b-col class="journal-page-1">
                                <div class="journal-page">
                                    <div class="journal-decoration-1" />
                                    <div class="journal-decoration-2" />
                                    <div class="journal-content">
                                        <div class="journal-page-1-header">
                                            <input 
                                                v-for="i in 2" :key="i"
                                                :v-model="{page1Title: i == 1, page1Subtitle: i == 2}" 
                                                :class="{'journal-page-1-title': i == 1, 'journal-input-story-subtitle': i == 2}"
                                                type="text" 
                                                :placeholder="placeholderTitle(i)"
                                            />
                                        </div>                                        
                                        <div 
                                            class="journal-page-1-image"
                                            @click="$refs.page1ImageInput.click()"
                                        >
                                            <input 
                                                ref="page1ImageInput"
                                                style="display: none"                                             
                                                type="file"     
                                                accept="image/gif, image/jpeg, image/png"                                         
                                                @change="onFileSelectedPage1"                 
                                            >
                                            <div v-if="page1Image">
                                                <img :src="page1Image" alt="Imagem da página 1">
                                            </div>  
                                        </div>
                                        <div>
                                            <div v-for="i in 2" :key="i" :class="{'journal-page-1-story-left': i == 1, 'journal-page-1-story-right': i == 2}">
                                                <div v-for="j in 2" :key="j" :class="{'journal-story-title': j == 1, 'journal-story-subtitle': j == 2}">
                                                    <textarea 
                                                        :v-model="{page1StoryLeftTitle: i == 1 && j == 1, page1StoryRightTitle: i == 2 && j == 1,
                                                                   page1StoryLeftText: i == 1 && j == 2, page1StoryRightText: i == 2 && j == 2}" 
                                                        :cols="numberCols(j)" 
                                                        :rows="numberRows(j)" 
                                                        :class="{'journal-input-story-title': j == 1, 'journal-input-story-text': j == 2}" 
                                                        type="text" 
                                                        :placeholder="placeholderStory(i, j)"
                                                    />
                                                </div>                                        
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="journal-decoration-1" />
                                </div>
                            </b-col>
                            <b-col class="journal-page-2">
                                <div class="journal-page">
                                    <div class="journal-decoration-1" />
                                    <div class="journal-decoration-2" />
                                    <div class="journal-content">
                                        <div class="journal-page-2-story-top">
                                            <b-row>
                                                <b-col>
                                                    <div class="journal-page-2-story-top-1">
                                                        <div class="journal-story-title">
                                                            <textarea 
                                                                v-model="page2StoryTitle" 
                                                                cols="10" rows="2" 
                                                                class="journal-input-story-title" 
                                                                type="text" 
                                                                placeholder="Título superior"
                                                            />
                                                        </div>
                                                        <div class="journal-story-subtitle">
                                                            <textarea 
                                                                v-model="page2StoryText1" 
                                                                cols="12" rows="11"
                                                                class="journal-input-story-text"
                                                                type="text" 
                                                                placeholder="Insira o conteúdo da matéria aqui"
                                                            />
                                                        </div>
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="journal-page-2-story-top-2">                                                       
                                                        <div 
                                                            class="journal-page-2-story-top-image"
                                                            @click="$refs.page2ImageTopInput.click()"
                                                        >
                                                            <input 
                                                                ref="page2ImageTopInput"
                                                                style="display: none"                                             
                                                                type="file"     
                                                                accept="image/gif, image/jpeg, image/png"                                         
                                                                @change="onFileSelectedPage2Top"                 
                                                            >
                                                            <div v-if="page2ImageTop">
                                                                <img :src="page2ImageTop" alt="Imagem 1 da página 2">
                                                            </div>  
                                                        </div>
                                                        <div class="journal-story-cont">
                                                            <textarea 
                                                                v-model="page2StoryText2" 
                                                                cols="11" rows="6"
                                                                class="journal-input-story-text"
                                                                type="text" 
                                                                placeholder="Insira a continuação da matéria"
                                                            />
                                                        </div>
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="journal-page-2-story-top-3">
                                                        <div class="journal-story-cont">
                                                            <textarea 
                                                                v-model="page2StoryText3" 
                                                                cols="12" rows="14"
                                                                class="journal-input-story-text"
                                                                type="text" 
                                                                placeholder="Insira a continuação da matéria"
                                                            />
                                                        </div>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <div class="journal-page-2-story-bottom">                                           
                                            <div 
                                                class="journal-page-2-story-bottom-image"
                                                @click="$refs.page2ImageBottomInput.click()"
                                            >
                                                <input 
                                                    ref="page2ImageBottomInput"
                                                    style="display: none"                                             
                                                    type="file"     
                                                    accept="image/gif, image/jpeg, image/png"                                         
                                                    @change="onFileSelectedPage2Bottom"                 
                                                >
                                                <div v-if="page2ImageBottom">
                                                    <img :src="page2ImageBottom" alt="Imagem 2 da página 2">
                                                </div>  
                                            </div>
                                            <div class="journal-story-cont">
                                                <textarea 
                                                    v-model="page2FooterText" 
                                                    cols="45" rows="3"
                                                    class="journal-input-story-text"
                                                    type="text" 
                                                    placeholder="Insira um conteúdo aqui"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="journal-decoration-1" />
                                </div>
                            </b-col>
                        </b-row>                    
                    </div>
                    <div v-show="pageName=='verso'" class="journal-page-container journal-single-page">
                        <div class="journal-page journal-back-cover">
                            <div class="journal-decoration-1" />
                            <div class="journal-decoration-2" />
                            <div class="journal-content">                                
                                <div>
                                    <b-row>
                                        <b-col v-for="i in 2" :key="i" :class="{'journal-back-cover-story-left': i == 1, 'journal-back-cover-story-right': i == 2}">
                                            <div v-for="j in 2" :key="j" :class="{'journal-story-title': j == 1, 'journal-story-subtitle': j == 2}">
                                                <textarea 
                                                    :v-model="{backCoverStoryLeftTitle: i == 1 && j == 1, backCoverStoryRightTitle: i == 2 && j == 1,
                                                               backCoverStoryLeftText: i == 1 && j == 2, backCoverStoryRightText: i == 2 && j == 2}" 
                                                    :cols="numberCols(j)" 
                                                    :rows="numberRows(j)" 
                                                    :class="{'journal-input-story-title': j == 1, 'journal-input-story-text': j == 2}" 
                                                    type="text" 
                                                    :placeholder="placeholderStory(i, j)"
                                                />
                                            </div>                                        
                                        </b-col>                                         
                                    </b-row>
                                </div> 
                                <div 
                                    class="journal-back-cover-image"
                                    @click="$refs.backCoverImageInput.click()"
                                >
                                    <input 
                                        ref="backCoverImageInput"
                                        style="display: none"                                             
                                        type="file"     
                                        accept="image/gif, image/jpeg, image/png"                                         
                                        @change="onFileSelectedBackCover"                 
                                    >
                                    <div v-if="backCoverImage">
                                        <img :src="backCoverImage" alt="Imagem do verso">
                                    </div>  
                                </div>                                                            
                                <div class="journal-story-cont">
                                    <textarea 
                                        v-model="backCoverFooterText" 
                                        cols="44" rows="2"
                                        class="journal-input-story-text"
                                        type="text" 
                                        placeholder="Insira um conteúdo aqui"
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
export default {
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