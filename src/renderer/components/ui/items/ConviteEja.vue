<template>
    <div class="gameplay flex-center">
        <div class="gameplay-body flex-center">
            <div id="convite-card" class="convite-card flex-center">
                <div class="convite-text">
                    <div class="text title">Convite</div>
                    <div class="text data"></div>
                    <div class="text hora"></div>
                    <div class="text local"></div>
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
                            maxlength="140"
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
    props: {
        texts: Array,
    },
    data() {
        return {
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
                    console.error(error)
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
<style lang="scss" scoped>
.gameplay-body {
    .convite-card {
        background-image: url('~@/assets/images/components/convite/convite-generico.png');
        
                .convite-text {
                    color: #003147;
                    @include baloo_bhaina;
                    position: relative;
                    width: 100%;
                    height: 85%;
                    padding: 0px 30px;
                    align-self: flex-start;
                    font-size: 18px;

                    .input-text,
                    .text {
                        position: absolute;
                        font-weight: 200;
                    }

                    .input-text {
                        @include itim_regular;
                        text-transform: capitalize;
                        color: #0276b1;

                        &.saudacao-input {
                            top: 139px;
                            left: 57px;
                        }

                        &.texto-input {
                            top: 169px;
                            left: 55px;
                        }

                        &.data-input {
                            top: 283px;
                            left: 117px;
                        }

                        &.hora-input {
                            top: 283px;
                            left: 289px;
                        }

                        &.local-input {
                            top: 315px;
                            left: 140px;
                        }
                        &.local-second-line-input {
                            top: 343px;
                            left: 57px;
                        }

                        &.agradecimento-input {
                            top: 383px;
                            left: 57px;

                            input {
                                text-align: left;
                            }
                        }

                        &.assinatura-input {
                            top: 410px;
                            left: 57px;

                            input {
                                text-align: left;
                            }
                        }
                    }

                    .title {
                        @include pacifico;
                        text-transform: capitalize;
                        font-size: 52px;
                        top: 26px;
                        left: 250px;
                    }

                    .data {
                        top: 283px;
                        left: 53px;
                    }

                    .hora {
                        top: 274px;
                        left: 213px;
                    }

                    .local {
                        top: 326px;
                        left: 54px;
                    }

                    .input {
                        &.saudacao-input {
                            width: 150px;
                        }

                        &.data-input {
                            width: 70px;
                        }

                        &.hora-input {
                            width: 50px;
                        }

                        &.local-input {
                            width: 240px;
                        }

                        &.agradecimento-input {
                            width: 300px;
                        }

                        &.assinatura-input {
                            width: 300px;
                        }
                        &.local-second-line-input{
                            width: 300px;
                        }
                    }

                    input {
                        background: none;
                        border: none;
                        color: inherit;

                        &::placeholder {
                            color: #b7b7b7;
                        }
                    }

                    textarea {
                        color: inherit;
                        background: none;
                        border: none;
                        resize: none;
                        width: 390px;
                        height: 95px;
                        line-height: 30px;

                        &::placeholder {
                            color: #b7b7b7;
                        }
                    }
                }

                .photo-input {
                    position: absolute;
                    right: 20px;
                    top: 267px;
                    width: 190px;
                    height: 190px;

                    div,
                    label {
                        width: 190px;
                        height: 190px;
                    }

                    input {
                        width: 0;
                        height: 0;
                        visibility: hidden;
                        outline: none;
                    }

                    .image {
                        max-height: 160px;
                        transform: rotate(18deg);
                        width: 180px;
                        height: 170px;

                        &:hover {
                            filter: brightness(60%);
                            cursor: pointer;
                        }
                        img {
                            &.photo {
                                width: 165px;
                                height: 170px;
                            }
                        }
                    }
                }

                .photo-holder {
                    width: 190px;
                    height: 190px;
                    @include embed_image(
                        '~@/assets/images/components/convite/photo-holder.png',
                        190px,
                        193px
                    );
                    transform: rotate(5deg);

                    &:hover {
                        filter: brightness(60%);
                        cursor: pointer;
                    }
                }
    }
}
</style>