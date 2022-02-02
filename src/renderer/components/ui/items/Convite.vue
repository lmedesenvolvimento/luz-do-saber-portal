<template>
    <div id="convite" class="fill container convite">
        <div v-if="isEja" class="page-container">
            <convite-eja :texts="listItemsText" />
        </div>
        <div v-else class="page-container">
            <convite-fund :texts="listItemsText" />
        </div>
    </div>
</template>
<script>
import ConviteFund from './ConviteFund.vue'
import ConviteEja from './ConviteEja.vue'
import { cloneDeep } from 'lodash'
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
}
Vue.use(VueHtmlToPaper, options)
export default {
    components:{
        ConviteFund,
        ConviteEja
    },
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
                    maxLength: 26
                },
                {
                    nome: 'local-second-line-input',
                    value: '',
                    placeholder: '',
                    type: 'text',
                    maxLength: 37
                },
                {
                    nome: 'agradecimento-input',
                    value: '',
                    placeholder: 'Agradecimento',
                    type: 'text',
                    maxLength: 37
                },
                {
                    nome: 'assinatura-input',
                    value: '',
                    placeholder: '',
                    type: 'text',
                    maxLength: 37
                }
            ],
            convitePhoto: '',
            initialStateText: '',
            modalShow: false
        }
    },
    computed: {
        isEja() {
            return process.env.CONTEXT === 'eja'
        },
        listItemsText() {
            const excludeItemsTextEja = ['local-second-line-input']

            if(!this.isEja){
                const arrayListItemsEja = this.texts.filter((item) => {
                    return !excludeItemsTextEja.includes(item.nome)
                })

                return arrayListItemsEja
            }else{
                return this.texts
            }
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
