import { shuffle, remove } from 'lodash'
import db from '@/services/Session'

export const vowel = ['A', 'E', 'I', 'O', 'U']

export const keyname = 'CHANGEME'

// slug: remote_id
const comecar = {
    bingo: 7,
    consoantes_do_meu_nome: 10,
    desembaralhe_seu_nome: 5,
    ligar_iniciais: 19,
    quebra_cabeca: 3,
    ultimo_do_meu_nome: 9,
    vogais_do_meu_nome: 11,
    quantidade_de_letra: 14,
    monte_seu_nome: 13,
    encaixe: 20,
    risca_letras: 15
}

export function mapBeginDesktopActivity(data) {
    console.log('question_id', data.question.id)
    console.log('question_items', data.question.items)

    switch (data.question.id) {
    case comecar.bingo:
        bingo(data)
        break
    case comecar.consoantes_do_meu_nome:
        consoantesDoMeuNome(data)
        break
    case comecar.vogais_do_meu_nome:
        vogaisDoMeuNome(data)
        break
    case comecar.ligar_iniciais:
        ligarIniciais(data)
        break
    case comecar.encaixe:
        ligarIniciais(data)
        break
    case comecar.quebra_cabeca:
        quebraCabeca(data)
        break
    case comecar.desembaralhe_seu_nome:
        desembaralheSeuNome(data)
        break
    case comecar.ultimo_do_meu_nome:
        ultimoDoMeuNome(data)
        break
    case comecar.quantidade_de_letra:
        quantidadeDeLetra(data)
        break
    case comecar.monte_seu_nome:
        monteSeuNome(data)
        break
    case comecar.risca_letras:
        riscaLetras(data)
        break
    default:
        replaceSplitedLettersActivity(data)
        break
    }
    
    // Redefinindo total de items corretos
    data.question.total_correct_items = data.question
        .items
        .keys
        .filter(k => k.value_ids && k.value_ids.length)
        .length
}

function bingo(data) {
    const keys = replaceRequestValuesForCurrentUser(data, 'keys')
    const values = replaceRequestValuesForCurrentUser(data, 'values')

    data.question.items.keys = keys
    data.question.items.values = values
}

function quantidadeDeLetra(data) {
    let user = db.value()
    let name = user.data.name.toUpperCase()

    const { items } = data.question
   
    // substituindo marcação pelo o usuário corrente
    replaceRequestValuesForCurrentUser(data, 'keys')

    // buscando o alternativa correta
    const indexOf = items.values.findIndex(({ key_id }) => key_id)
    items.values[indexOf].text = name.length

    // gerando nova resposta baseado pelo o tamanho do nome do usuário corrente
    items.keys.forEach((k) => {
        k.value_ids = items.values
            .filter(({ text }) => text == k.text.length)
            .map(({ id }) => id)
    })
}

function vogaisDoMeuNome(data) {
    replaceSplitedLettersActivity(data)

    data.question.items.keys.forEach((k) => {
        if (vowel.includes(k.text)) {
            return k.value_ids = data
                .question
                .items
                .values
                .filter(({ text }) => text === k.text)
                .map(({ id }) => id)
        }
        delete k.value_ids
    })
}

function consoantesDoMeuNome(data) {
    replaceSplitedLettersActivity(data)

    data.question.items.keys.forEach((k) => {
        if (!vowel.includes(k.text)) {
            return k.value_ids = data
                .question
                .items
                .values
                .filter(({ text }) => text === k.text)
                .map(({ id }) => id)
        }
        delete k.value_ids
    })
}

function ultimoDoMeuNome(data) {
    replaceSplitedLettersActivity(data)

    data.question.items.keys.forEach((k, index, array) => {
        const lastIndex = array.length
        if (k.id === lastIndex) {
            return k.value_ids = [lastIndex]
        }
        delete k.value_ids
    })
}

function ligarIniciais(data) {
    let user = db.value()
    let name = user.data.name.toUpperCase()

    replaceSplitedLettersActivity(data)

    const key_id = data.question
        .items
        .keys
        .find(({ first_letter }) => first_letter == getFirstLetter(name))
        .id

    const indexOf = data.question
        .items
        .values
        .findIndex((v) => v.key_id == key_id)

    data.question.items.values[indexOf].text = getFirstLetter(name)
}

function quebraCabeca(data) {
    let user = db.value()
    let name = user.data.name.toUpperCase()
    
    replaceRequestValuesForCurrentUser(data, 'keys')
    replaceRequestValuesForCurrentUser(data, 'values')
    
    data.question.items.keys[0].text = getFirstLetter(name)
}
function desembaralheSeuNome(data) {
    let keys = replaceRequestLettersForCurrentUser()
    let values = replaceRequestLettersForCurrentUser()

    generateLettersIdForCurrentUser(keys, values)

    data.question.items.keys = keys
    data.question.items.values = shuffle(values)
}

function monteSeuNome(data) {
    const { items } = data.question

    // removendo letras da palavra chave
    keyname.split('').forEach((l) => {
        const indexOf = items.values.findIndex(({ text }) => text === l)
        items.values.splice(indexOf, 1)
    })
    
    // gerando alternativa para cada letra do usuário corrente
    replaceSplitedLettersActivity(data)

    // mesclado array de valores com letras do usuário corrente para valores
    items.values = shuffle([...items.values, ...replaceRequestLettersForCurrentUser()])

    // gerando ids de respostas para as alternativas
    generateLettersIdForCurrentUser(items.keys, items.values)
}

function riscaLetras(data) {
    const { items } = data.question
    
    let user = db.value()
    let name = user.data.name.toUpperCase()

    // removendo letras da palavra chave
    keyname.split('').forEach((l) => {
        remove(items.values, (({ text }) => l === text))
    })

    // removendo letras do usuário corrente
    name.split('').forEach((l) => {
        remove(items.values, (({ text }) => l === text))
    })

    // gerando alternativa para cada letra do usuário corrente
    replaceSplitedLettersActivity(data)

    // mesclado array de valores com letras do usuário corrente para valores
    items.values = shuffle([...items.values, ...replaceRequestLettersForCurrentUser()])

    // gerando ids de respostas para as alternativas
    generateLettersIdForCurrentUser(items.keys, items.values)
}

export function generateLettersIdForCurrentUser(keys, values) {
    keys.forEach((k) => {
        k.value_ids = values
            .filter(({ text }) => text === k.text)
            .map(({ id }) => id)
    })

    values.forEach(v => {
        v.key_id = keys.findIndex(k => k.text === v.text)
    })
}

export function replaceRequestLettersForCurrentUser() {
    let user = db.value()
    let name = user.data.name.toUpperCase()

    const result = name.split('').map((l, index) => ({
        id: (index + 1),
        text: l,
        type: 'letra',
        is_consonant: !vowel.includes(l),
        is_vowel: vowel.includes(l),
    }))

    return result
}


export function replaceSplitedLettersActivity(data) {
    let keys = data.question.items.keys
    let values = data.question.items.values

    const joinedKeyLetters = keys
        .filter(({ type }) => type === 'letra')
        .map(({ text }) => text)
        .join('')

    const joinedValueLetters = values
        .filter(({ type }) => type === 'letra')
        .map(({ text }) => text)
        .join('')


    keys = (joinedKeyLetters === keyname) 
        ? replaceRequestLettersForCurrentUser() 
        : replaceRequestValuesForCurrentUser(data, 'keys')

    values = (joinedValueLetters === keyname)
        ? replaceRequestLettersForCurrentUser() 
        : replaceRequestValuesForCurrentUser(data, 'values')

    
    if ((joinedKeyLetters === keyname) || (joinedValueLetters === keyname)) {
        generateLettersIdForCurrentUser(keys, values)
    }

    data.question.items.keys = keys
    data.question.items.values = values
}


export function replaceRequestValuesForCurrentUser(data, type) {
    let items = data.question.items[type]

    items = items.map((i) => {
        if (i.text === keyname) {
            return parseCurrentUserAsWord(i)
        }
        return i
    })    

    data.question.items[type] = items

    return items
}

// @private
function parseCurrentUserAsWord(k) {
    let user = db.value()
    let name = user.data.name.toUpperCase()

    return {
        ...k,
        text: name,
        first_letter: getFirstLetter(name),
        last_letter: getLastLetter(name),
        letters: getLetters(name),
        total_letters: name.length
    }
}

function getFirstLetter(string) {
    return string.split('')[0]
}

function getLastLetter(string) {
    const indexOf = string.length - 1
    return string.split('')[indexOf]
}

function getLetters(string) {
    const letters = string.split('')

    return letters.map(l => ({
        is_consonant: !vowel.includes(l),
        is_vowel: vowel.includes(l),
        text: l,
        type: 'letra'
    }))
}