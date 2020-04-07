<template>
    <div id="convite" class="fill container convite">
        <div class="page-container">
            <div class="gameplay flex-center">
                <div class="gameplay-body flex-center">
                    <div id="convite-card" class="convite-card flex-center">
                        <div class="convite-text">
                            <div class="text title">Convite</div>
                            <div class="text data">Data:</div>
                            <div class="text hora">Hora:</div>
                            <div class="text local">Local:</div>
                            <div
                                v-for="text in texts"
                                :key="text.nome"
                                class="input-text"
                                :class="text.nome"
                            >
                                <textarea
                                    v-if="text.type === 'textarea'"
                                    :id="text.nome"
                                    :placeholder="text.placeholder"
                                    maxlength="100"
                                ></textarea>
                                <input
                                    v-else
                                    :id="text.nome"
                                    v-model="text.value"
                                    type="text"
                                    :placeholder="text.placeholder"
                                    :maxlength="text.maxLength"
                                    :class="[text.nome, 'input']"
                                    @keypress.enter="focusNext(text.nome)"
                                />
                            </div>
                        </div>
                        <div class="photo-input">
                            <label class="flex-center">
                                <div class="flex-center">
                                    <div
                                        v-if="convitePhoto !== ''"
                                        class="image"
                                    >
                                        <img
                                            :src="convitePhoto"
                                            class="photo"
                                        />
                                    </div>
                                    <div v-else class="photo-holder"></div>
                                    <input
                                        id="file-convite"
                                        ref="file-convite"
                                        type="file"
                                        name="convite-image"
                                        accept="image/jpeg, image/png"
                                        autocomplete="off"
                                        @change="
                                            handleFileUpload('file-convite')
                                        "
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="gameplay-footer">
                    <div class="footer-info flex-center">
                        <div
                            v-b-tooltip="{
                                title: 'Novo Convite',
                                container: '.footer-info'
                            }"
                            class="btn-convite novo"
                            @click="newLetter"
                        ></div>
                        <div
                            v-b-tooltip="{
                                title: 'Salvar',
                                trigger: 'hover',
                                container: '.footer-info'
                            }"
                            class="btn-convite salvar"
                        ></div>
                        <div
                            v-b-tooltip="{
                                title: 'Imprimir',
                                container: '.footer-info'
                            }"
                            class="btn-convite imprimir"
                            @click="printLetter"
                        ></div>
                        <div
                            v-b-tooltip="{
                                title: 'Galeria',
                                container: '.footer-info'
                            }"
                            class="btn-convite galeria"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Place Holder -->
        <b-modal
            id="modal-center"
            ref="modal-center"
            v-model="modalShow"
            centered
            title="Apagar convite e começar um novo"
            hide-footer
        >
            <p class="my-4">
                Tem certeza de que deseja escrever um novo convite? O que você
                já escreveu será descartado se não for salvo antes
            </p>
            <div class="modal-footer">
                <b-button class="btn-newletter" @click="newLetter2">
                    Sim! Escrever um novo convite
                </b-button>
                <b-button class="btn-closemodal" @click="closeModal">
                    Cancelar
                </b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
}
Vue.use(VueHtmlToPaper, options)
export default {
    data() {
        return {
            texts: [
                {
                    nome: 'saudacao-input',
                    value: '',
                    placeholder: 'Insira a saudação',
                    type: 'text',
                    maxLength: 15
                },
                {
                    nome: 'texto-input',
                    value: '',
                    placeholder: 'Insira o texto',
                    type: 'textarea'
                },
                {
                    nome: 'data-input',
                    value: '',
                    placeholder: 'DD/MM',
                    type: 'text',
                    maxLength: 5
                },
                {
                    nome: 'hora-input',
                    value: '',
                    placeholder: '00:00',
                    type: 'text',
                    maxLength: 5
                },
                {
                    nome: 'local-input',
                    value: '',
                    placeholder: 'Insira o local',
                    type: 'text',
                    maxLength: 24
                },
                {
                    nome: 'agradecimento-input',
                    value: '',
                    placeholder: 'Agradecimento',
                    type: 'text',
                    maxLength: 14
                },
                {
                    nome: 'assinatura-input',
                    value: '',
                    placeholder: '',
                    type: 'text',
                    maxLength: 14
                }
            ],
            convitePhoto: '',
            initialStateText: '',
            modalShow: false
        }
    },
    mounted() {
        this.initialStateText = cloneDeep(this.texts)
        const dateinput = document.getElementById('data-input')
        const timeinput = document.getElementById('hora-input')

        this.inputMask(dateinput, '/')
        this.inputMask(timeinput, ':')
    },
    methods: {
        handleFileUpload(name) {
            let file = this.$refs[name].files[0]
            if(file!==''){
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.convitePhoto = e.target.result
                }
                reader.onerror = function(error) {
                    console.log(error)
                }
                if (file) reader.readAsDataURL(file)
            }
        },
        inputMask(elm, type) {
            const separator = type
            elm.addEventListener('keypress', function(e) {
                if (e.keyCode < 47 || e.keyCode > 57) {
                    e.preventDefault()
                }
                let len = elm.value.length

                if (len !== 1) {
                    if (e.keyCode == 47) {
                        e.preventDefault()
                    }
                }

                if (len === 2) {
                    elm.value += separator
                }
            })
        },
        focusNext(nome) {
            const itemsLength = this.texts.length
            const index = this.texts.findIndex((t) => t.nome === nome)
            if (itemsLength > index + 1) {
                document.getElementById(this.texts[index + 1].nome).focus()
            }
        },
        printLetter() {
            if (!process.env.IS_WEB) {
                alert('Navegador não suportado!')
                return
            }
            this.$htmlToPaper('convite-card', options)
        },
        newLetter() {
            this.modalShow = !this.modalShow
        },
        closeModal() {
            this.$refs['modal-center'].hide()
        },
        newLetter2() {
            console.log(this.initialStateText)
            this.texts = cloneDeep(this.initialStateText)
            document.querySelector('textarea').value = ''
            this.$refs['file-convite'].value = ''
            this.convitePhoto =  ''
            // this.handleFileUpload('file-convite')
            this.$refs['modal-center'].hide()
        }
    }
}
</script>
<style>
</style>
