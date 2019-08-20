<template>
    <div class="journal">
        <b-row class="journal-container">
            <b-col>
                <div class="journal-box">
                    <div v-if="pageName=='capa'" class="journal-page-container journal-single-page">
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
                                <div class="journal-cover-image">
                                </div>
                                <div>
                                    <div class="journal-cover-story-left">
                                        <div class="journal-story-title">
                                            <textarea 
                                                v-model="coverStoryLeftTitle" 
                                                cols="17" rows="2" 
                                                class="journal-input-story-title" 
                                                type="text" 
                                                placeholder="Título do lado esquerdo"
                                            />
                                        </div>
                                        <div class="journal-story-subtitle">
                                            <textarea 
                                                v-model="coverStoryLeftText" 
                                                cols="20" rows="7"
                                                class="journal-input-story-text"
                                                type="text" 
                                                placeholder="Insira o conteúdo da matéria do lado esquerdo"
                                            />
                                        </div>
                                    </div>                                
                                    <div class="journal-cover-story-right">
                                        <div class="journal-story-title">
                                            <textarea 
                                                v-model="coverStoryRightTitle" 
                                                cols="17" rows="2" 
                                                class="journal-input-story-title" 
                                                type="text" 
                                                placeholder="Título do lado direito"
                                            />
                                        </div>
                                        <div class="journal-story-subtitle">
                                            <textarea 
                                                v-model="coverStoryRightText" 
                                                cols="20" rows="7"
                                                class="journal-input-story-text"
                                                type="text" 
                                                placeholder="Insira o conteúdo da matéria do lado direito"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="journal-decoration-1" />
                        </div>
                    </div>
                    <div v-else-if="pageName=='1 - 2'" class="journal-page-container">
                        <b-row>
                            <b-col class="journal-page-1">
                                <div class="journal-page">
                                    <div class="journal-decoration-1" />
                                    <div class="journal-decoration-2" />
                                    <div class="journal-content">
                                        <div class="journal-page-1-header">
                                            <input 
                                                v-model="page1Title" 
                                                class="journal-page-1-title"
                                                type="text" 
                                                placeholder="Matéria de destaque"
                                            />
                                            <input 
                                                v-model="page1Subtitle" 
                                                class="journal-input-story-subtitle" 
                                                type="text" 
                                                placeholder="Subtítulo da matéria"
                                            />
                                        </div>
                                        <div class="journal-page-1-image">
                                        </div>
                                        <div>
                                            <div class="journal-page-1-story-left">
                                                <div class="journal-story-title">
                                                    <textarea 
                                                        v-model="page1StoryLeftTitle" 
                                                        cols="17" rows="2" 
                                                        class="journal-input-story-title" 
                                                        type="text" 
                                                        placeholder="Título do lado esquerdo"
                                                    />
                                                </div>
                                                <div class="journal-story-subtitle">
                                                    <textarea 
                                                        v-model="page1StoryLeftText" 
                                                        cols="20" rows="6"
                                                        class="journal-input-story-text"
                                                        type="text" 
                                                        placeholder="Insira o conteúdo da matéria do lado esquerdo"
                                                    />
                                                </div>
                                            </div>                                
                                            <div class="journal-page-1-story-right">
                                                <div class="journal-story-title">
                                                    <textarea 
                                                        v-model="page1StoryRightTitle" 
                                                        cols="17" rows="2" 
                                                        class="journal-input-story-title" 
                                                        type="text" 
                                                        placeholder="Título do lado direito"
                                                    />
                                                </div>
                                                <div class="journal-story-subtitle">
                                                    <textarea 
                                                        v-model="page1StoryRightText" 
                                                        cols="20" rows="6"
                                                        class="journal-input-story-text"
                                                        type="text" 
                                                        placeholder="Insira o conteúdo da matéria do lado direito"
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
                                                        <div class="journal-page-2-story-top-image">                                                            
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
                                            <div class="journal-page-2-story-bottom-image">                                                
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
                    <div v-else-if="pageName=='verso'" class="journal-page-container journal-single-page">
                        <div class="journal-page journal-back-cover">
                            <div class="journal-decoration-1" />
                            <div class="journal-decoration-2" />
                            <div class="journal-content">                                
                                <div>
                                    <b-row>
                                        <b-col class="journal-back-cover-story-left">
                                            <div class="journal-story-title">
                                                <textarea 
                                                    v-model="backCoverStoryLeftTitle" 
                                                    cols="17" rows="2" 
                                                    class="journal-input-story-title" 
                                                    type="text" 
                                                    placeholder="Título do lado esquerdo"
                                                />
                                            </div>
                                            <div class="journal-story-subtitle">
                                                <textarea 
                                                    v-model="backCoverStoryLeftText" 
                                                    cols="20" rows="8"
                                                    class="journal-input-story-text"
                                                    type="text" 
                                                    placeholder="Insira o conteúdo da matéria do lado esquerdo"
                                                />
                                            </div>
                                        </b-col>
                                        <b-col class="journal-back-cover-story-right">
                                            <div class="journal-story-title">
                                                <textarea 
                                                    v-model="backCoverStoryRightTitle" 
                                                    cols="16" rows="2" 
                                                    class="journal-input-story-title" 
                                                    type="text" 
                                                    placeholder="Título do lado direito"
                                                />
                                            </div>
                                            <div class="journal-story-subtitle">
                                                <textarea 
                                                    v-model="backCoverStoryRightText" 
                                                    cols="19" rows="8"
                                                    class="journal-input-story-text"
                                                    type="text" 
                                                    placeholder="Insira o conteúdo da matéria do lado direito"
                                                />
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                                <div class="journal-back-cover-image">
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
                <b-row align-h="center" class="journal-footer">
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
                </b-row>
            </b-col>        
        </b-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageName: 'capa',
            coverTitle: '',
            coverStoryLeftTitle: '',
            coverStoryLeftText: '',
            coverStoryRightTitle: '',
            coverStoryRightText: '',
            page1Title: '',
            page1Subtitle: '',
            page1StoryLeftTitle: '',
            page1StoryLeftText: '',
            page1StoryRightTitle: '',
            page1StoryRightText: '',
            page2StoryTitle: '',
            page2StoryText1: '',
            page2StoryText2: '',
            page2StoryText3: '',
            page2FooterText: '',
            backCoverStoryLeftTitle: '',
            backCoverStoryLeftText: '',
            backCoverStoryRightTitle: '',
            backCoverStoryRightText: '',
            backCoverFooterText: ''
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