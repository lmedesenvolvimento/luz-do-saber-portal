<template>
    <div id="lista" class="fill container lista">
        <div class="page-container">
            <div v-if="isEja">
                <lista-eja :types="listItems" />
            </div>
            <div v-else>
                <lista-fund :types="listItems" />
            </div>
        </div>
    </div>
</template>
<script>
import ListaFund from './ListaFund'
import ListaEja from './ListaEja'

export default {
    components: {
        ListaFund,
        ListaEja
    },
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
            },
            {
                name: 'lista de atividades de rotina',
                class: 'atividades de rotina',
                setted: false
            },
            {
                name: 'lista de prioridades',
                class: 'prioridades',
                setted: false
            },
            {
                name: 'lista de metas',
                class: 'metas',
                setted: false
            }
            ],
            items: [{
                value: ''
            }],
            typeIndex: 0,
            initialStateText: '',
        }
    },
    computed: {
        isEja() {
            return process.env.CONTEXT === 'eja'
        },
        listItems(){
            const excludeItemsEja = ['brincadeiras', 'brinquedos']
            const excludeItemsFund = ['atividades de rotina', 'prioridades', 'metas']

            if(this.isEja){
                const arrayListItemsEja = this.types.filter((item) => {
                    return !excludeItemsEja.includes(item.class)
                })

                return arrayListItemsEja
            }else{
                const arrayListItemsFund = this.types.filter((item) => {
                    return !excludeItemsFund.includes(item.class)
                })
                return arrayListItemsFund
            }
        }
    },
    // mounted() {
    //     this.initialStateText = cloneDeep(this.items)
    // },
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