<template>
    <div id="lista" class="fill container lista">
        <div class="page-container">
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
            </div>
        </div>
        <!-- Modal Place Holder -->
        <b-modal id="modal-center" ref="modal-center" v-model="modalShow" centered title="Apagar convite e começar um novo" hide-footer>
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
            typePicked: 'compras',
            types: [{
                name: 'lista de compras',
                class: 'compras',
                setted: true
            },
            {
                name: 'lista de convidados',
                class: 'convidados',
                setted: false
            },
            {
                name: 'lista de desejos',
                class: 'desejos',
                setted: false
            },
            {
                name: 'lista de brincadeiras',
                class: 'brincadeiras',
                setted: false
            },
            {
                name: 'lista de brinquedos',
                class: 'brinquedos',
                setted: false
            }
            ],
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
            this.items = cloneDeep(this.initialStateText)
            this.$refs['modal-center'].hide()
        }
    }
}

</script>
<style lang="scss">
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
        .gameplay-body {
            width: 100%;
            border: none;
            padding: 30px 150px;
            flex-direction: row;
            color: #452d2d;

            .list-types {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                flex: 0;
            }

            .types {
                width: 250px;
                height: 55%;
                display: flex;
                align-items: flex-start;
                justify-content: space-around;
                flex-direction: column;
                font-size: 24px;

                .checkbox-body {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background-color: white;
                    margin-right: 30px;
                    box-shadow: 0px 0px 20px 1px rgba(74, 74, 74, 0.24);
                }

                .checkbox {
                    @include itim_regular;
                    color: #707070;
                    font-size: 24px;
                    border-radius: 2px;
                    border: 1px solid #494949;
                    border-radius: 8px;
                    width: 30px;
                    height: 30px;
                    align-items: flex-start;
                    justify-content: center;
                    padding-left: 2px;
                }

                .label {
                    width: 180px;
                }

                label {
                    cursor: pointer;
                }

                input {
                    width: 0;
                    height: 0;
                    visibility: hidden;
                    outline: none;
                }
            }

            .list-wrap {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                .list-background {
                    position: absolute;
                    background-size: 491px 567px;
                    background-repeat: no-repeat;
                    width: 491px;
                    height: 567px;

                    &.compras {
                        background-image: url('~@/assets/images/components/lista/lista-de-compras.png');
                    }

                    &.convidados {
                        background-image: url('~@/assets/images/components/lista/lista-de-convidados.png');
                    }

                    &.desejos {
                        background-image: url('~@/assets/images/components/lista/lista-de-desejos.png');
                    }
                    &.brincadeiras {
                        background-image: url('~@/assets/images/components/lista/lista-de-brincadeiras.png');
                    }
                    &.brinquedos {
                        background-image: url('~@/assets/images/components/lista/lista-de-brinquedos.png');
                    }
                }

                .list-title {
                    color: #0c7cc2;
                    @include pacifico;
                    text-transform: initial;
                    font-size: 32px;
                    position: absolute;
                    top: 87px;
                    @include stroke(2, #afd8e6);
                }

                .list {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    width: 491px;
                    height: 567px;

                    .list-items {
                        width: 300px;
                        height: 430px;
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
                            width: 100%;
                            margin: 7px 0;
                        }

                        .item-text {
                            border-bottom: 2px solid #452d2d;
                            width: 240px;
                            height: 25px;

                            input {
                                width: 240px;
                                background: none;
                                border: none;
                                color: inherit;

                                &::placeholder {
                                    color: #b7b7b7;
                                }
                            }
                        }

                        .number {
                            width: 40px;
                            padding-right: 10px;
                            font-size: 22px;
                            text-align: right;
                        }
                    }
                }
            }
        }

        .gameplay-footer {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
        }
    }

    .btn-lista {
        &.galeria {
            @include embed_image('~@/assets/images/icons/escrever/convite/btn-galeria.png',
            56px,
            56px);
        }

        &.imprimir {
            @include embed_image('~@/assets/images/icons/escrever/convite/btn-imprimir.png',
            56px,
            56px);
        }

        &.novo {
            @include embed_image('~@/assets/images/icons/escrever/convite/btn-novo.png',
            56px,
            56px);
        }

        &.salvar {
            @include embed_image('~@/assets/images/icons/escrever/convite/btn-salvar.png',
            56px,
            56px);
        }

        max-height: 56px;
        user-select: none;
        outline: none;

        &:hover,
        &:focus,
        &:active {
            cursor: pointer;
        }
    }
}

</style>
