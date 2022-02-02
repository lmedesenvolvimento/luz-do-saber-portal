<template>
    <div class="gameplay flex-center">
        <div class="step-bars">
            <div
                v-for="(value, index) in types"
                :key="index"
                class="bar"
                :class="{'active': typeIndex === index, 'complete': index < typeIndex}"
                @click="updateValues(index)"
            ></div>
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-navigation">
                <transition name="fade" mode="in-out">
                    <div v-if="typeIndex > 0" key="nav-prev" class="gameplay-navigation-prev">
                        <b-btn variant="link" @click.stop="prevItemList">
                            <div class="icon-prev"></div>
                        </b-btn>
                    </div>
                </transition>
                <transition name="fade" mode="in-out">
                    <div v-if="typeIndex < (types.length - 1)" key="nav-next" class="gameplay-navigation-next">
                        <b-btn variant="link" @click.stop="nextItemList">
                            <div class="icon-next"></div>
                        </b-btn>
                    </div>
                </transition>
            </div>
            <!-- <div class="gameplay-heading-title">{{ getTitle }}</div> -->
        </div>
        <div class="gameplay-body flex-center">
            <div class="list-wrap">
                <div id="list" class="list">
                    <div class="list-background lista-comum"></div>
                    <span class="list-title">
                        Lista de {{ typePicked }}!
                    </span>
                    <div class="list-items">
                        <div v-for="(item, index) in items" :key="index" class="item">
                            <div :id="`item-${index + 1}`" class="number">
                                {{ index + 1 }}
                            </div>
                            <div class="item-text">
                                <input :id="`input-${index + 1}`" v-model="item.value" type="text" maxlength="50" class="input" @focus="addValue(index)" @keypress.enter="focusNext(index)" />
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
            typeIndex: 0,
            initialStateText: '',
            modalShow: false
        }
    },
    mounted() {
        this.initialStateText = cloneDeep(this.items)
    },
    methods: {
        updateValues(index) {
            this.typeIndex = index
            this.typePicked = this.types[index].class
        },
        prevItemList() {
            this.typeIndex = this.typeIndex - 1
            this.typePicked = this.types[this.typeIndex].class
        },
        nextItemList() {
            this.typeIndex = this.typeIndex + 1
            this.typePicked = this.types[this.typeIndex].class

        },
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
<style lang="scss" scoped>
/// Stroke font-character
/// @param  {Integer} $stroke - Stroke width
/// @param  {Color}   $color  - Stroke color
/// @return {List}            - text-shadow list
@function stroke-text($stroke, $color) {
    $shadow: ();
    $from: $stroke * -1;

    @for $i from $from through $stroke {
        @for $j from $from through $stroke {
            $shadow: append($shadow, $i * 1px $j * 1px 0 $color, comma);
        }
    }

    @return $shadow;
}

/// Stroke font-character
/// @param  {Integer} $stroke - Stroke width
/// @param  {Color}   $color  - Stroke color
/// @return {Style}           - text-shadow
@mixin stroke($stroke, $color) {
    text-shadow: stroke-text($stroke, $color);
}

.lista {
    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gameplay {
        .gameplay-heading{
            width: 100%;  
            height: 50px, 
        }
        .gameplay-body {
            .list-wrap {
                .list-background {
                    position: absolute;
                    background-size: 600px 571px !important;
                    background-repeat: no-repeat;
                    width: 600px !important;
                    height: 571px !important;

                    &.lista-comum {
                        background-image: url('~@/assets/images/components/lista/lista-comum.png');
                    }
                }

                .list {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    width: 550px !important;
                    height: 571px !important;

                    .list-items {
                        width: 550px !important;
                        height: 430px !important;
                        display: flex;
                        align-items: flex-start;
                        justify-content: flex-start;
                        flex-direction: column;
                        padding-bottom: 30px;
                        padding-left: 5px;

                        .item {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 20px;
                            width: 100% !important;
                            margin: 7px 0;
                        }

                        .item-text {
                            border-bottom: 2px solid #452d2d;
                            width: 470px !important;
                            height: 25px;

                            input {
                                width: 100% !important;
                                background: none;
                                border: none;
                                color: inherit;

                                &::placeholder {
                                    color: #b7b7b7;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}

</style>