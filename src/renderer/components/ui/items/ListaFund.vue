<template>
    <div class="gameplay flex-center">
        <div class="gameplay-body flex-center">
            <div class="list-types">
                <div class="types">
                    <div v-for="type in types" :key="type.name" class="type">
                        <div class="flex-center">
                            <label class="flex-center">
                                <div class="checkbox-body flex-center">
                                    <div v-if="type.setted" class="checkbox flex-center">
                                        X
                                    </div>
                                    <div v-else class="checkbox"></div>
                                </div>
                                <input v-model="type.setted" class="input" type="checkbox" name="type-check" @change="updateInputs(type)" />
                                <div class="label">
                                    {{ type.name }}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-wrap">
                <div id="list" class="list">
                    <div v-for="type in types" v-show="type.class === typePicked" :key="type.class" class="list-background" :class="type.class"></div>
                    <span class="list-title">
                        Lista de {{ typePicked }}!
                    </span>
                    <div class="list-items">
                        <div v-for="(item, index) in items" :key="index" class="item">
                            <div :id="`item-${index + 1}`" class="number">
                                {{ index + 1 }}
                            </div>
                            <div class="item-text">
                                <input :id="`input-${index + 1}`" v-model="item.value" type="text" maxlength="20" class="input" @focus="addValue(index)" @keypress.enter="focusNext(index)" />
                                <!-- <span class="text">{{
                                    item.value
                                }}</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gameplay-footer">
            <div class="footer-info flex-center">
                <div v-b-tooltip="{
                    title: 'Nova Lista',
                    container: '.footer-info'
                }" class="btn-lista novo" @click="newLetter"
                ></div>
                <div v-b-tooltip="{
                    title: 'Salvar',
                    trigger: 'hover',
                    container: '.footer-info'
                }" class="btn-lista salvar"
                ></div>
                <div v-b-tooltip="{
                    title: 'Imprimir',
                    container: '.footer-info'
                }" class="btn-lista imprimir" @click="printLetter"
                ></div>
                <div v-b-tooltip="{
                    title: 'Galeria',
                    container: '.footer-info'
                }" class="btn-lista galeria"
                ></div>
            </div>
        </div>
        <!-- Modal Place Holder -->
        <b-modal id="modal-center" ref="modal-center" v-model="modalShow" centered title="Apagar convite e comeÃ§ar um novo" hide-footer>
            <p class="my-4">
                Tem certeza de que deseja escrever um novo convite? O que vocÃª
                jÃ¡ escreveu serÃ¡ descartado se nÃ£o for salvo antes
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
        types: Array,
    },
    data() {
        return {
            typePicked: 'compras',
            items: [{
                value: ''
            }],
            initialStateText: '',
            modalShow: false
        }
    },
    mounted() {
        this.initialStateText = cloneDeep(this.items)
    },
    methods: {
        updateInputs(el) {
            if (el.setted) {
                const others = this.types.filter((t) => t !== el)
                others.map((o) => (o.setted = false))
                this.typePicked = this.types.find((t) => t.setted).class
            } else {
                el.setted = true
            }
            this.addValue()
        },
        addValue(index) {
            const itemsLength = this.items.length
            if (index === itemsLength - 1 && itemsLength < 10)
                this.items.push({ value: '' })
        },
        focusNext(index) {
            const itemsLength = this.items.length
            if (itemsLength > index + 1)
                document.getElementById(`input-${index + 2}`).focus()
        },
        printLetter() {
            if (!process.env.IS_WEB) {
                alert('Navegador nÃ£o suportado!')
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
            this.items = cloneDeep(this.initialStateText)
            this.$refs['modal-center'].hide()
        }
    }
}

</script>
<style lang="scss">

</style>