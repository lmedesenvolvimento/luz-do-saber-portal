export const ActivityTypes = {
    activity: {
        default: {
            text: 'atividade-texto',
        },
        join: {
            text: 'atividade-texto-texto'
        }
    },
    game: 'jogo'
}

export const ActivitySubtypes = {
    row: 'padrao-linha',
    column: 'padrao-coluna',
    rowReverse: 'padrao-linha-reverso',
    columnReverse: 'padrao-coluna-reverso'
}

export const GameSubtypes = {
    bingo: 'bingo',
    hideHalf: 'esconder-itens-metade',
    unscramble: 'desembaralhar-nome',
    rearrangeName: 'monte-seu-nome',
    jigsaw: 'quebra-cabecas',
    memoryGame: 'jogo-da-memoria',
    boxWords: 'caixa-de-palavras',
    friendsName: 'meus-amigos-fotos',
    dominoName: 'domino-de-nomes',
    grouping: 'agrupamento'
}

export const ItemTypes = {
    primitive: {
        text: 'texto',
        image: 'imagem'
    },
    custom: {
        crachaBox: 'cracha-box',
        cardDisplayValidacao: 'card-display-com-validacao',
        display18Items: 'display-18-items',
        textoEmBlocos: 'texto-em-blocos',
        memoryCardText: 'jogo-da-memoria-texto'
    },
    tags: {
        input: 'input'
    }
}
