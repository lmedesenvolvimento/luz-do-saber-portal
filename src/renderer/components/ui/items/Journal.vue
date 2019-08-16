<template>
    <div class="journal">
        <b-row class="journal-container">
            <b-col>
                <div class="journal-box">
                    <div v-if="pageName=='capa'" class="journal-page-container journal-single-page">
                        <div class="journal-page">
                            <div class="journal-decoration-1" />
                            <div class="journal-decoration-2" />
                            <div class="journal-content">
                                <div class="journal-header-title">
                                    <h3>INSIRA O NOME DO JORNAL</h3>
                                </div>
                                <div class="journal-header-image">
                                </div>
                                <div>
                                    <div class="journal-header-story-left">
                                        <div class="journal-header-story-title">
                                            <h5>Título do lado esquerdo</h5>
                                        </div>
                                        <div class="journal-header-story-subtitle">
                                            <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                        </div>
                                    </div>                                
                                    <div class="journal-header-story-right">
                                        <div class="journal-header-story-title">
                                            <h5>Título do lado direito</h5>
                                        </div>
                                        <div class="journal-header-story-subtitle">
                                            <p>Insira o conteúdo da matéria do lado direito</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="journal-decoration-1" />
                        </div>
                    </div>
                    <div v-if="pageName=='1-2'" class="journal-page-container">
                        <b-row>
                            <b-col class="journal-page-1">
                                <div class="journal-page">
                                    <div class="journal-decoration-1" />
                                    <div class="journal-decoration-2" />
                                    <div class="journal-content">
                                        <div class="journal-page-1-header-title">
                                            <h3>Matéria de destaque</h3>
                                            <h5>Subtítulo da matéria</h5>
                                        </div>
                                        <div class="journal-page-1-image">
                                        </div>
                                        <div>
                                            <div class="journal-page-1-story-left">
                                                <div class="journal-header-story-title">
                                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                                </div>
                                                <div class="journal-header-story-subtitle">
                                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                                </div>
                                            </div>                                
                                            <div class="journal-page-1-story-right">
                                                <div class="journal-header-story-title">
                                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                                </div>
                                                <div class="journal-header-story-subtitle">
                                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
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
                                        <div class="journal-page-1-header">
                                            <h3>Matéria de destaque</h3>
                                            <h5>Subtítulo da matéria</h5>
                                        </div>
                                        <div class="journal-header-image">
                                        </div>
                                        <div>
                                            <div class="journal-header-story-left">
                                                <div class="journal-header-story-title">
                                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                                </div>
                                                <div class="journal-header-story-subtitle">
                                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                                </div>
                                            </div>                                
                                            <div class="journal-header-story-right">
                                                <div class="journal-header-story-title">
                                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                                </div>
                                                <div class="journal-header-story-subtitle">
                                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="journal-decoration-1" />
                                </div>
                            </b-col>
                        </b-row>                    
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
            pageName: 'capa'
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
            case '1-2':
                this.pageName = 'capa'
                break;
            case 'verso':
                this.pageName = '1-2'
                break;
            default:
                break;
            }
        },
        toNextPage() {
            switch(this.pageName){
            case 'capa':
                this.pageName = '1-2'
                break;
            case '1-2':
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