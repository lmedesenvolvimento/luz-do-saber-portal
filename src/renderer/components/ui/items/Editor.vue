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
                                <button class="ql-bold btn-editor coluna b-right e-border-left" @click="selectButton">
                                    <img class="btn-image" :src="bold" alt="Negrito">
                                </button>
                                <button class="ql-italic btn-editor coluna b-right" @click="selectButton">
                                    <img class="btn-image" :src="italic" alt="Itálico">
                                </button>
                                <button class="ql-underline btn-editor coluna e-border-right" @click="selectButton">
                                    <img class="btn-image" :src="underline" alt="Sublinhado">
                                </button>
                            </div>
                        </div>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <div class="linha">
                            <button class="ql-align btn-editor coluna b-right e-border-left" selected @click="selectButton">
                                <img class="btn-image" :src="left" alt="Alinhamento à esquerda">
                            </button>
                            <button class="ql-align btn-editor coluna b-right" value="center" @click="selectButton">
                                <img class="btn-image" :src="center" alt="Alinhamento ao centro">
                            </button>
                            <button class="ql-align btn-editor coluna e-border-right" value="right" @click="selectButton">
                                <img class="btn-image" :src="right" alt="Alinhamento à direita">
                            </button>
                        </div>
                    </ls-card-display>
                </div>
                <div class="button-contaniner">
                    <ls-card-display>
                        <span class="ql-formats">
                            <div class="linha">
                                <button class="ql-list btn-editor coluna b-right e-border-left" value="bullet" @click="selectButton">
                                    <img class="btn-image" :src="bullet" alt="Lista não ordenada">
                                </button>
                                <button class="ql-list btn-editor coluna e-border-right" value="ordered" @click="selectButton">
                                    <img class="btn-image" :src="ordered" alt="Lista ordenada">
                                </button>
                            </div>
                        </span>
                    </ls-card-display>
                </div>
            </div>
        </div>
        <div id="editor"></div>
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
import Quill from 'quill';
import FormProps from '@ui/form'
import 'quill/dist/quill.snow.css';
import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
const Font = Quill.import('formats/font');

Font.whitelist = ['Montserrat', 'Roboto'];
Quill.register(Font, true);

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css',
        '~@/assets/styles/base/print.scss'
    ]
};
Vue.use(VueHtmlToPaper, options);

export default {
    components: { ...FormProps },
    data() {
        return {
            text: String,
            length: Number,
            quill: Object,
            modalShow: false
        }
    },
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

    },
    mounted() {
        this.quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: 'Insira seu texto aqui!'
        });
        this.quill.focus();
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
        },
        selectButton(btn){
            console.log(btn.srcElement.parentNode)
            if (btn.srcElement.classList.contains('btn-image')){
                if (!btn.srcElement.parentNode.classList.contains('btn-selected'))
                    btn.srcElement.parentNode.classList.add('btn-selected')
                else
                    btn.srcElement.parentNode.classList.remove('btn-selected')
            }
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
                this.text = this.quill.getText();
        },
        printLetter(){
            if(!process.env.IS_WEB){
                alert('Navegador não suportado!')
                return;
            }
            this.$htmlToPaper('editor', options)
        },
        closeModal(){
            this.$refs['modal-center'].hide()
        },
        newLetter2(){
            this.quill.deleteText(0, this.quill.getLength());
            this.text = ''
            this.$refs['modal-center'].hide()
        }
    },
}
</script>
<style lang="scss">
</style>
