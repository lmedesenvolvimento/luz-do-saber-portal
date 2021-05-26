<template>
    <div id="custom-editor">
        <div id="toolbar">
            <div class="linha">
                <vue-editor v-model="content"></vue-editor>
            </div>
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
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import { VueEditor } from 'vue2-editor'

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
        VueEditor
    },

    data() {
        return {
            content: '<p>Insira seu texto aqui</p>',
            modalShow: false
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