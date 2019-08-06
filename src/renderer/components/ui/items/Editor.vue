<template>
    <div id="custom-editor">
        <div id="toolbar">
            <div class="linha">
                <div class="button-contaniner">
                    <ls-card-display class="ql-font-Montserrat">
                        <select ref="select" class="ql-font btn-editor" @change="fontChange">
                            <option selected class="ql-font-Montserrat">Montserrat</option>
                            <option value="Roboto" class="ql-font-Roboto">Roboto</option>
                        </select>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <select class="ql-size btn-editor">
                            <option value="small">12</option>
                            <option selected value="medium">18</option>
                            <option value="large">24</option>
                            <option value="huge">40</option>
                        </select>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <div>
                            <div class="linha">
                                <button class="ql-bold btn-editor coluna b-right">
                                    <img :src="bold" alt="Negrito">
                                </button>
                                <button class="ql-italic btn-editor coluna b-right">
                                    <img :src="italic" alt="Itálico">
                                </button>
                                <button class="ql-underline btn-editor coluna">
                                    <img :src="underline" alt="Sublinhado">
                                </button>
                            </div>
                        </div>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <div class="linha">
                            <button class="ql-align btn-editor coluna b-right" selected>
                                <img :src="left" alt="Alinhamento à esquerda">
                            </button>
                            <button class="ql-align btn-editor coluna b-right" value="center">
                                <img :src="center" alt="Alinhamento ao centro">
                            </button>
                            <button class="ql-align btn-editor coluna" value="right">
                                <img :src="right" alt="Alinhamento à direita">
                            </button>
                        </div>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <span class="ql-formats">
                            <div class="linha">
                                <button class="ql-list btn-editor coluna b-right" value="bullet">
                                    <img :src="bullet" alt="Lista não ordenada">
                                </button>
                                <button class="ql-list btn-editor coluna" value="ordered">
                                    <img :src="ordered" alt="Lista ordenada">
                                </button>
                            </div>
                        </span>
                    </ls-card-display>
                </div>
            </div>
        </div>
        <div id="editor"></div>
        <div id="editor-footer" class="linha">
            <b-button class="btn-editor">
                <img :src="newText" alt="Lista ordenada" class="icon">
            </b-button>
            <b-button class="btn-editor">
                <img :src="save" alt="Lista ordenada" class="icon">
            </b-button>
            <b-button class="btn-editor">
                <img :src="print" alt="Lista ordenada" class="icon">
            </b-button>
            <b-button class="btn-editor">
                <img :src="gallery" alt="Lista ordenada" class="icon">
            </b-button>
        </div>
    </div>
</template>
<script>
import Quill from 'quill';
import FormProps from '@ui/form'
import 'quill/dist/quill.snow.css';

const Font = Quill.import('formats/font');

Font.whitelist = ['Montserrat', 'Roboto'];
Quill.register(Font, true);

export default {
    components: { ...FormProps },
    computed: {
        bold() {
            return require('@/assets/images/icons/escrever/editor/N.png')
        },
        italic() {
            return require('@/assets/images/icons/escrever/editor/I.png')
        },
        underline() {
            return require('@/assets/images/icons/escrever/editor/S.png')
        },
        left() {
            return require('@/assets/images/icons/escrever/editor/esquerda.png')
        },
        center() {
            return require('@/assets/images/icons/escrever/editor/centro.png')
        },
        right() {
            return require('@/assets/images/icons/escrever/editor/direita.png')
        },
        bullet() {
            return require('@/assets/images/icons/escrever/editor/marcador 1.png')
        },
        ordered() {
            return require('@/assets/images/icons/escrever/editor/marcador 2.png')
        },
        newText() {
            return require('@/assets/images/icons/escrever/editor/novo escrever.png')
        },
        save() {
            return require('@/assets/images/icons/escrever/editor/salvar escrever.png')
        },
        print() {
            return require('@/assets/images/icons/escrever/editor/imprimir escrever.png')
        },
        gallery() {
            return require('@/assets/images/icons/escrever/editor/galeria escrever.png')
        },

    },
    mounted() {
        var quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: 'Insira seu texto aqui!'
        });
        quill.focus();
    },
    methods: {
        fontChange(el) {
            if(el.srcElement.value === 'Roboto'){
                el.srcElement.classList.remove('ql-font-Montserrat')
                el.srcElement.classList.add('ql-font-Roboto')

            } else if (el.srcElement.value === 'Montserrat') {
                el.srcElement.classList.remove('ql-font-Roboto')
                el.srcElement.classList.add('ql-font-Montserrat')
            }
        }
    },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap');
#custom-editor{
    margin-top: 40px;
    box-shadow: 1px 1px 20px #3a3a3a;
    border-radius: 0px 0px 10px 10px;
    #toolbar{
        display: flex;
        align-items: center;
        min-height: 90px;
        background-color: #fafafa;
        border-bottom: 1px solid #ddd;
    }
    #editor{
        background-color: white;
        font-family: "Montserrat";
        font-size: 18px;
        max-width: 100%;
        height: 500px;
        text-transform: none;
        .ql-editor{
            height: 100%;
            padding-left: 15px;
            text-indent: 25px;
        }
    }
    #editor-footer{
        display: flex;
        align-items: center;
        min-height: 70px;
        background-color: #fafafa;
        border-top: 1px solid #ddd;
        border-radius: 0px 0px 10px 10px;
        .icon{
            max-width: 60px;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .ql-font-Montserrat {
        font-family: 'Montserrat', sans-serif;
    }
    .ql-font-Roboto {
        font-family: 'Roboto', sans-serif;
    }
    .btn-editor {
        background: Transparent no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline:none;
        font-size: 1.3rem;
        color: #303030;
        box-shadow: none !important;
    }
    .card--display{
        max-height: 90px;
    }
    .card-body{
        padding: 0.3rem;
    }
    .ql-font{
        height: 40px;
        flex-grow: 1;
        max-width: 330px;
        padding-left: 15px;
    }
    .ql-size{
        width: 80px;
        height: 40px;
        padding-left: 10px;
    }
    .b-right{
        border-right: solid black 1px;
        height: 100%;
    }
    .coluna{
        flex-grow: 1;
        max-width: 100%;
        height: 40px;
    }
    .button-contaniner{
        margin-right: 25px;
    }
    .linha{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }
}
</style>
