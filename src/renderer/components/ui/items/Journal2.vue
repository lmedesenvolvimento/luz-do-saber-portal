<template>
    <div class="journal">        
        <b-row class="journal-container">
            <b-col>
                <div style="margin: 25px">
                    <div
                        v-for="page in pages" 
                        :key="page.nameIndex" 
                    >
                        <div   
                            v-show="page.nameIndex == pageName"                       
                            class="journal-page-container"
                            :class="{'journal-single-page': page.typePage == 'single'}"
                        >
                            <div                                   
                                v-if="page.typePage == 'single'"      
                            >
                                <journal-page        
                                    :type-page="page.typePage"               
                                    :have-title="page.haveTitle"
                                    :have-story-title="page.haveStoryTitle"
                                    :have-cover-image="page.haveCoverImage"
                                    :image-above-content="page.imageAboveContent"
                                    :have-left-and-right-story="page.haveLeftAndRightStory"
                                    :extra-rows="page.extraRows"
                                    :have-three-parts-story="page.haveThreePartsStory"
                                    :footer-text="page.footerText"
                                />  
                            </div>
                            <div v-else>
                                <b-row>
                                    <b-col>
                                        <journal-page      
                                            class="journal-left-page" 
                                            :type-page="page.subPages[0].typePage"               
                                            :have-title="page.subPages[0].haveTitle"
                                            :have-story-title="page.subPages[0].haveStoryTitle"
                                            :have-cover-image="page.subPages[0].haveCoverImage"
                                            :image-above-content="page.subPages[1].imageAboveContent"
                                            :have-left-and-right-story="page.subPages[0].haveLeftAndRightStory"
                                            :extra-rows="page.subPages[0].extraRows"
                                            :have-three-parts-story="page.subPages[0].haveThreePartsStory"
                                            :footer-text="page.subPages[0].footerText"
                                        /> 
                                    </b-col>
                                    <b-col>
                                        <journal-page   
                                            class="journal-right-page"    
                                            :type-page="page.subPages[1].typePage"               
                                            :have-title="page.subPages[1].haveTitle"
                                            :have-story-title="page.subPages[1].haveStoryTitle"
                                            :have-cover-image="page.subPages[1].haveCoverImage"
                                            :image-above-content="page.subPages[1].imageAboveContent"
                                            :have-left-and-right-story="page.subPages[1].haveLeftAndRightStory"
                                            :extra-rows="page.subPages[1].extraRows"
                                            :have-three-parts-story="page.subPages[1].haveThreePartsStory"
                                            :footer-text="page.subPages[1].footerText"
                                        /> 
                                    </b-col>
                                </b-row>                     
                            </div>  
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
                haveStoryTitle: false,
                haveCoverImage: true,
                imageAboveContent: true,
                haveLeftAndRightStory: true,                
                extraRows: 0,
                haveThreePartsStory: false,
                footerText: false,
                subPages: []
            },
            {
                nameIndex: '1 - 2',
                typePage: 'dual',                
                subPages: [{
                    haveTitle: false,
                    haveStoryTitle: true,
                    haveCoverImage: true,
                    imageAboveContent: true,
                    haveLeftAndRightStory: true,
                    extraRows: 1,
                    haveThreePartsStory: false,
                    footerText: false
                },
                {
                    haveTitle: false,
                    haveStoryTitle: false,
                    haveCoverImage: false,
                    imageAboveContent: true,
                    haveLeftAndRightStory: false,
                    extraRows: 1,
                    haveThreePartsStory: true,
                    footerText: true
                }]
            },
            {
                nameIndex: 'verso',
                typePage: 'single',
                haveTitle: false,
                haveStoryTitle: false,
                haveCoverImage: true,
                imageAboveContent: false,
                haveLeftAndRightStory: true,
                extraRows: 0,
                haveThreePartsStory: false,
                footerText: true,
                subPages: []
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