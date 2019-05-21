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
    hideHalf: 'esconder-itens-metade',
    unscramble: 'desembaralhar-nome',
    rearrangeName: 'monte-seu-nome',
    jigsaw: 'quebra-cabecas',
    matchFriendsInitial: 'encaixe-letras',
    draggingSyllables: 'formacao-de-palavras',
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
        textoEmBlocos: 'texto-em-blocos'
    },
    tags: {
        input: 'input'
    }
}