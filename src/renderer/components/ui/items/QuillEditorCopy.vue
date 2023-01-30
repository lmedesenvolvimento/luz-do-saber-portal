<template>
    <div id="editor-wrapper">
        <quill-editor 
            v-model="content" 
            class="editor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
        >
            <div id="toolbar" slot="toolbar">
                <!-- <ls-card-display class="ql-font" @change="fontChange"> -->
                <select class="ql-font">
                    <!-- <option value="sans-serif" selected></option>
                    <option value="serif"></option>
                    <option value="monospace"></option> -->
                    <option selected value="Montserrat" class="ql-font-Montserrat">Montserrat</option>
                    <option value="Roboto" class="ql-font-Roboto">Roboto</option>
                </select>
                <!-- </ls-card-display> -->
                    
                    
                <!-- <ls-card-display class="ql-size"> -->
                <select class="ql-size">
                    <option value="12px">12px</option>
                    <option selected value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="40px">40px</option>
                    
                    <!-- <option value="small">12</option>
                    <option selected>18</option>
                    <option value="large">24</option>
                    <option value="huge">40</option> -->
                </select>
                <!-- </ls-card-display> -->
            </div>
        </quill-editor>
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
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import FormProps from '@ui/form'
import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const Font = Quill.import('formats/font')
Font.whitelist = ['Montserrat', 'Roboto']
Quill.register(Font, true)

const Size = Quill.import('attributors/style/size')
Size.whitelist = ['12px', '18px', '20px', '24px', '40px']
Quill.register(Size, true)

const Color = Quill.import('attributors/style/size')
Size.whitelist = ['12px', '18px', '20px', '24px', '40px']
Quill.register(Size, true)

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
}

Vue.use(VueHtmlToPaper, options)

export default {
    components: {
        ...FormProps,
        quillEditor
    },

    data() {
        return {
            content: '<p>Insira seu texto aqui</p>',
            editorOption: {
                modules: {
                    toolbar: '#toolbar'
                    // toolbar: [
                    //     [{ 'font': ['Montserrat', 'Roboto'] }],
                    //     [{ 'size': ['12px', '18px','20px', '24px', '48px'] }],
                    //     [{ 'color': [] }, { 'background': [] }],
                    // ]
                }
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
    /* mounted() {
        this.quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: 'Insira seu texto aqui!'
        })
        this.quill.focus()
    }, */
    methods: {
        closeModal(){
            this.$refs['modal-center'].hide()
        },
        newLetter(){
            this.length = this.quill.getLength()
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
</script>linha

<style lang="scss">
#editor-wrapper {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 30rem;
    overflow: hidden;
    
    $toolbar-height: 41px;

    .ql-container {
        background-color: #fff;
        min-height: 473px;
    }

    .editor {
      .ql-custom-button {
        width: 100px;
      }
    }

    .ql-editor {
        font-family: Montserrat;
        .ql-font-Roboto {
            font-family: Roboto;
        }
    }

    
}
</style>