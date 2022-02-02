export const ActivityTypes = {
    activity: {
        default: {
            text: 'atividade-texto',
            image: 'atividade-imagem',
            audio: 'atividade-audio', 
            video: 'atividade-video',

        },
        questionnaire: {
            default: 'atividade-questionario'
        },
        join: {
            text: 'atividade-texto-texto',
            imagem: 'atividade-texto-imagem'
        },
    },
    game: 'jogo',
}

export const ActivitySubtypes = {
    row: 'padrao-linha',
    column: 'padrao-coluna',
    rowReverse: 'padrao-linha-reverso',
    columnReverse: 'padrao-coluna-reverso',
}

export const GameSubtypes = {
    bingo: 'bingo',
    hideHalf: 'esconder-itens-metade',
    unscramble: 'desembaralhar-nome',
    rearrangeName: 'monte-seu-nome',
    jigsaw: 'quebra-cabecas',
    draggingSyllables: 'formacao-de-palavras',
    completeWordSyllables: 'completa-palavra-com-silaba',
    completeWordLetters: 'completa-palavra-com-letra',
    memoryGame: 'jogo-da-memoria',
    wordSearch: 'caca-nomes',
    wordBingo: 'bingo-de-palavras',
    boxWords: 'caixa-de-palavras',
    friendsName: 'meus-amigos-fotos',
    dominoName: 'domino-de-nomes',
    grouping: 'agrupamento',
    storeLetters: 'agrupamento-de-maiusculas',
    secretWord: 'palavra-secreta',
    completeSentence: 'completa-frase',
    letterGroup: 'nao-pertence',
    matchFriendsInitial: 'encaixe-letras',
    theWordsSecret: 'segredo-das-palavras',
    writeTheWord: 'escreva-o-nome',
    accentuation: 'acentuacao',
    textReading: 'apresentacao-leitura',
    imageReading: 'apresentacao-imagem',
    findTheWord: 'descubra-a-palavra',
    assembleWord: 'monte-a-palavra',
    myCracha: 'meu-cracha',
    uppercaseLetters: 'texto-letras-maiusculas',
    numericSequence: 'sequencia-numerica',
    sequenceAntecessor: 'sequencia-antecessor',
}

export const ItemTypes = {
    primitive: {
        text: 'texto',
        image: 'imagem',
        audio: 'audio',
    },
    custom: {
        crachaBox: 'game-cracha-box',
        cardDisplayValidacao: 'game-card-display-com-validacao',
        display18Items: 'game-display-18-items',
        textoEmBlocos: 'game-texto-em-blocos',
        memoryCardText: 'game-jogo-da-memoria-texto',
        caixaPalavras: 'game-caixa-de-palavras',
        checkmark: 'game-checkmark',
        descricaoImagem: 'game-display-descricao-imagem',
        grupoPalavras: 'game-grupo-de-palavras',
    },
    tags: {
        input: 'input',
    },
    slugs: {
        imageAudio: 'componente-de-imagem-audio',
        textImage: 'componente-de-imagem-texto',
        textAudio: 'componente-de-texto-audio',
        textVideo: 'componente-de-youtube',
    },
}

// Letter Types
export const LetterTypes = [
    'letra',
    'numero',
    'caractere_especial',
]

// ImageZoom
export const viewerOpts = {
    'inline': false,
    'button': false,
    'navbar': false,
    'title': false,
    'toolbar': false,
    'tooltip': false,
    'movable': false,
    'zoomable': true,
    'rotatable': false,
    'scalable': false,
    'transition': true,
    'fullscreen': false,
    'keyboard': false,
}


export const alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç']

export const acents = ['Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Ú']

export const symbols = ['-']

export const alphabet_with_acents = alphabet.concat(acents)

export const alphabet_with_acents_with_symbols = alphabet.concat(acents).concat(symbols)