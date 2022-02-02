<template>
    <div id="editor-wrapper">
        <div class="gameplay">
            <div class="gameplay-body">
                <div id="custom-editor">
                    <quill-editor class="editor" :options="editorOption" />
                    <div id="editor-footer" class="linha">
                        <b-button class="btn-editor" @click="newLetter">
                            <img v-b-tooltip="{ title:'Novo', trigger: 'hover', container: '#editor-footer'}" :src="newText" alt="Novo" class="icon">
                        </b-button>
                        <b-button v-b-tooltip="{ title:'Salvar', trigger: 'hover', container: '#editor-footer'}" class="btn-editor" @click="saveLetter">
                            <img :src="save" alt="Salvar" class="icon">
                        </b-button>
                        <b-button v-b-tooltip="{ title:'Imprimir', trigger: 'hover', container: '#editor-footer'}" class="btn-editor" @click="printLetter">
                            <img :src="print" alt="Imprimir" class="icon">
                        </b-button>
                    </div>
                    <!-- Modal Place Holder -->
                    <b-modal id="modal-center" ref="modal-center" v-model="modalShow" centered title="Apagar carta e começar uma nova" hide-footer>
                        <p class="my-4">Tem certeza de que deseja começar uma nova carta? O que você já escreveu será descartado se não for salvo antes</p>
                        <div class="modal-footer">
                            <b-button class="btn-newletter" @click="newLetter2">Sim! Começar nova carta</b-button>
                            <b-button class="btn-closemodal" @click="closeModal">Cancelar</b-button>
                        </div>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import FormProps from '@ui/form'
import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
}
Vue.use(VueHtmlToPaper, options)

const Font = Quill.import('attributors/class/font')
console.log('here', Font)
const fontArr = ['Montserrat', 'Roboto', 'Arial', 'times-new-roman', 'Pacifico']
Font.whitelist = fontArr
Quill.register(Font, true)

const Size = Quill.import('attributors/style/size')
const fontSizeArr = ['12px', '18px', '20px', '24px', '40px']
Size.whitelist = fontSizeArr
Quill.register(Size, true)

export default {
    components: {
        ...FormProps,
        quillEditor
    },

    data() {
        return {
            editorOption: {
                modules: {
                    toolbar: [
                        [{ 'align': [] }],
                        [{ 'font': fontArr }],
                        [{ 'size': fontSizeArr }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['bold', 'italic', 'underline'],
                        ['image']
                    ],      
                },
                theme: 'snow',
                placeholder: 'Insira seu texto aqui'
            },
            modalShow: false,
        }
    },
    computed: {
        newText() {
            return require('@/assets/images/icons/escrever/editor/novo escrever.png')
        },
        save() {
            return require('@/assets/images/icons/escrever/editor/salvar escrever.png')
        },
        print() {
            return require('@/assets/images/icons/escrever/editor/imprimir escrever.png')
        },
    },
    methods: {
        closeModal(){
            this.$refs['modal-center'].hide()
        },
        newLetter(){
            this.length = this.quill.getLength()
            console.log(this.length)
            if  (this.quill.getText() !== '\n' && this.length > gi1){
                this.modalShow = !this.modalShow               
            }
        },
        saveLetter(){
            if (this.quill.getText() !== '\n')
                this.text = this.quill.getText()
        },
        printLetter(){
            if(!process.env.IS_WEB){
                alert('Navegador não suportado!')
                return
            }
            this.$htmlToPaper('editor', options)
        },
        newLetter2(){
            this.quill.deleteText(0, this.quill.getLength())
            this.text = ''
            this.$refs['modal-center'].hide()
        }
    }
}
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
#editor-wrapper {
    margin-top: 50px;

    .gameplay {
        padding-top: 0;

        .gameplay-body {
            background-color: transparent;
            padding: 0;
        }  
    }

    #editor-footer {
        height: 70px;
    }

    .ql-snow {
        .ql-picker {
            &.ql-font, &.ql-size {
                .ql-picker-label,
                .ql-picker-item {
                    &::before {
                        content: attr(data-value) !important;
                    }
                }
            }
        }
    }

    .ql-toolbar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 54px;
    }

    .ql-font {
        width: 148px;
    }

    .ql-size {
        width: 74px;
    }

    .ql-container {
        background-color: #fff;
        height: 500px;
    }
    
    .ql-editor {
    
        .ql-font-Roboto {
            font-family: "Roboto";
        }
        .ql-font-MontSerrat {
            font-family: "Montserrat";
        }
        // .ql-font-times-new-roman {
        // font-family: 'Times New Roman';
        // }
        .ql-font-Arial {
            font-family: Arial;
        }
        .ql-font-Times-New-Roman {
            font-family: 'Times New Roman';
        }
        .ql-font-Pacifico {
            font-family: 'Pacifico';
        }

    }
}
</style>